import { User } from '../../types/user';

export interface UserState {
  isOpen: boolean;
  shouldClose: boolean;
  isLoading: boolean;
  error: string;
  profile: User;
  user: User;
  list: UserList;
}

export interface UserList {
  initialLoading: boolean;
  isLoading: boolean;
  totalItems: number;
  users: User[];
  totalPages: number;
  currentPage: number;
}

export const emptyUser: User = {
  userId: '',
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  password: '',
  phone: '',
  dateOfBirth: new Date(),
  country: '',
  city: '',
  address: '',
  photoUrl: '',
  resumeUrl: '',
  jobTitle: '',
  role: 'CANDIDATE',
  state: 'INACTIVE',
};
