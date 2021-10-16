import Vue from "vue";
import VueRouter from "vue-router";
import Speakers from "../views/Speakers";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    component: Speakers,
    meta: {
      requireAuth: false,
      title: "Голоса спикеров",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title =
      to.meta.title + " | Speechkit" ? to.meta.title : "Загрузка | Speechkit";
  });
});

export default router;
