import { GET_TRAINING, REFRES_TRAINING } from "./actions.type";
import { getOnceData } from "../common/api.service";
import cookie from "cookie";

const state = {
  training: null
};

const actions = {
  [GET_TRAINING]({ state, dispatch }) {
    return new Promise(resolve => {
      getOnceData({ path: "trainings" })
        .then(res => {
          state.training = res;
          resolve("success");
          dispatch(REFRES_TRAINING);
        })
        .catch(err => alert(err));
    });
  },
  [REFRES_TRAINING]({ state }) {
    const keys = Object.keys(state.training);
    const trainings = cookie.parse(document.cookie);

    keys.forEach(key => {
      if (trainings[key]) trainings[key] = JSON.parse(trainings[key]);
      if (!trainings[key]) return;

      state.training[key].progress = trainings[key] ? trainings[key].progress : 0;
      state.training[key].training = trainings[key] ? trainings[key].training : 0;
    });
  }
};

const getters = {
  training: state => state.training
};

export default {
  state,
  actions,
  getters
};
