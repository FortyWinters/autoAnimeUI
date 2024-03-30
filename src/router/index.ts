import { createRouter, createWebHistory } from "vue-router";
import MyAnime from "@/pages/MyAnime.vue";
import List from "@/pages/List.vue";
import Download from "@/pages/Download.vue";
import Setting from "@/pages/Setting.vue";
import Anime from "@/pages/Anime.vue";
import Detail from "@/pages/Detail.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "myAnime",
      path: "/",
      component: MyAnime,
    },
    {
      name: "list",
      path: "/list",
      component: List,
    },
    {
      name: "download",
      path: "/download",
      component: Download,
    },
    {
      name: "setting",
      path: "/setting",
      component: Setting,
    },
    {
      name: "anime",
      path: "/anime",
      component: Anime,
      props(route) {
        return route.query;
      },
      children: [
        {
          name: "detail",
          path: "detail",
          component: Detail,
          props(route) {
            return route.query;
          },
        },
      ],
    },
  ],
});

export default router;
