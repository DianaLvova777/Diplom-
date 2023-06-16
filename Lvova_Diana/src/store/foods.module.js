import { getOnceData } from "../common/api.service";
import { GET_FOODS } from "./actions.type";

const state = {
  foods: []
};

const actions = {
  [GET_FOODS]({ state }) {
    getOnceData({ path: "foods" })
      .then(res => {
        console.log(res);
        state.foods = Object.values(res);
      })
      .catch(err => alert(err));
  }
};

const getters = {
  foods: state => state.foods
};

export default {
  state,
  actions,
  getters
};
