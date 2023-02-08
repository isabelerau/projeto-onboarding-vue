import ClienteService from "@/services/ClienteService";
import { vuetifyPageableToPageable } from "./../../types/core/vuetify";
import { DataOptions } from "vuetify";
import { Cliente } from "@/types/Cliente";
import Page from "@/types/core/page";
import Filtro from "@/types/Filtro";
import {
  getModule,
  Action,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";
import store from "../index";
import GlobalModule from "./GlobalModule";
import { listaSimNao } from "@/util/constants.js";

@Module({
  name: "cliente",
  dynamic: true,
  store: store,
})
class ClienteModule extends VuexModule {
  private _filtro: Filtro = {
    ativo: true,
  };

  private _pageCliente: Page<Cliente> = {};

  private _dataOptions: DataOptions = { itemsPerPage: 5 } as DataOptions;

  private _initialPagination: DataOptions = {
    itemsPerPage: 5,
  } as DataOptions;

  private _cliente: Cliente = {};

  get filtro() {
    return this._filtro;
  }

  get pageCliente() {
    return this._pageCliente;
  }

  get dataOptions() {
    return this._dataOptions;
  }

  public get initialPagination() {
    return this._initialPagination;
  }

  get cliente() {
    return this._cliente;
  }

  @Mutation
  mutateFiltro(filtro: Filtro) {
    this._filtro = filtro;
  }

  @Mutation
  mutatePageCliente(page: Page<Cliente>) {
    this._pageCliente = page;
  }

  @Mutation
  mutateDataOptions(pagination: DataOptions) {
    this._dataOptions = pagination;
  }

  @Mutation
  mutateCliente(cliente: Cliente) {
    this._cliente = cliente;
  }

  @Action
  setFiltro(filtro: Filtro) {
    this.mutateFiltro(filtro);
  }

  @Action
  setPageCliente(page: Page<Cliente>) {
    this.mutatePageCliente(page);
  }

  @Action
  setDataOptions(pagination: DataOptions) {
    this.mutateDataOptions(pagination);
  }

  @Action
  setCliente(cliente: Cliente) {
    this.mutateCliente(cliente);
  }

  @Action
  public async buscarClientes(initialPagination = false) {
    if (initialPagination) {
      this.setDataOptions(this.initialPagination);
    }

    const pageable = vuetifyPageableToPageable(this.dataOptions);

    const montaFiltro = {
      ativo: this.filtro?.ativo,
      nome: this.filtro?.nome?.value.nome,
    };

    const response = await ClienteService.buscarClientesFiltroComposto(
      montaFiltro,
      pageable
    );

    if (response.hasError) {
      return response.error;
    }

    if (response) {
      this.setPageCliente(response);
    }
  }

  @Action({ rawError: true })
  public async editarCliente(cliente) {
    const clienteAdicionar = {
      ...cliente,
      ativo:
        cliente.situacao === true ? listaSimNao.SIM.flag : listaSimNao.NAO.flag,
    };
    let response;
    GlobalModule.startLoading();
    try {
      response = await ClienteService.editarCliente(clienteAdicionar).then(
        () => {
          this.buscarClientes(true);
        }
      );
    } finally {
      if (response) {
        this.setPageCliente(response);
      }
      GlobalModule.dismissLoading();
    }
  }

  @Action({ rawError: true })
  public async adicionarCliente(cliente) {
    const clienteAdicionar = {
      ...cliente,
      ativo:
        cliente.ativo === true ? listaSimNao.SIM.flag : listaSimNao.NAO.flag,
    };

    let response;
    GlobalModule.startLoading();
    try {
      response = await ClienteService.adicionarCliente(clienteAdicionar).then(
        () => {
          this.buscarClientes(true);
        }
      );
    } finally {
      if (response) {
        this.setPageCliente(response);
      }
      GlobalModule.dismissLoading();
    }
  }

  @Action({ rawError: true })
  public async excluirCliente() {
    let response;
    GlobalModule.startLoading();
    try {
      response = await ClienteService.excluirCliente(this.cliente.codigo).then(
        () => {
          this.buscarClientes();
        }
      );
    } finally {
      if (response) {
        this.setPageCliente(response);
      }
      GlobalModule.dismissLoading();
    }
  }
}

export default getModule(ClienteModule);
