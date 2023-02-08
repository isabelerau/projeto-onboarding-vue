<template>
  <sds-page :title="$t('TITLE.SISTEMA_GERENCIAMENTO_CLIENTES')">
    <card-consulta @consultar="consultarClientes" @salvar="salvar" />
    <grid-resultado-consulta
      :headers="headers"
      :page="page"
      :options="options"
      @changePagination="changeOptions"
    >
      <template #ativo="item">
        <situacao-icon :flag="item.item.ativo" />
      </template>
      <template #cpf="item">
        {{
          item.item.cpf.includes("-")
            ? item.item.cpf
            : formatarCpf(item.item.cpf)
        }}
      </template>
      <template #actions="item">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <span v-on="on">
              <v-icon
                v-bind="attrs"
                small
                class="mr-3"
                @click="editarCliente(item.item)"
              >
                mdi-pencil
              </v-icon>
            </span>
          </template>
          <span>{{ $t("LABEL.EDITAR") }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <span v-on="on">
              <v-icon
                v-bind="attrs"
                small
                class="mr-3"
                @click="detalhesCliente(item.item)"
              >
                mdi-archive-search</v-icon
              >
            </span>
          </template>
          <span>{{ $t("LABEL.DETALHAR") }}</span></v-tooltip
        >
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <span v-on="on">
              <v-icon
                v-bind="attrs"
                small
                @click="abrirModalConfirmacaoExclusao(item.item)"
              >
                mdi-delete
              </v-icon>
            </span>
          </template>
          <span>{{ $t("LABEL.EXCLUIR") }}</span>
        </v-tooltip>
      </template>
    </grid-resultado-consulta>
    <modal-cadastro-edicao
      :titleModal="$t('TITLE.EDICAO_CLIENTE')"
      :showModal="showModal"
      :cliente="cliente"
      @close="showModal = false"
      @salvar="salvar"
    />
    <sds-confirm
      v-model="showModalConfirmacaoExclusao"
      :title="$t('TITLE.CONFIRMACAO_EXCLUSAO')"
      :label-decline="$t('LABEL.NAO')"
      :label-confirm="$t('LABEL.SIM')"
      :message="
        $t('MESSAGE.CONFIRMACAO_EXCLUSAO_CLIENTE', {
          nome: cliente.nome,
          cpf: cliente.cpf,
        })
      "
      @confirmed="excluirCliente"
      @declined="showModalConfirmacaoExclusao = false"
    />
  </sds-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CardConsulta from "@/views/components/CardConsulta.vue";
import ClienteModule from "@/store/modules/ClienteModule";
import GridResultadoConsulta from "@/views/components/GridResultadoConsulta.vue";
import SituacaoIcon from "@/views/components/SituacaoIcon.vue";
import _ from "lodash";
import ModalCadastroEdicao from "@/views/components/ModalCadastroEdicao.vue";
import { listaSimNao } from "@/util/constants";

@Component({
  name: "ConsultaClientes",
  components: {
    CardConsulta,
    GridResultadoConsulta,
    SituacaoIcon,
    ModalCadastroEdicao,
  },
})
export default class ConsultaClientes extends Vue {
  showModal = false;
  showModalConfirmacaoExclusao = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listaSimNao: any = listaSimNao;

  headers = [
    {
      text: this.$t("TITLE.NOME").toString(),
      align: "start",
      sortable: false,
      value: "nome",
    },
    {
      text: this.$t("TITLE.CPF").toString(),
      align: "start",
      sortable: false,
      value: "cpf",
    },
    {
      text: this.$t("TITLE.SITUACAO").toString(),
      align: "center",
      sortable: false,
      value: "ativo",
    },
    {
      text: this.$t("TITLE.ACOES").toString(),
      align: "center",
      sortable: false,
      value: "actions",
      width: "10%",
    },
  ];

  get filtro() {
    return ClienteModule.filtro;
  }

  get page() {
    return ClienteModule.pageCliente;
  }

  get options() {
    return ClienteModule.dataOptions;
  }

  get cliente() {
    return ClienteModule.cliente;
  }

  async created() {
    await this.consultarClientes(true);
  }

  async consultarClientes(initialPagination) {
    await ClienteModule.buscarClientes(initialPagination);
  }

  formatarCpf(value) {
    if (!value) {
      return;
    }
    const array = value.split("");
    array.splice(3, 0, ".");
    array.splice(7, 0, ".");
    array.splice(11, 0, "-");
    return array.join("");
  }

  changeOptions(pagination) {
    if (!_.isEqual(this.options, pagination)) {
      ClienteModule.setDataOptions(pagination);
      ClienteModule.buscarClientes();
    }
  }

  detalhesCliente(item) {
    this.$router.push({
      path: `/detalhes-cliente/${item.codigo}`,
    });
  }

  abrirModalConfirmacaoExclusao(item) {
    ClienteModule.setCliente(item);
    // this.cliente = cloneDeep(item);
    this.showModalConfirmacaoExclusao = true;
  }

  async excluirCliente() {
    try {
      ClienteModule.excluirCliente();
    } finally {
      this.showModalConfirmacaoExclusao = false;
    }
  }

  editarCliente(item) {
    ClienteModule.setCliente(item);
    this.showModal = true;
  }

  salvar(sit) {
    const cliente = {
      ...sit,
      ativo: sit.situacao ? listaSimNao.SIM.flag : listaSimNao.NAO.flag,
    };

    if (!cliente.codigo) {
      ClienteModule.adicionarCliente(cliente).then(() => {
        this.showModal = false;
      });
    } else {
      ClienteModule.editarCliente(cliente).then(() => {
        this.showModal = false;
      });
    }
  }
}
</script>
