import { Job } from '../../types/job';

export interface JobState {
  isLoading: boolean;
  isSuccessful: boolean;
  error: string;
  job: Job;
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
