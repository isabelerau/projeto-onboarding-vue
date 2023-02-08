import Vue from "vue";
import VueI18n from "vue-i18n";
import pt from "@/i18n/pt.json";
import { Locales } from "@/i18n/locales";

Vue.use(VueI18n);

const messages = { [Locales.PT]: pt };
const defaultLocale = Locales.PT;

export default new VueI18n({
  messages,
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
});
