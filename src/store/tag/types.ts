import { Tag } from '../../types/tag';

export interface TagState {
  isOpen: boolean;
  shouldClose: boolean;
  isLoading: boolean;
  error: string;
  tag: Tag;
  list: TagList;
}

export interface TagList {
  isLoading: boolean;
  totalItems: number;
  tags: Tag[];
  totalPages: number;
  currentPage: number;
}

export const emptyTag: Tag = {
  tagId: '',
  name: '',
  color: '',
  isActive: true,
};
