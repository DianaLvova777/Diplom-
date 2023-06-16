import firebase from "firebase/app";
import { SET_RECIPE, GET_RECIPE, DELETE_RECIPE } from "./actions.type";
import { addRealTimeData, removeData } from "../common/api.service";

const state = {
  recipe: null
};

const actions = {
  [GET_RECIPE]({ state }) {
    let posts = "Записи не найдены";

    firebase.database().ref("nutrion").on("value", snapshot => {
      posts = (snapshot.val() && snapshot.val()) || "Записи не найдены"

      if (typeof posts !== "string") {
        posts = Object.values(posts);
        state.recipe = posts;
        console.log(posts);
      }
    });
  },

  [SET_RECIPE]({ state }, article) {
    addRealTimeData(
      {
        path: "recipe",
        data: article
      },
      res => {
        console.log(res);
      }
    );

    console.log(state, article);
  },

  [DELETE_RECIPE]({ state }, id) {
    const articleId = state.recipe.findIndex(el => el.id === id);
    state.recipe.splice(articleId, 1);
    removeData({ path: "recipe", id: id });
  }
};

const getters = {
  recipe: state => state.recipe
};

export default {
  state,
  actions,
  getters
}