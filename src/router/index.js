import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import Dashboard from "@/views/Dashboard";
import SignUp from "@/views/SignUp";
import Reset from "@/views/Reset";
import CreatePassword from "@/views/CreatePassword";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      auth: false,
      layout: 'AuthLayout'
    }
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      auth: true,
      layout: 'MainLayout'
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: {
      auth: false,
      layout: 'MainLayout'
    }
  },
  {
    path: '/reset',
    name: 'Reset',
    component: Reset,
    meta: {
      auth: false,
      layout: 'AuthLayout'
    }
  },
  {
    path: '/createPassword',
    name: 'CreatePassword',
    component: CreatePassword,
    meta: {
      auth: false,
      layout: 'AuthLayout'
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  //for test
  const currentUser = localStorage.user
  const requireAuth = to.matched.some(record => record.meta.auth)
  if(requireAuth && !currentUser){
    next('/login')
  } else {
    next()
  }
})

export default router
