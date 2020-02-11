import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Dashboard from "@/views/Dashboard.vue";
import Stations from "@/views/Stations.vue";
import User from "@/views/User.vue";
import FullLayout from '@/layout/fullLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    redirect: "/home",
    component: FullLayout,
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: { track: false },
        component: Home
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        meta: { track: false },
        component: Dashboard
      },
      {
        path: 'stations',
        name: 'Stations',
        meta: { track: false },
        component: Stations
      },
      {
        path: 'user',
        name: 'User',
        meta: { track: false },
        component: User
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
