import { Candidate } from '../../types/candidate';

export interface CandidateState {
  isLoading: boolean;
  error: string;
  candidate: Candidate;
  list: CandidateList;
}

export interface CandidateList {
  initialLoading: boolean;
  isLoading: boolean;
  totalItems: number;
  candidates: Candidate[];
  totalPages: number;
  currentPage: number;
}

export const emptyCandidate: Candidate = {
  candidateId: '',
  personalData: {},
  address: '',
  city: '',
  country: '',
  englishLevel: 'A1',
  engineeringLevel: 0.0,
  salaryPretension: '',
  contractPreference: '',
  jobTitle: '',
  company: '',
  resumeUrl: '',
  seniority: '',
  availability: '',
  tags: [],
  links: [],
  phones: [],
  emails: [],
  technologies: [],
  referralBy: '',
  createdBy: '',
  updatedBy: '',
  createdAt: null,
  updatedAt: null,
};
