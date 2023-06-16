<template>
  <div class="recipe-filters">
    <vs-button
      color="dark"
      type="flat"
      icon="tune"
      v-if="!show"
      @click="show = !show"
    ></vs-button>
    <transition name="resize">
      <vs-card class="recipe-filters__block" v-if="show">
        <vs-button
          class="recipe-filters__close"
          color="dark"
          type="flat"
          icon="close"
          @click="show = !show"
        ></vs-button>

        <h2>Фильтры</h2>

        По количеству лайков
      </vs-card>
    </transition>
  </div>
</template>

<script>
export default {
  name: "recipeFilter",
  data() {
    return {
      show: false,
      search: ""
    }
  },
};
</script>

<style lang="scss" scoped>
.recipe-filters {
  width: 100%;
  max-width: 100%;
  &__block {
    position: relative;
    top: -1px;
    left: -1px;
    width: 100%;
    height: 100px;
    position: relative;
    z-index: 9999;
  }
  &__close {
    position: absolute;
    top: 10px; right: 10px;
  }
}
</style>

<style lang="scss">
.resize-enter-active, .resize-leave-active {
  transition: all .5s;
}
.resize-enter, .resize-leave-to {
  opacity: 0;
  height: 0;
}
</style>
