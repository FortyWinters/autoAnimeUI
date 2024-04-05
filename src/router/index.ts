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
      path: "/setting",
      component: () => import("@/pages/setting/index.vue"),
    },
    {
      path: "/anime",
      component: () => import("@/pages/anime/index.vue"),
    },
    {
      path: "/video",
      component: () => import("@/pages/video/index.vue"),
    },
    {
      path: "/resource",
      component: () => import("@/pages/resource/index.vue"),
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
