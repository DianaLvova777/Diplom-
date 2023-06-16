<template>
  <vs-row>
    <p class="m15" v-if="!list || list.length <= 0">Ничего не найдено.</p>
    <transition-group name="list" tag="vs-row">
      <vs-col
        v-for="(article, index) in list"
        :key="index"
        type="flex"
        vs-justify="center"
        vs-align="center"
        :vs-lg="sizeW.lg"
        :vs-sm="sizeW.sm"
        :vs-xs="sizeW.xs"
      >
        <vs-card class="cardx recipe-card" fixedHeight>
          <div slot="media" class="recipe-card__media">
            <img :src="article.previewImage">
          </div>
          <div>
            <router-link :to="`/recipe-page/${article.id}`">
              <h2 class="recipe-card__title">{{ article.title }}</h2>
            </router-link>
            <p class="mb55 recipe-card__text">
              {{ article.text.substr(0, 64) }}...
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
              <vs-button
                color="dark"
                type="flat"
                icon="share"
                size="small"
                @click="share()"
              >{{ article.shares }}</vs-button>
              <vs-button
                v-if="user.adm === 'admin'"
                color="dark"
                type="flat"
                icon="delete"
                size="small"
                @click="deleteRecipe(article.id)"
              >-</vs-button>
            </vs-row>
          </div>
        </vs-card>
      </vs-col>
    </transition-group>
  </vs-row>
</template>

<script>
import { mapGetters } from 'vuex'
/**
 * Компонент просмотра списка Рецептов
 * @displayName RecipeList.vue
 */
export default {
  name: "RecipeList",
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
    recipeList() {
      let list = this.list || [];

      if (this.count && list.length > this.count) {
        list = list.splice(0, this.count);
      }

      return list;
    }
  },
  methods: {
    /**
     * Метод установки лайка на Рецепт
     * 
     * @param {string} id - Айди Рецепты
     * @public
     */
    like(id) {
      /**
       * Цикл проходится по элементам массива Рецептов
       * Если будет найден элемент с айди на которой необходимо прибавить кол-во лайков,
       * то оно увеличивается на единицу, в ином случае возвращается false
       */
      this.recipe.forEach(el => (el.id === id ? el.likes++ : false));
    },
    /**
     * Метод "поделиться"
     * 
     * @param {string} id - Айди Рецепты
     * @public
     */
    share(id) {
      /**
       * Цикл проходится по элементам массива Рецептов
       * Если будет найден элемент с айди на которой необходимо прибавить кол-во поделившихся,
       * то оно увеличивается на единицу, в ином случае возвращается false
       */
      this.recipe.forEach(el => el.id === id ? el.shares++ : false);
      this.$store.dispatch("setRecipe", "su")
    },
    /**
     * Удаление Рецепты
     * Данный метод отправляет назад айди Рецепты
     * которую необходимо удалить
     * @public
     */
    deleteRecipe(id) {
      this.$emit("delete", id);
    }
  }
};
</script>

<style lang="scss" scoped>
.con-vs-card {
  overflow: hidden;
}
.recipe-card {
  &__title {
    font-size: 1.5rem;
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
