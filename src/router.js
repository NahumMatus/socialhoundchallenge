import Vue from "vue";
import VueRouter from 'vue-router'
    



Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "houses",
    component: () => import('./components/HousesGOT.vue')
  },
  {
    path: "/character/:id",
    name: "character",
    component: () => import('./components/Character.vue')
  }
];

const router = new VueRouter({
    mode: "history",
    routes
  });
  
export default router;
