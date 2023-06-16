<template>
  <div>
    <vs-row vs-align="flex-start">
      <vs-col
        vs-lg="8"
        vs-sm="12"
        vs-xs="12"
      >
        <news-view v-if="article" :article="article" />
      </vs-col>
      <vs-col
        vs-lg="4"
        vs-sm="12"
        vs-xs="12"
      >
        <vs-card class="cardx">
          <h1>Последние новости</h1>

          <news-list :list="news" :count="3" :sizeW="{
            lg: 12,
            sm: 12,
            xs: 12
          }" />
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "NewsPage",
  components: {
    newsView: () => import("../components/news/news-view"),
    newsList: () => import("../components/news/news-list")
  },
  created() {
    this.getNews();
  },
  computed: {
    ...mapGetters(["news"]),
    article() {
      let news = this.news;

      if (news) {
        news = news.filter(el => this.$route.params.id === el.id)[0]
      }

      return news
    }
  },
  methods: {
    ...mapActions(["getNews"])
  }
};
</script>

<style lang="scss" scoped></style>
