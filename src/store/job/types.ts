import { Application } from '../../types/application';
import { Job } from '../../types/job';

export interface JobState {
  isLoading: boolean;
  isSuccessful: boolean;
  error: string;
  job: Job;
  application: Application,
  applications: JobApplications;
  list: JobList;
}

export interface JobList {
  initialLoading: boolean;
  isLoading: boolean;
  totalItems: number;
  jobs: Job[];
  totalPages: number;
  currentPage: number;
}


export interface JobApplications {
  initialLoading: boolean;
  isLoading: boolean;
  applications: Application[]; 
}

export const emptyJob: Job = {
  jobId: '',
  name: '',
  description: '',
  startDate: new Date(),
  vacancies: 1,
  technologies: [],
  processId: '',
  state: 'DRAFF',
};

export const emptyApplication: Application = {
  applicationId: '',
  otherInfo: '',
  appliedBy: null,
  step: null,
  jobId: null,
  state: 'APPLIED',
  appliedAt: new Date(),
  updatedAt: null,
};