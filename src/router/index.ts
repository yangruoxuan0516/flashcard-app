import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import AddFlashcards from '../components/AddFlashcards.vue';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import ReviewFlashcards from '../components/ReviewFlashcards.vue';

import { auth } from '../firebase/firebase.ts';
import { onAuthStateChanged } from 'firebase/auth';


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: ReviewFlashcards,
    meta: { requiresAuth: true }
  },
  {
    path: '/add',
    component: AddFlashcards,
    meta: { requiresAuth: true } // 🔐 protected route
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/signup',
    component: Signup
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



let isAuthReady = false;

router.beforeEach((to, _from, next) => {
  if (isAuthReady) {
    const requiresAuth = to.meta.requiresAuth;
    const currentUser = auth.currentUser;

    if (requiresAuth && !currentUser) {
      next('/login');
    } else {
      next();
    }
  } else {
    onAuthStateChanged(auth, () => {
      isAuthReady = true;
      const requiresAuth = to.meta.requiresAuth;
      const currentUser = auth.currentUser;

      if (requiresAuth && !currentUser) {
        next('/login');
      } else {
        next();
      }
    });
  }
});


export default router;
