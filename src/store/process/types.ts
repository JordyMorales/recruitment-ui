import { Process } from '../../types/process';

export interface ProcessState {
  isOpen: boolean;
  shouldClose: boolean;
  isLoading: boolean;
  error: string;
  process: Process;
  list: ProcessList;
}

export interface ProcessList {
  initialLoading: boolean;
  isLoading: boolean;
  totalItems: number;
  processes: Process[];
  totalPages: number;
  currentPage: number;
}

export const emptyProcess: Process = {
  processId: '',
  code: '',
  name: '',
  description: '',
  steps: [],
};
