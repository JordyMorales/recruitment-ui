export type Role = 'ADMIN' | 'RECRUITER' | 'INTERVIEWER' | 'EMPLOYEE' | 'CANDIDATE';
export type State = 'ACTIVE' | 'INACTIVE' | 'ARCHIVED' | 'REMOVED';

export interface User {
  userId: string;
  firstName: string;
  middleName?: string;
  lastName?: string;
  email: string;
  password?: string;
  phone?: string;
  dateOfBirth?: Date;
  country?: string;
  city?: string;
  address?: string;
  photoUrl: string;
  resumeUrl?: string;
  jobTitle?: string;
  role: Role;
  state?: State;
}
