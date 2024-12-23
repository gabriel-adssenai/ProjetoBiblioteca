import { createRouter, createWebHistory } from 'vue-router'; 
import Login from '../views/login.vue'; 
import Dashboard from '../views/Dashboard.vue'; 
import App from '../views/App.vue'; // Importa o componente App
import Cadastro  from '@/views/Cadastro.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/app', // Nova rota para App.vue
    name: 'App',
    component: App,
  },
  {
    path: '/cadastro', // Nova rota para App.vue
    name: 'Cadastro',
    component: Cadastro,
  },
  {
    path: '/:catchAll(.*)', // Usando a nova sintaxe para rotas coringa
    redirect: '/login',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Proteção das rotas
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token');

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;