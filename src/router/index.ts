import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/home",
      component: () => import("@/pages/home/index.vue"),
    },
    {
      path: "/list",
      component: () => import("@/pages/list/index.vue"),
    },
    {
      path: "/download",
      component: () => import("@/pages/download/index.vue"),
    },
    {
      path: "/setting",
      component: () => import("@/pages/setting/index.vue"),
    },
    {
      path: "/anime",
      component: () => import("@/pages/anime/index.vue"),
    },
    {
      path: "/",
      redirect: "/home",
    },
  ],
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});
