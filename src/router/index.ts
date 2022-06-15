import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Stations from "../views/Stations.vue";
import StationsDetails from "../views/StationDetails.vue";
import StationForm from "../views/StationForm.vue";
import FullLayout from '@/layout/fullLayout.vue';
import Login from "@/views/login.vue";
import { securityService } from '@/services/security';

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
  {
    path: '/login',
    name: 'login',
    meta: { requireAuth: false },
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.requireAuth == false) next(); //route accessible without authorization
  else if (securityService.isUserAuthenticated()) next(); //authorization has been granted
  else next({ name: 'login' }); //authorization is missing
});

export default router
