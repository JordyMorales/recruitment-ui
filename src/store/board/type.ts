import { Application } from '../../types/application';

export interface BoardState {
  isOpen: boolean;
  isLoading: boolean;
  shouldClose: boolean;
  isSuccessful: boolean;
  error: string;
  isLoaded: boolean;
  columns: Column[];
}

export interface Column {
  stepId: string;
  order: number;
  name: string;
  description?: string;
  processId: string;
  applications?: Application[];
}
