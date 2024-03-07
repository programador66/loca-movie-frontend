import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../pages/Login.vue';
import Home from '../pages/Home.vue';
import Users from '../pages/Users.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login' // Redireciona a rota raiz para /login
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
    // Se o usuário estiver logado, redirecione para a página inicial
    if (to.path === '/login') {
      next('/home');
    } else {
      next(); // Continuar para a próxima rota
    }
  } else {
    if (to.meta.requiresAuth && !session?.isLoggedIn) {
      // Se a rota requer autenticação e o usuário não está logado, redirecione para a página de login
      next('/login');
    } else {
      next(); // Continuar para a próxima rota
    }
  }
})

export default router