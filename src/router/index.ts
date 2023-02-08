import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/consulta-clientes",
    name: "ConsultaClientes",
    component: () => import("../views/ConsultaClientes.vue"),
  },
  {
    path: "/detalhes-cliente/:codigo",
    name: "DetalhesCliente",
    component: () => import("../views/DetalhesCliente.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
