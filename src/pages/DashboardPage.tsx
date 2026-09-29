export type SchoolStatus =
  | 'Active'
  | 'Transferred'
  | 'Graduated'
  | 'Withdrawn'
  | 'Suspended'
  | 'Alumni';

export interface LearnerRecord {
  id: string;
  learnerId: string;
  admissionNumber: string;
  fullName: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth?: string;
  gender?: string;
  grade?: string;
  stream?: string;
  admissionDate?: string;
  previousSchool?: string;
  status?: SchoolStatus;
  boardingStatus?: 'Boarding' | 'Day';
  house?: string;
  transportRoute?: string;
  guardian?: string;
  emergencyContact?: string;
  medicalInfo?: string;
  photo?: string;
  createdAt?: string;
}

export interface CollectionRecord {
  id: string;
  [key: string]: unknown;
}

export interface DashboardStats {
  totalLearners: number;
  activeLearners: number;
  newAdmissions: number;
  transfers: number;
  staff: number;
  teachers: number;
  attendanceToday: number;
  pendingAssessments: number;
  marksAwaitingApproval: number;
  lockedAssessments: number;
  publishedReports: number;
}

export interface FirestoreLocation {
  type: 'firestore';
  connected: boolean;
  projectId?: string;
}
