<template>
  <div id="app">
    <c-menu />
    <div class="page">
      <transition name="fade">
        <div class="hello" v-if="!isAuth">
          <div class="hello__block d-flex">
            <h1 class="hello__title">Авторизация</h1>
            <button type="border" class="hello__button" size="small" @click="authGoogle()">
              <vs-row vs-align="center">
                <icon-base
                  component="icon-google"
                  class="hello__icon"
                  :width="24"
                  :height="24"
                />
                Google
              </vs-row>
            </button>
          </div>
        </div>
      </transition>
      <transition name="jump">
        <router-view class="page__block" />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
  import menu from './components/ui/menu'

  export default {
    components: {
      'c-menu': menu
    },
    created() {
      this.getHours();
    },
    data() {
      return {
        hours: 0
      }
    },
    computed: {
      ...mapGetters(["isAuth"]),
      hello() {
        let say;

        if (this.hours > 7 && this.hours < 12)
          say = "Доброе утро!";
        if (this.hours > 12 && this.hours < 18)
          say = "Добрый день!";
        if (this.hours >= 18 && this.hours <= 23)
          say = "Добрый вечер!";
        if (this.hours >= 0 && this.hours < 6)
          say = "Доброй ночи!";

        return say;
      }
    },
    methods: {
      getHours() {
        const time = new Date().getHours();

        this.hours = time;
      },
      authGoogle() {
        this.$store.dispatch("auth")
          .then(msg => this.$vs.notify({title: "",text: msg, color: "success",position: "top-right"}))
          .catch(err => this.$vs.notify({title: "",text: err, color: "danger",position: "top-right"}));
      },
    }
  };
</script>

<style lang="scss">
  @import './assets/style/varibles.scss';
  .hello {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $bg;
    z-index: 9999;
    &__block {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
      max-width: 420px;
      margin: 5px;
    }
    &__title {
      margin-bottom: 5px;
    }
    &__text {
      margin-bottom: 20px;
    }
    &__icon {
      margin-right: 10px;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: all 1s .6s;
  }
  .fade-leave-active .hello__block {
    transition: all 0.3s;
    opacity: 0;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  
</style>
