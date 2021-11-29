import { Application } from './../../types/application';
import { Candidate } from '../../types/candidate';

export interface CandidateState {
  isLoading: boolean;
  isSuccessful: boolean;
  error: string;
  account: Candidate;
  application: Application,
  applications: CandidateApplications;
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

export interface CandidateApplications {
  initialLoading: boolean;
  isLoading: boolean;
  applications: Application[]; 
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