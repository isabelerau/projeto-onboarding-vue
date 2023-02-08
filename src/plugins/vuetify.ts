import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import "@mdi/font/css/materialdesignicons.css";
import pt from "vuetify/src/locale/pt";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#005B95",
        secondary: "#474747",
        accent: "#088CCA",
        error: "#B00020",
        info: "#2196F3",
        success: "#5A9930",
        warning: "#E47E1A",
        support: "#5C5CFF",
      },
    },
  },
  icons: {
    iconfont: "mdiSvg",
  },
  lang: {
    locales: { pt },
    current: "pt",
  },
});
