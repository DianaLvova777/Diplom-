<template>
  <vs-row>
    <p class="m15" v-if="!list || list.length <= 0">Ничего не найдено.</p>
    <transition-group name="list" tag="vs-row">
      <vs-col
        v-for="article in list"
        :key="article.id"
        type="flex"
        vs-justify="center"
        vs-align="center"
        :vs-lg="sizeW.lg"
        :vs-sm="sizeW.sm"
        :vs-xs="sizeW.xs"
      >
        <vs-card class="cardx news-card" fixedHeight>
          <div slot="media" class="news-card__media">
            <img :src="article.previewImage">
          </div>
          <div>
            <router-link :to="`/news-page/${article.id}`">
              <h2 class="news-card__title">{{ article.title }}</h2>
            </router-link>
            <p class="mb55 news-card__text">
              {{ article.previewText.substr(0, 64) }}...
            </p>
          </div>
          <div slot="footer">
            <vs-row vs-justify="flex-end">
              <vs-button
                color="danger"
                type="flat"
                icon="favorite"
                size="small"
                @click="like(article.id)"
              >{{ article.likes }}</vs-button>
            </vs-row>
          </div>
        </vs-card>
      </vs-col>
    </transition-group>
  </vs-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "NewsList",
  props: {
    count: {
      type: Number
    },
    sizeW: {
      type: Object,
      default: () => {
        return {
          lg: 4,
          sm: 6,
          xs: 12
        }
      }
    },
    list: {
      type: Array
    }
  },
  computed: {
    ...mapGetters(["user"]),
    newsList() {
      let list = this.list || [];

      if (this.count && list.length > this.count) {
        list = list.splice(0, this.count);
      }

      return list;
    }
  },
  methods: {

    like(id) {
      this.news.forEach(el => (el.id === id ? el.likes++ : false));
    },

    share(id) {

      this.news.forEach(el => el.id === id ? el.shares++ : false);
      this.$store.dispatch("setNews", "su")
    },

    deleteNews(id) {
      this.$emit("delete", id);
    }
  }
};
</script>

<style lang="scss" scoped>
.con-vs-card {
  overflow: hidden;
}
.news-card {
  &__title {
    font-size: 1.1rem;
    line-height: 1.3;
    margin-bottom: 15px;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  &__text {
    color: #c2c2c5;
    font-weight: 300;
  }
}
.list-item {
  justify-content: center;
  align-items: center;
  margin-left: 0%;
  width: 100%;
}
.list-enter-active, .list-leave-active {
  transition: all .5s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
