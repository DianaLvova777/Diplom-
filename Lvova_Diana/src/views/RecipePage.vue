<template>
  <div>
    <vs-row vs-align="flex-start">
      <vs-col
        vs-lg="8"
        vs-sm="12"
        vs-xs="12"
      >
        <recipe-view v-if="article" :article="article" />
      </vs-col>
      <vs-col
        vs-lg="4"
        vs-sm="12"
        vs-xs="12"
      >
        <vs-card class="cardx">
          <h1>Последние рецепты</h1>

          <recipe-list :list="recipe" :count="3" :sizeW="{
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
  name: "RecipePage",
  components: {
    recipeView: () => import("../components/recipe/recipe-view"),
    recipeList: () => import("../components/recipe/recipe-list")
  },
  created() {
    this.getRecipe();
  },
  computed: {
    ...mapGetters(["recipe"]),
    article() {
      let recipe = this.recipe;

      if (recipe) {
        recipe = recipe.filter(el => this.$route.params.id === el.id)[0]
      }

      return recipe
    }
  },
  methods: {
    ...mapActions(["getRecipe"])
  }
};
</script>

<style lang="scss" scoped>
.cardx {
  box-shadow: none !important;
  background-color: #222425;
}
</style>
