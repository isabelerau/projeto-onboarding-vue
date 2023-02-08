type Sort = {
  sorted?: boolean;
  unsorted?: boolean;
  empty?: boolean;
};

export type Pageable = {
  sort?: Sort;
  offset?: number;
  pageSize?: number;
  pageNumber?: number;
  paged?: boolean;
  unpaged?: boolean;
};

type Page<T> = {
  content?: Array<T>;
  pageable?: Pageable;
  sort?: string;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
};

export default Page;
