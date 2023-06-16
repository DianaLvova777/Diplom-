<template>
  <div class="news">
    <h1 class="m15">Акции</h1>

    <div class="search m15">
      <vs-input icon="search" size="large" placeholder="Поиск" v-model="search"/>
    </div>

    <news-list :list="newsList" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "News",
  components: {
    newsList: () => import("../components/news/news-list")
  },
  data() {
    return {
      search: ""
    };
  },
  created() {
    this.getNews();
  },
  computed: {
    ...mapGetters(["news"]),
    newsList() {
      let news = this.news || [];
      const search = this.search.toLowerCase().trim();

      if (this.count && news.length > this.count) {
        news = news.splice(0, this.count);
      }
      if (news.length > 1 && search.length > 3) {
        news = news.filter(el => (el.title || "").toLowerCase().includes(search));
      }

      return news;
    }
  },
  methods: {
    getNews() {
      this.$store.dispatch("getNews");
    }
  }
};
</script>

<style lang="scss" scoped></style>

<docs>
#### Страница списка новостей

</docs>
