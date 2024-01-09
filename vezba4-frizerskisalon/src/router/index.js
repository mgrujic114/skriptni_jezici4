import Vue from 'vue'
import VueRouter from 'vue-router'
import PocetnaView from '../views/PocetnaView.vue'
import ProizvodiView from '../views/ProizvodiView.vue'
import ProizvodView from '../views/ProizvodView.vue'
import KorpaView from '../views/KorpaView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Pocetna',
    component: PocetnaView
  },
  {
    path: '/proizvodi',
    name: 'Proizvodi',
    component: ProizvodiView
  },
  {
    path: '/proizvod/:id',
    name: 'Proizvod',
    component: ProizvodView
  },
  {
    path: '/korpa',
    name: 'KorpaView',
    component: KorpaView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/register',
    name: 'RegisterView',
    component: RegisterView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router