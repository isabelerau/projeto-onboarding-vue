import Vue from "vue";
import {
  extend,
  localize,
  ValidationProvider,
  ValidationObserver,
} from "vee-validate";
import { required, email, max } from "vee-validate/dist/rules";
import ptBR from "vee-validate/dist/locale/pt_BR.json";

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

const dict = {
  messages: {
    ...ptBR.messages,
    required: "Campo obrigatório",
    email: "Deve ser um email válido",
    max: "O campo não deve conter mais que {length} caracteres",
  },
};

extend("required", required);
extend("email", email);
extend("max", max);
localize("pt_BR", dict);
