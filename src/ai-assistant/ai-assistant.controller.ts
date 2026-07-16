import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AiAssistantService } from './ai-assistant.service';

@Controller('api/ai')
export class AiAssistantController {
  constructor(private readonly aiService: AiAssistantService) {}

  @Post('generate-lesson')
  async getLesson(@Body() body: { grade: string; learningArea: string; strand: string; subStrand: string; duration?: number }) {
    return this.aiService.generateLessonPlan(body.grade, body.learningArea, body.strand, body.subStrand, body.duration);
  }

  @Get('report-comments')
  async getComments(@Query('studentId') studentId: string, @Query('grade') grade: string) {
    return this.aiService.generateAiReportComments(studentId, grade);
  }
}