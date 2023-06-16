import { getOnceData } from "../common/api.service";
import { GET_ABOUT } from "./actions.type";

const state = {
  about: {}
};

const actions = {
  [GET_ABOUT]({ state }) {
    getOnceData({ path: "about" })
      .then(res => {
        state.about = res;
      })
      .catch(err => alert(err));
  }
};

const getters = {
  about: state => state.about
};

export default {
  state,
  actions,
  getters
};
