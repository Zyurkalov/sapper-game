import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Game from "@/views/Game.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/game",
            redirect: "/",
        },
        {
            path: "/game/:rows/:columns/:maxBombs",
            name: "game",
            component: Game,
            props: (route) => {
                const rows = Number(route.params.rows) || 4;
                const columns = Number(route.params.columns) || 4;
                const maxBombs = Number(route.params.maxBombs) || 5;
                return {
                    rows,
                    columns,
                    maxBombs,
                };
            },
        },
        {
            path: "/honor-board",
            name: "honor-board",
            component: () => import("../views/HonorBoard.vue"),
        },
        {
            path: "/:pathMatch(.*)*",
            name: "404",
            component: () => import("../views/404.vue"),
        },
    ],
});

export default router;
