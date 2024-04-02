import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/style/reset.scss";
import AnimeTop from "@/components/anime_top/index.vue";
import AnimeBottom from "@/components/anime_bottom/index.vue";
import AnimeCard from "@/components/anime_card/index.vue";
import pinia from "@/store";

const app = createApp(App);
app.component("AnimeTop", AnimeTop);
app.component("AnimeBottom", AnimeBottom);
app.component("AnimeCard", AnimeCard);
app.use(router);
app.use(ElementPlus);
app.use(pinia);
app.mount("#app");
