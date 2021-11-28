export type JobState = 'DRAFF' | 'PUBLISHED' | 'CANCELED' | 'FINISHED';

export interface Job {
  jobId: string;
  name: string;
  description?: string;
  datePublished?: Date;
  startDate?: Date;
  vacancies?: number;
  technologies?: any[];
  processId: string;
  state?: JobState;
  createdBy?: any;
  updatedBy?: any;
  createdAt?: Date;
  updatedAt?: Date;
}
