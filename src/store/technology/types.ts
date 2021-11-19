import { Technology } from "../../types/technology";

export interface TechnologyState {
  isOpen: boolean;
  shouldClose: boolean;
  isLoading: boolean;
  error: string;
  technology: Technology;
  list: TechnologyList;
}

export interface TechnologyList {
  isLoading: boolean;
  totalItems: number;
  technologies: Technology[];
  totalPages: number;
  currentPage: number;
}

export const emptyTechnology: Technology = {
  technologyId: '',
  name: '',
  isActive: true,
};
