import { createWebHistory, createRouter } from 'vue-router';
import { useLoginStore } from './store/loginStore.js';
import HomeView from './views/HomeView.vue';
import AboutView from './views/AboutView.vue';
import LoginView from './views/LoginView.vue';
import PostView from './views/PostView.vue';
import NotFoundView from './views/NotFoundView.vue';


const routes = [
    { path: '/', component: HomeView },
    { path: '/about', component: AboutView },
    { path: '/login', component: LoginView },

    { path: '/post/:id', component: PostView },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
    {
        path: '/admin',
        children: [
            {
                path: '',
                component: () => import('./views/admin/AdminHomeView.vue')
            }, {
                path: 'post',
                component: () => import('./views/admin/AdminPostView.vue'),
            },
            {
                path: 'post/:id',
                component: () => import('./views/admin/AdminPostView.vue'),
            }
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    console.log(to, to.fullPath.startsWith('/admin'));
    if (to.fullPath.toLocaleLowerCase().startsWith('/admin') && !useLoginStore().isLoggedIn) {
        next({
            path: 'login',
            replace: true
        })
    } else {
        next();
    }
})

export default router;