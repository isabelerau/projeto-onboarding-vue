<template>
  <sds-card class="mt-4" :title="$t('TITLE.RESULTADO_CONSULTA')">
    <v-row dense>
      <v-col class="text-end mb-2 mr-2">
        <div class="legenda">
          <div v-for="situacao in situacoes" :key="situacao">
            <situacao-icon :flag="situacao" :showLabel="true" />
          </div>
        </div>
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="page.content"
      :no-data-text="$t('MESSAGE.NAO_HA_RESULTADOS_CONSULTA')"
      :items-per-page="page.pageSize"
      :options="options"
      :server-items-length="page.totalElements"
      hide-default-footer
      :footer-props="footerProps"
    >
      <template v-slot:[`item.ativo`]="{ item }">
        <slot name="ativo" v-bind:item="item" />
      </template>

      <template v-slot:[`item.cpf`]="{ item }">
        <slot name="cpf" v-bind:item="item" />
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <slot name="actions" v-bind:item="item" />
      </template>

      <template #footer="{ props }">
        <sds-data-table-footer :props="props" @page:change="changePagination" />
      </template>
    </v-data-table>
  </sds-card>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import SituacaoIcon from "@/views/components/SituacaoIcon.vue";
import { situacaoCliente } from "@/util/constants";

@Component({
  name: "GridResultadoConsulta",
  components: {
    SituacaoIcon,
  },
})
export default class GridResultadoConsulta extends Vue {
  footerProps = {
    showFirstLastṔage: true,
    showCurrentPage: true,
  };

  @Prop()
  headers;

  @Prop()
  page;

  @Prop()
  options;

  get situacoes() {
    return [situacaoCliente.ATIVO.flag, situacaoCliente.INATIVO.flag];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  changePagination(pagination: any) {
    this.$emit("changePagination", pagination);
  }
}
</script>
<style scoped>
.legenda {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
