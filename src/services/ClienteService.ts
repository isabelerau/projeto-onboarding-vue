/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "@/plugins/axios";
import { Pageable, Response } from "@/types/core/index";
import { Cliente } from "@/types/Cliente";

const BASE_URL_MOCK = `http://localhost:3333`;

class ClienteService {
  buscarClientes(filtro: any, paginacao: Pageable): Promise<Response<Cliente>> {
    if (!filtro) filtro = "";
    return axios
      .get(`${BASE_URL_MOCK}/buscar-clientes?nome=${filtro}`, {
        params: { ...paginacao },
      })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  //vamos usar esse
  buscarClientesFiltroComposto(
    filtro: any,
    paginacao: Pageable
  ): Promise<Response<Cliente>> {
    let URL = `${BASE_URL_MOCK}/buscar-clientes-filtro-composto`;
    if (filtro.nome && filtro.ativo) {
      URL = `${URL}?nome=${filtro.nome}&ativo=${filtro.ativo}`;
    } else if (filtro.nome) {
      URL = `${URL}?nome=${filtro.nome}`;
    } else if (filtro.ativo) {
      URL = `${URL}?ativo=${filtro.ativo}`;
    }
    return axios
      .get(`${URL}`, {
        params: { ...paginacao },
      })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  buscarClientesCodigoSituacao(
    filtro: any,
    paginacao: Pageable
  ): Promise<Response<Cliente>> {
    let URL = `${BASE_URL_MOCK}/buscar-clientes-codigo-situacao`;
    if (filtro.codigo && filtro.ativo) {
      URL = `${URL}?codigo=${filtro.codigo}&ativo=${filtro.ativo}`;
    } else if (filtro.codigo) {
      URL = `${URL}?codigo=${filtro.codigo}`;
    } else if (filtro.ativo) {
      URL = `${URL}?ativo=${filtro.ativo}`;
    }
    return axios
      .get(`${URL}`, {
        params: { ...paginacao },
      })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
  detalharCliente(codigo): Promise<Response<Cliente>> {
    return axios
      .get(`${BASE_URL_MOCK}/detalhes-cliente/${codigo}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  adicionarCliente(cliente) {
    return axios
      .post(`${BASE_URL_MOCK}/adicionar-cliente`, cliente)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  editarCliente(cliente) {
    return axios
      .put(`${BASE_URL_MOCK}/editar-cliente/${cliente.codigo}`, cliente)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  excluirCliente(codigo) {
    return axios
      .delete(`${BASE_URL_MOCK}/excluir/${codigo}`)
      .then((response) => {
        response.data;
      })
      .catch((error) => {
        throw error;
      });
  }
}
export default new ClienteService();
