<template>
  <v-app>
    <v-main>
      <sds-layout :loading="loading" class="fill-height">
        <router-view />
      </sds-layout>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GlobalModule from "./store/modules/GlobalModule";

@Component
export default class App extends Vue {
  get loading() {
    return GlobalModule.loading;
  }
}
</script>
