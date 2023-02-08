export type Pageable = {
  page: number = 0;
  size: number = 10;
  sort?: string;
};

export type SearchTextPageable = {
  text: string;
  pageable: Pageable;
};

export interface Page<T> {
  content: Array<T>;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  size: number;
}

export class Response<T> {
  content: Array<T>;
  error?: RemoteError;
  totalElements?: any;
  page?: any;
  itemsPerPage?: any;

  get hasError(): boolean {
    return this.error !== undefined;
  }
}
