export type Pageable = {
  sort?: string;
  offset?: number;
  pageSize?: number;
  pageNumber?: number;
  paged?: boolean;
  unpaged?: boolean;
};

export type VuetifyPageable = {
  page: number;
  itemsPerPage: number;
  sortBy: Array<string>;
  sortDesc: Array<boolean>;
  groupBy: Array<string>;
  groupDesc: Array<boolean>;
  multiSort: boolean;
  mustSort: boolean;
};

export const vuetifyPageableToPageable = (
  vuetifyPageable?: VuetifyPageable
) => {
  const page = vuetifyPageable?.page ?? 1;
  const size = vuetifyPageable?.itemsPerPage;
  const sortDirection =
    (vuetifyPageable?.sortDesc?.length ?? 0) > 0
      ? vuetifyPageable?.sortDesc[0]
        ? "desc"
        : "asc"
      : "";
  const sort =
    (vuetifyPageable?.sortBy?.length ?? 0) > 0
      ? `${vuetifyPageable?.sortBy[0]},${sortDirection}`
      : "";

  return {
    page,
    size,
    sort,
  } as Pageable;
};
