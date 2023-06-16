import { getOnceData } from "../common/api.service";
import { GET_FAQ, SET_FAQ } from "./actions.type";

const state = {
  faq: null
};

const actions = {
  [GET_FAQ]({ state }) {
    getOnceData({ path: "faq" })
      .then(res => {
        console.log('res: ', res);
        state.faq = Object.values(res);
      })
      .catch(err => alert(err));
  },
  [SET_FAQ]({ state }) {
    console.log(state);
  }
};

const getters = {
  faq: state => state.faq
};

export default {
  state,
  actions,
  getters
};
