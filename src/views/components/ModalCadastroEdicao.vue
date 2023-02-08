<template>
  <sds-modal
    :title="titleModal"
    v-model="showModal"
    :position="position"
    :width="width"
    @fechar="close"
    @keydown.esc="close"
    tabindex="0"
    persistent
    scrollable
    :key="keySequencial"
  >
    <v-row dense>
      <v-col>
        <v-label> {{ $t("LABEL.NOME_CLIENTE") + ":" }} </v-label>
        <v-text-field v-model.number="objeto.nome" dense outlined />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col class="pb-0">
        <sds-input-control
          required
          :label="$t('LABEL.CPF')"
          v-slot="{ errors }"
        >
          <v-text-field
            v-model="objeto.cpf"
            v-mask="'###.###.###-##'"
            dense
            outlined
            maxlength="200"
            :error-messages="errors"
          />
        </sds-input-control>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-label> {{ $t("LABEL.DATA_NASCIMENTO") + ":" }} </v-label>
        <sds-date-picker placeholder="DD/MM/AAAA" v-model="objeto.dataNasc" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="6">
        <sds-input-control
          required
          :label="$t('LABEL.SITUACAO') + ':'"
          v-slot="{ errors }"
        >
          <v-select
            v-model="objeto.situacao"
            :placeholder="$t('PLACEHOLDER.SELECIONE')"
            :items="optionsSituacoes"
            outlined
            dense
            :error-messages="errors"
          />
        </sds-input-control>
      </v-col>
    </v-row>

    <v-row dense justify="end" class="mt-3">
      <v-btn
        color="primary"
        text
        class="ml-4 mr-2 mb-5"
        @click="confirmar"
        :disabled="verificarCamposPreenchidos()"
      >
        {{ $t("BUTTON.CONFIRMAR") }}
      </v-btn>
    </v-row>
  </sds-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import { listaSituacoes, listaSimNao } from "@/util/constants.js";
import format from "@/util/format";

@Component({
  name: "ModalCadastroEdicao",
})
export default class ModalCadastroEdicao extends Vue {
  position = "center";
  width = "700";
  keySequencial = 0;
  optionsSituacoes = listaSituacoes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  objeto: any = {};

  @Prop({ required: true, default: false })
  showModal;

  @Prop()
  titleModal;

  @Prop()
  cliente;

  @Emit()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  close() {}

  @Watch("showModal")
  incrementarSequencial() {
    this.keySequencial++;

    this.objeto = {
      codigo: this.cliente?.codigo,
      nome: this.cliente?.nome,
      cpf: this.cliente?.cpf,
      dataNasc: format.isStringDate(this.cliente?.dataNasc)
        ? format.asIsoWithoutTZ(this.cliente?.dataNasc)
        : this.cliente?.dataNasc,
      situacao:
        this.cliente?.ativo === listaSimNao.NAO.flag
          ? listaSimNao.NAO.value
          : this.cliente?.ativo === listaSimNao.SIM.flag
          ? listaSimNao.SIM.value
          : null,
    };
  }

  verificarCamposPreenchidos() {
    if (this.objeto.nome) {
      return false;
    } else {
      return true;
    }
  }

  confirmar() {
    this.$emit("salvar", this.objeto);
  }
}
</script>
