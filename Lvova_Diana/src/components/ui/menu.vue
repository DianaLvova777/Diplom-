<template>
  <div class="menu" :class="{active: showMenu}" @click="showMenu = !showMenu">
    <div class="burger">
      <div class="line"></div>
      <div class="line"></div>
    </div>

    <span class="logo">
      <!-- <img alt="logo" src="../../assets/images/logo_transparent_1.png" style="max-width: 100px"> -->
      <h2 style="font-size: 42px; color: #fff;line-height: 1;">Fitness</h2>
    </span>

    <div class="nav">
      <router-link
        v-for="item in navs"
        :to="item.path"
        class="nav__item"
        :key="item.id"
      >
        <div class="nav__item-fill"></div>
        <vs-row vs-align="center">
          <!-- <vs-icon :icon="item.icon"></vs-icon> -->
          <span class="nav__item--text">{{ item.name }}</span>
        </vs-row>
      </router-link>
    </div>
    <div class="auth" v-if="isAuth">
      <vs-row v-if="user.displayName">
        <vs-avatar :src="user.photoURL" />
        <vs-row style="width: 56%;margin: 0 10px; flex-grow: 1">
          <vs-col vs-w="12">
            <span style="color: #fff; font-weight:bold;">{{ user.displayName.substr(0, 8) }}</span>
          </vs-col>
          <vs-col vs-w="12">
            <span style="color: #cee;font-size: 12px">{{ user.lastSignInTime }}</span>
          </vs-col>
        </vs-row>
        <vs-button radius color="#fff" type="flat" icon="login" @click="logout()"></vs-button>
      </vs-row>
    </div>
  </div>
</template>

<script>
import cookie from "cookie";
import { mapGetters } from "vuex";

export default {
  created() {
    if (this.isAuth) this.setSee();

    if (document.cookie){
      const seeGoogleFit = Boolean(Number(cookie.parse(document.cookie).seeGoogleFit));

      this.see = seeGoogleFit;
    }
  },
  data() {
    return {
      showMenu: false,
      see: false,
      navs: [
        { id: 0, name: "Главная", path: "/", icon: "home" },
        { id: 1, name: "Расписание", path: "/schedule", icon: "portrait" },
        // { id: 2, name: "Питание", path: "/recipe", icon: "restaurant" },
        { id: 3, name: "Тренировки", path: "/training", icon: "fitness_center" },
        { id: 4, name: "Акции", path: "/news", icon: "feed" },
        { id: 5, name: "Настройки", path: "/settings", icon: "feed" },
        // { id: 5, name: "FAQ", path: "/faq", icon: "help_outline" }
      ]
    };
  },
  computed: {
    ...mapGetters(["isAuth", "user", "userActivity"])
  },
  methods: {
    setSee() {
      const setCookie = "seeGoogleFit=1; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT";

      this.see = true;
      document.cookie = setCookie;
    },
    authGoogle() {
      this.$store.dispatch("auth")
        .then(msg => this.$vs.notify({title: "",text: msg, color: "success",position: "top-right"}))
        .catch(err => this.$vs.notify({title: "",text: err, color: "danger",position: "top-right"}));
    },
    logout() {
      this.$store.dispatch("logout")
        .then(msg => this.$vs.notify({title: "",text: msg, color: "success",position: "top-right"}))
        .catch(msg => this.$vs.notify({title: "",text: msg, color: "success",position: "top-right"}));
    }
  }
};
</script>
