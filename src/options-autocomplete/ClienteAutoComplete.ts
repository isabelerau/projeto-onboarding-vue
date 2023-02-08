import {
  AutocompleteOptions,
  SearchTextPageable,
} from "@ungp/sds-autocomplete";
import AutocompleteDatasource from "@/types/core/AutoCompleteDatasource";
import { Cliente } from "@/types/Cliente";
import ClienteService from "@/services/ClienteService";

export default class ClienteAutoComplete implements AutocompleteDatasource {
  filtro: Cliente = {};
  async loadOptions(
    searchTextPageable: SearchTextPageable
  ): Promise<AutocompleteOptions> {
    const options = {} as AutocompleteOptions;
    const response = await ClienteService.buscarClientes(
      searchTextPageable.text,
      searchTextPageable.pageable
    );

    if (!response.hasError) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const content = response.content!;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const itens: any = [];
      content.forEach((cliente) => {
        itens.push({
          text: `${cliente.nome} - ${cliente.cpf}`,
          value: cliente,
        });
      });

      options.items = itens;
      options.page = searchTextPageable.pageable.page + 1;
      options.hasMore = searchTextPageable.pageable.page < content.length;
    }
    return options;
  }
}
