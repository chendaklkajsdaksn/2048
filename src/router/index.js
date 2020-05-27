import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Score from '../views/score.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/score',
    name: 'Score',
    component: Score
  },
  {
    path: '/game',
    name: 'Game',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/game.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
