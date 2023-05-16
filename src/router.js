import { createRouter, createWebHistory } from 'vue-router';

// Импортируем компоненты
import UserForm from './components/UserForm.vue';
import NotFound from './components/NotFound.vue';
import SuccessMessage from './components/SuccessMessage.vue';
import submitForm from './components/submitForm.js';
import AdminForm from './components/AdminForm.vue';

// Создаем экземпляр роутера и определяем маршруты
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: UserForm },
    { path: '/not-found', component: NotFound },
    { path: '/success', component: SuccessMessage },
    { path: '/submitform', component: submitForm },
    { path: '/adminform', component: AdminForm },
    { path: '/:catchAll(.*)', redirect: '/' },
  ],
});

// Экспортируем экземпляр роутера
export default router;