import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Home from './modules/home/views/Home.vue'
import {initAuth} from "@/modules/user/store/auth/auth.types";
import {loadUserInfo} from "@/modules/user/store/user/user.types";
import {hideMenu} from "@/store/app/app.types";

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/feedback',
            name: 'feedback',
            component: () => import('./modules/feedback/views/Feedback.vue')
        },


        {
            path: '/create-event',
            name: 'createEvent',
            component: () => import('./modules/event/views/EventCreate.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('./modules/user/views/Profile.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/profile/edit',
            name: 'profileEdit',
            component: () => import('./modules/user/views/ProfileEdit.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/user/:id(\\d+)',
            name: 'user',
            component: () => import('./modules/user/views/User.vue')
        },
        {
            path: '/favorites',
            name: 'favorite',
            component: () => import('./modules/favorite/views/Favorite.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/my-events',
            name: 'myEvents',
            component: () => import('./modules/myEvents/views/MyEvents.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/my-messages',
            name: 'myMessages',
            component: () => import('./modules/myMessages/views/MyMessages.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/notifications',
            name: 'notifications',
            component: () => import('./modules/notifications/views/Notifications.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/friends',
            name: 'friends',
            component: () => import('./modules/friends/views/Friends.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/friends/requests',
            name: 'requests',
            component: () => import('./modules/friends/views/Requests.vue'),
            meta: {
                requiresAuth: true
            }
        },


        {
            path: '/login',
            name: 'login',
            component: () => import('./modules/user/views/Login1.vue'),
        },
        {
            path: '/login2',
            name: 'login2',
            component: () => import('./modules/user/views/Login2.vue'),
        },
        {
            path: '/error404',
            name: 'error404',
            component: () => import('./views/Error404.vue')
        },
        {
            path: '*',
            name: 'error404-2',
            component: () => import('./views/Error404.vue')
        }
    ]
});

router.beforeEach(async(to, from, next) => {
    if(!from.name){
        if(await store.dispatch('auth/'+ initAuth)){
            await store.dispatch('user/'+ loadUserInfo);
        }
    }

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters['auth/isGuest']){
            next({ name: 'login' });
            return;
        }
        else if(store.getters['auth/profileIsNotFilled'] && to.name !== 'profileEdit'){
            await store.dispatch('app/'+ hideMenu);
            next({ name: 'profileEdit' });
            return;
        }
    }
    next();
});

export default router;