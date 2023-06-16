import { AUTH, STATE_CHANGED, LOGOUT } from "./actions.type";
import { getFitnessData } from "../common/googleapis.service";
import { getOnceData } from "../common/api.service";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";


const state = {
  user: {},
  userActivity: {},
  userSteps: null,
  isAuth: false
};
const actions = {
  [AUTH]({ state }) {
    return new Promise((resolve, reject) => {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("email");
      provider.addScope("profile");
      provider.addScope("https://www.googleapis.com/auth/fitness.activity.read");
      firebase.auth().languageCode = "ru";

      firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
          console.log(result);
          var token = result.credential.accessToken;
          var user = result.user;
          var date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

          document.cookie = `t=${token};path=/;expires=${date}`;

          state.user = user.providerData[0];
          state.isAuth = true;
          resolve("Авторизация произведена успешно!")
        }).catch(error => {
          reject(error.message);
        });
    });
  },
  [LOGOUT]({ state }) {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut().then(() => {
        state.user = {};
        state.userActivity = {};
        state.isAuth = false;
        resolve("Вы успешно вышли из системы!")
      }).catch((error) => {
        reject(error.message);
      });
    })
  },
  [STATE_CHANGED]({ state, dispatch }){
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        getFitnessData()
          .then(res => {
            state.userSteps = res.userSteps,
            state.userActivity = res.userActivity
          })
          .catch(() => {
            dispatch(LOGOUT);
          });
        state.user = user.providerData[0];
        state.user.lastSignInTime = new Date(user.metadata.lastSignInTime).toLocaleString("ru").split(",")[0];
        getOnceData({ path: "admins", id: user.uid })
          .then(res => state.user.adm = res.s)
          .catch(err => console.log(err));

        state.isAuth = true;
      }
    });
  }
};
const getters = {
  isAuth: state => state.isAuth,
  user: state => state.user,
  userActivity: state => state.userActivity,
  userSteps: state => state.userSteps
};

export default {
  state,
  actions,
  getters
};
