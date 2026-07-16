import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { CbcService, CreateAssessmentDto } from './cbc.service';
import { GradeLevel } from '@prisma/client';

@Controller('api/cbc')
export class CbcController {
  constructor(private readonly cbcService: CbcService) {}

  @Post('assessment')
  async recordAssessment(@Body() dto: CreateAssessmentDto) {
    return this.cbcService.recordAssessment(dto);
  }

  @Get('report-card/:studentId')
  async getReportCard(@Param('studentId') studentId: string, @Query('grade') grade: GradeLevel) {
    return this.cbcService.getLearnerProgressReport(studentId, grade);
  }
}