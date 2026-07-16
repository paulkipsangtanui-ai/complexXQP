import { Controller, Post, Body } from '@nestjs/common';
import { FinanceService } from './finance.service';

@Controller('api/finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Post('stk-push')
  async initiatePay(@Body() body: { studentId: string; amount: number; phone: string }) {
    return this.financeService.initiateMpesaStkPush(body.studentId, body.amount, body.phone);
  }

  @Post('mpesa-callback')
  async callbackReceiver(@Body() payload: any) {
    return this.financeService.handleMpesaCallback(payload);
  }
}