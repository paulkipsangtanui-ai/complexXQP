import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AiAssistantService {
  private openai: OpenAI;

  constructor(private prisma: PrismaService) {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async generateLessonPlan(grade: string, learningArea: string, strand: string, subStrand: string, durationMinutes: number = 40) {
    const prompt = `Generate CBC-aligned lesson plan for Grade ${grade}, ${learningArea}, ${strand}, ${subStrand} (${durationMinutes} mins). Include: SLOs, Core Competencies, National Values, PCIs, Learning Experiences, Resources, Assessment Methods, Teacher Reflection.`;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    return { lessonPlan: completion.choices[0].message.content, metadata: { grade, learningArea, strand, subStrand, generatedAt: new Date() } };
  }

  async generateAiReportComments(studentId: string, grade: string) {
    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
      include: { assessments: { take: 15, orderBy: { createdAt: 'desc' } } },
    });

    if (!student) throw new Error('Student not found');

    const performanceSummary = student.assessments.map((a) => `${a.rubricLevel}: ${a.teacherRemarks || 'N/A'}`).join('\n');
    const prompt = `Write personalized report remarks for ${student.name} (${grade}) based on:\n${performanceSummary}\nInclude strengths, areas for improvement, and parent recommendations. Output as JSON with keys: strengths, areasForImprovement, finalTeacherRemarks.`;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    return JSON.parse(completion.choices[0].message.content || '{}');
  }
}