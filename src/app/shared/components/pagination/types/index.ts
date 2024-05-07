export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  lastPage: number;
}
export interface SearchPaginationResult<T> {
  data: Array<T>;
  total: number;
  lastPage: number;
}
