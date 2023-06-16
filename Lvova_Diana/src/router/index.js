import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/training",
    name: "Training",
    component: () => import(/* webpackChunkName: "training" */ "../views/Training.vue")
  },
  {
    path: "/training-page/:id",
    name: "TrainingPage",
    component: () => import(/* webpackChunkName: "training-page" */ "../views/TrainingPage.vue")
  },
  {
    path: "/schedule",
    name: "SchedulePage",
    component: () => import(/* webpackChunkName: "panel" */ "../views/Schedule.vue")
  },
  {
    path: "/settings",
    name: "ProgressPage",
    component: () => import(/* webpackChunkName: "panel" */ "../views/Progress.vue")
  },
  {
    path: "/news",
    name: "News",
    component: () => import(/* webpackChunkName: "news" */ "../views/News.vue")
  },
  {
    path: "/news-page/:id",
    name: "NewsPage",
    component: () => import(/* webpackChunkName: "news-page" */ "../views/NewsPage.vue")
  },
  {
    path: "/recipe",
    name: "Recipe",
    component: () => import(/* webpackChunkName: "recipe" */ "../views/Recipe.vue")
  },
  {
    path: "/recipe-page/:id",
    name: "RecipePage",
    component: () => import(/* webpackChunkName: "recipe-page" */ "../views/RecipePage.vue")
  },
  {
    path: "/panel",
    name: "AdminPanel",
    component: () => import(/* webpackChunkName: "panel" */ "../views/admin/AdminPanel.vue")
  }
];

const router = new VueRouter({
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
