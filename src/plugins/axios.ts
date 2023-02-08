import axios from "axios";
import i18n from "@/plugins/vue-i18n";
import GlobalModule from "@/store/modules/GlobalModule";
import SnackbarQueue from "@ungp/sds-snackbar-queue";

const Api = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

Api.interceptors.request.use(function (config) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  config.url = encodeURI(config.url!);
  return config;
});

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorMessage =
      error.response.data.message ||
      i18n.t("MESSAGE.ERRO_REQUISICAO").toString();
    GlobalModule.dismissLoading();
    return SnackbarQueue.error(errorMessage);
  }
);

Api.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

export default Api;
