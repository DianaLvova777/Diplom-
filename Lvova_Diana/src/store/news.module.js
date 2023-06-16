import firebase from "firebase/app";
import { SET_NEWS, GET_NEWS, DELETE_NEWS } from "./actions.type";
import { addRealTimeData, removeData } from "../common/api.service";

const state = {
  news: null
};

const actions = {
  [GET_NEWS]({ state }) {
    let posts = "Новостей нет";

    firebase.database().ref("news").on("value", snapshot => {
      posts = (snapshot.val() && snapshot.val()) || "Новостей нет"

      if (typeof posts !== "string") {
        posts = Object.values(posts);
        state.news = posts;
      }
    });
  },

  [SET_NEWS]({ state }, article) {
    addRealTimeData(
      {
        path: "news",
        data: article
      },
      res => {
        console.log(res);
      }
    );

    console.log(state, article);
  },

  [DELETE_NEWS]({ state }, id) {
    const articleId = state.news.findIndex(el => el.id === id);
    state.news.splice(articleId, 1);
    removeData({ path: "news", id: id });
  }
};

const getters = {
  news: state => state.news
};

export default {
  state,
  actions,
  getters
}