const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: "/projeto-onboarding-vue",
  devServer: {
    port: 3002,
  },
  transpileDependencies: ["vuetify"],
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import '~@ungp/sds-components-baseline/sds-variables.scss';`,
      },
    },
  },
});
