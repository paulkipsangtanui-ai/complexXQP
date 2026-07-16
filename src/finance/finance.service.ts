import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class FinanceService {
  constructor(private prisma: PrismaService) {}

  async initiateMpesaStkPush(studentId: string, amount: number, phoneNumber: string) {
    const student = await this.prisma.student.findUnique({ where: { id: studentId } });
    if (!student) throw new NotFoundException('Student not found');

    const timestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
    const password = Buffer.from(`${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`).toString('base64');

    try {
      const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: phoneNumber,
        CallBackURL: `${process.env.APP_BASE_URL}/api/finance/mpesa-callback`,
        AccountReference: student.admissionNumber,
        TransactionDesc: `Fees payment for ${student.admissionNumber}`,
      }, { headers: { Authorization: 'Bearer SIMULATED_TOKEN' } });

      await this.prisma.payment.create({
        data: { studentId: student.id, amount, transactionRef: response.data.CheckoutRequestID || `TXN-${Date.now()}`, status: 'PENDING', phoneNumber },
      });

      return { success: true, message: 'STK Push initiated', data: response.data };
    } catch (error) {
      throw new BadRequestException('STK Push failed: ' + error.message);
    }
  }

  async handleMpesaCallback(payload: any) {
    const { CheckoutRequestID, ResultCode } = payload.Body.stkCallback;
    const payment = await this.prisma.payment.findUnique({ where: { transactionRef: CheckoutRequestID } });
    if (!payment) throw new NotFoundException('Payment not found');

    if (ResultCode === 0) {
      await this.prisma.$transaction([
        this.prisma.payment.update({ where: { id: payment.id }, data: { status: 'SUCCESSFUL' } }),
        this.prisma.student.update({ where: { id: payment.studentId }, data: { feeBalance: { decrement: payment.amount } } }),
      ]);
      await this.triggerSmsAlert(payment.studentId, payment.amount);
    } else {
      await this.prisma.payment.update({ where: { id: payment.id }, data: { status: 'FAILED' } });
    }

    return { status: 'Callback Received' };
  }

  private async triggerSmsAlert(studentId: string, amountPaid: any) {
    const student = await this.prisma.student.findUnique({ where: { id: studentId }, include: { parent: true } });
    if (!student?.parent) return;
    console.log(`[SMS]: ${student.parent.phoneNumber} -> Payment KES ${amountPaid} received for ${student.name}`);
  }
}