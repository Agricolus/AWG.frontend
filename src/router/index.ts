import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Stations from "../views/Stations.vue";
import StationsDetails from "../views/StationDetails.vue"
import StationForm from "../views/EditStation.vue"
import FullLayout from '@/layout/fullLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    redirect: "/home",
    component: FullLayout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home
      },
      {
        path: '/stations',
        name: 'stations',
        component: Stations
      },
      {
        path: '/stationdetails/:stationId',
        name: 'station-details',
        component: StationsDetails,
        props: true
      },
      {
        path: '/stations/edit/:stationId?',
        name: 'station-editing',
        component: StationForm,
        props: true
      },

    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
