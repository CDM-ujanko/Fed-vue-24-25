import { createWebHistory, createRouter } from 'vue-router';
import HomeView from './views/HomeView.vue';
import AboutView from './views/AboutView.vue';
import PostView from './views/PostView.vue';
import NotFoundView from './views/NotFoundView.vue';



const routes = [
    { path: '/', component: HomeView },
    { path: '/about', component: AboutView },
    { path: '/post/:id(\\d+)', component: PostView },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;