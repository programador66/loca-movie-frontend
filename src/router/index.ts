import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../pages/Login.vue';
import Home from '../pages/Home.vue';
import Users from '../pages/Users.vue';
import Clients from '../pages/Clients.vue';
import SearchMovie from '../pages/SearchMovie.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
    meta: { requiresAuth: true }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/clients',
    name: 'Clients',
    component: Clients,
    meta: { requiresAuth: true } // Rota protegida que requer autenticação
  },
  {
    path: '/search-movies',
    name: 'SearchMovie',
    component: SearchMovie,
    meta: { requiresAuth: true } // Rota protegida que requer autenticação
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const data = localStorage.getItem('user@session');
  const session = data ? JSON.parse(data) : null;

  if (session && session?.isLoggedIn) {
    if (to.path === '/login') {
      next('/home');
    } else {
      next();
    }
  } else {
    if (to.meta.requiresAuth && !session?.isLoggedIn) {
      next('/login');
    } else {
      next();
    }
  }
})

export default router