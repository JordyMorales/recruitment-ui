export type ApplicationState = 'APPLIED' | 'REJECTED' | 'ACCEPTED' | 'FINISHED' | 'HIRED';

export interface Application {
  applicationId?: string;
  otherInfo?: string;
  appliedBy: any;
  step: any;
  jobId: any;
  state?: ApplicationState;
  appliedAt?: Date;
  updatedAt?: Date;
}
