import { AutocompleteOptions, SearchTextPageable } from "./index";

export default interface AutocompleteDatasource {
  loadOptions: (
    searchTextPageable: SearchTextPageable,
    params?: any
  ) => Promise<AutocompleteOptions>;
}
