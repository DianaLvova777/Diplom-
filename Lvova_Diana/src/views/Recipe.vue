<template>
  <div class="recipe">
    <h1 class="m15">Рецепты</h1>

    <div class="search m15">
      <vs-input icon="search" size="large" placeholder="Поиск" v-model="search"/>
    </div>

    <recipe-list :list="recipeList" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Recipe",
  components: {
    recipeList: () => import("../components/recipe/recipe-list")
  },
  data() {
    return {
      search: ""
    };
  },
  created() {
    this.getRecipe();
  },
  computed: {
    ...mapGetters(["recipe"]),
    recipeList() {
      let recipe = this.recipe || [];
      const search = this.search.toLowerCase().trim();

      if (this.count && recipe.length > this.count) {
        recipe = recipe.splice(0, this.count);
      }
      if (recipe.length > 1 && search.length > 3) {
        recipe = recipe.filter(el => (el.title || "").toLowerCase().includes(search));
      }

      return recipe;
    }
  },
  methods: {
    getRecipe() {
      this.$store.dispatch("getRecipe");
    }
  }
};
</script>

<style lang="scss" scoped></style>

<docs>
#### Страница списка новостей

</docs>
