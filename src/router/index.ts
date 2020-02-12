import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Stations from "../views/Stations.vue";
import StationsDetails from "../views/StationDetails.vue"
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
        path: 'stations',
        name: 'Stations',
        meta: { track: false },
        component: Stations
      },
      {
        path: 'stationDetails/:stationId',
        name: 'StationDetails',
        meta: { track: false },
        component: StationsDetails,
        props: true
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
