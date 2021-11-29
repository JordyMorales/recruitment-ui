import { Application } from '../../types/application';

export interface ApplicationState {
  isOpen: boolean;
  shouldClose: boolean;
  isLoading: boolean;
  isSuccessful: boolean;
  error: string;
  application: Application;
}

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
