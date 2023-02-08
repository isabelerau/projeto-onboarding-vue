<template>
  <div>
    <v-icon dense :color="color">
      {{ icon }}
    </v-icon>
    <label v-if="showLabel"> {{ label }}</label>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { situacaoCliente } from "@/util/constants";
@Component({
  name: "SituacaoIcon",
})
export default class SituacaoIcon extends Vue {
  color = "";
  icon = "";
  label = "";

  @Prop({ type: Boolean, required: false, default: false })
  showLabel;

  @Prop({ type: String, required: true })
  flag;

  created() {
    this.setIconLabel(this.flag);
  }

  @Watch("flag")
  setIconLabel(flag) {
    if (flag === situacaoCliente.ATIVO.flag) {
      this.color = "success";
      this.icon = "mdi-check-circle";
      this.label = situacaoCliente.ATIVO.label;
    } else {
      this.color = "error";
      this.icon = "mdi-close-circle";
      this.label = situacaoCliente.INATIVO.label;
    }
  }
}
</script>
