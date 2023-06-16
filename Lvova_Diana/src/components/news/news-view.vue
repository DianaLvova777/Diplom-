<template>
  <div class="news-view">
    <div class="clearfix mb25">
      <vs-button
        color="white"
        size="small"
        type="flat"
        icon="arrow_back_ios"
        @click="$router.push('/news')">
        Список новостей
      </vs-button>
    </div>
    <h1 class="news-view__title">{{ article.title }}</h1>
    <p>{{ article.date }}</p>
    <div class="clearfix news-view__tags">
      <vs-chip
        v-for="(item, i) in article.tags"
        :color="randomColor()"
        :key="i"
        transparent
      >
        {{ item }}
      </vs-chip>
    </div>

    <img class="news-view__media" :src="article.contentImage" :alt="article.title">
    <div class="news-view__content" v-html="article.content">
    </div>
  </div>
</template>

<script>
import { getRandomColor } from "../../utils/utils";

/**
 * Компонент просмотра полной новости
 * @displayName NewsView.vue
 */
export default {
  name: "NewsView",
  props: {
    /**
     * Объект новости для просмотра.
     */
    article: {
      type: Object,
      require: true
    }
  },
  methods: {
    /**
     * Генерация случайного цвета
     * 
     * @returns {string} - Возвращает случайный цвет
     * @public
     */
    randomColor() {
      return getRandomColor()
    },

    onClick($event) {
      /**
       * Triggered when button is clicked.
       * Allows to use component without .native
       *
       * @event click
       * @property {event}
       * @type {object}
       */
      this.$emit('click', $event)
    }
  }
};
</script>

<style lang="scss" scoped>
.news-view {
  &__title {
    line-height: 1.3;
    margin-bottom: 10px;
  }
  &__tags {
    margin-bottom: 65px;
  }
  &__media {
    width: 100%;
    margin-bottom: 35px;
  }
}
</style>
