import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ExpectationLevel, AssessmentType, GradeLevel } from '@prisma/client';

export interface CreateAssessmentDto {
  studentId: string;
  subStrandId: string;
  type: AssessmentType;
  score?: number;
  rubricLevel: ExpectationLevel;
  competencies: string[];
  values: string[];
  pcis: string[];
  teacherRemarks?: string;
  assessedBy: string;
}

@Injectable()
export class CbcService {
  constructor(private prisma: PrismaService) {}

  async recordAssessment(dto: CreateAssessmentDto) {
    const student = await this.prisma.student.findUnique({ where: { id: dto.studentId } });
    if (!student) throw new NotFoundException('Student not found');

    return this.prisma.assessmentEntry.create({ data: { ...dto } });
  }

  async getLearnerProgressReport(studentId: string, grade: GradeLevel) {
    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
      include: { parent: true },
    });
    if (!student) throw new NotFoundException('Student not found');

    const assessments = await this.prisma.assessmentEntry.findMany({
      where: { studentId, subStrand: { strand: { learningArea: { grade } } } },
      include: { subStrand: { include: { strand: { include: { learningArea: true } } } } },
    });

    const rubricDistribution = { EE: 0, ME: 0, AE: 0, BE: 0 };
    const competencyGrowth: Record<string, number> = {};

    assessments.forEach((entry) => {
      rubricDistribution[entry.rubricLevel]++;
      entry.competencies.forEach((comp) => {
        competencyGrowth[comp] = (competencyGrowth[comp] || 0) + 1;
      });
    });

    return { studentDetails: { name: student.name, admissionNumber: student.admissionNumber, grade }, analytics: { totalAssessments: assessments.length, rubricDistribution, competencyGrowth }, detailedAssessments: assessments.map((a) => ({ learningArea: a.subStrand.strand.learningArea.name, strand: a.subStrand.strand.name, subStrand: a.subStrand.name, type: a.type, expectation: a.rubricLevel, remarks: a.teacherRemarks, date: a.createdAt })) };
  }
}