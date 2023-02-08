<template>
  <v-card class="mb-4">
    <v-card-title>
      <v-row>
        <v-col>
          {{ $t("TITLE.PARAMETROS_CONSULTA") }}
        </v-col>
        <v-col class="text-end">
          <v-btn color="primary" text class="ml-4 mr-2 mb-5" @click="adicionar">
            {{ $t("BUTTON.NOVO") }}
            <v-icon right> { mdi-plus-circle-outline }</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col>
          <v-label>{{ $t("LABEL.CLIENTE") + ":" }}</v-label>
          <sds-autocomplete
            v-model="filtro.nome"
            :placeholder="$t('PLACEHOLDER.PESQUISE_POR_NOME')"
            :load-options="loadCliente"
            no-cache
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-radio-group v-model="filtro.ativo" class="mt-0 pt-0" row dense>
            <v-label> {{ $t("LABEL.SITUACAO") }}</v-label>
            <v-radio
              v-for="item in situacoes"
              :key="item.key"
              :value="item.value"
              :label="item.text"
            />
          </v-radio-group>
        </v-col>
        <v-col class="text-end">
          <v-btn
            color="primary"
            text
            class="ml-4 mr-2 mb-3"
            @click="limparFiltro"
          >
            {{ $t("BUTTON.LIMPAR") }}
          </v-btn>
          <v-btn color="primary" class="ml-4 mr-2 mb-3" @click="consultar">
            {{ $t("BUTTON.CONSULTAR") }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
    <modal-cadastro-edicao
      :titleModal="$t('TITLE.CADASTRO_CLIENTE')"
      :showModal="showModal"
      @salvar="salvar"
      @close="showModal = false"
    />
  </v-card>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ClienteAutoComplete from "@/options-autocomplete/ClienteAutoComplete";
import { AutocompleteOptions, SearchTextPageable } from "@/types/core";
import { listaSituacoes } from "@/util/constants";
import ClienteModule from "@/store/modules/ClienteModule";
import Filtro from "@/types/Filtro";
import ModalCadastroEdicao from "@/views/components/ModalCadastroEdicao.vue";

@Component({
  name: "CardConsulta",
  components: {
    ModalCadastroEdicao,
  },
})
export default class CardConsulta extends Vue {
  filtroInicial: Filtro = {
    ativo: true,
  };
  clienteAutoComplete: ClienteAutoComplete = new ClienteAutoComplete();
  situacoes = listaSituacoes;
  showModal = false;

  get filtro() {
    return ClienteModule.filtro;
  }

  async loadCliente(
    searchTextPageable: SearchTextPageable
  ): Promise<AutocompleteOptions> {
    return await this.clienteAutoComplete.loadOptions(searchTextPageable);
  }

  consultar() {
    this.$emit("consultar");
  }

  limparFiltro() {
    ClienteModule.setFiltro({ ativo: true });
    this.consultar();
  }

  adicionar() {
    this.showModal = true;
  }

  salvar(item) {
    this.$emit("salvar", item);
    this.showModal = false;
  }
}
</script>
