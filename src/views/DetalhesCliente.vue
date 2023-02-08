<template>
  <sds-page
    title="Sistema de gerenciamento de clientes"
    :navigate-back="true"
    @click:back="$router.go(-1)"
  >
    <sds-card :title="$t('TITLE.DADOS_CLIENTE')" class="mt-5">
      <v-row dense>
        <v-col>
          <sds-text-view
            :label="$t('LABEL.NOME') + ':'"
            :label-bold="true"
            :text="cliente.nome"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <sds-text-view
            :label="$t('LABEL.CPF') + ':'"
            :label-bold="true"
            :text="cliente.cpf"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <sds-text-view
            :label="$t('LABEL.DATA_NASCIMENTO') + ':'"
            :label-bold="true"
            :text="formatarDataNascimento(cliente.dataNasc)"
          />
        </v-col>
      </v-row>
    </sds-card>
    <sds-card :title="$t('TITLE.CONSUMO_CLIENTE')" class="mt-5">
      <v-data-table
        :headers="header"
        :items="cliente.itensConsumo"
        :no-data-text="$t('MESSAGE.NAO_HA_CONSUMO')"
        hide-default-footer
      >
        <template v-slot:[`item.vlUnitario`]="props">
          <div class="text-end">
            {{ formatarValor(props.item.vlUnitario) }}
          </div>
        </template>

        <template slot="body.append">
          <tr>
            <td />
            <th class="text-end">Total</th>
            <th class="text-right">
              {{ calcularValorTotalAsCurrency() }}
            </th>
          </tr>
        </template>
      </v-data-table>
    </sds-card>
  </sds-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import format from "@/util/format";
import GlobalModule from "@/store/modules/GlobalModule";
import clienteService from "@/services/ClienteService";
import { Cliente } from "@/types/Cliente";

@Component({
  name: "DetalhesCliente",
})
export default class DetalhesCliente extends Vue {
  cliente: Cliente = {};
  header = [
    {
      text: this.$t("LABEL.DESCRICAO"),
      align: "start",
      sortable: false,
      value: "descricao",
    },
    {
      text: this.$t("LABEL.QUANTIDADE"),
      align: "center",
      sortable: false,
      value: "quantidade",
    },
    {
      text: this.$t("LABEL.VALOR_UNITARIO"),
      align: "center",
      sortable: false,
      value: "vlUnitario",
    },
  ];

  async created() {
    const codigo = this.$route.params.codigo;
    let response;
    GlobalModule.startLoading();
    try {
      response = await clienteService.detalharCliente(codigo);
    } finally {
      if (response) {
        this.cliente = response;
      }
      GlobalModule.dismissLoading();
    }
  }

  formatarValor(valor) {
    return format.asCurrency(valor);
  }

  formatarDataNascimento(data) {
    return format.asDateFromString(data);
  }

  calcularTotalDoItem(item) {
    return Number(item.quantidade) * Number(item.vlUnitario);
  }

  calcularValorTotalAsCurrency() {
    if (!this.cliente.itensConsumo || this.cliente.itensConsumo.length < 0) {
      return format.asCurrency(0);
    }

    return format.asCurrency(
      this.cliente.itensConsumo.reduce(
        (a, b) => a + (this.calcularTotalDoItem(b) || 0),
        0
      )
    );
  }
}
</script>
