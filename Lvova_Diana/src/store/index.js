import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth.module";
import about from "./about.module";
import news from "./news.module";
import recipe from "./recipe.module";
import training from "./training.module";
import faq from "./faq.module";
import foods from "./foods.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    about,
    news,
    recipe,
    training,
    faq,
    foods
  }
});
