<template>
  <div>
    <h1 class="m15">Тренировки</h1>

    <vs-row>
      <vs-col vs-w="3" vs-sm="12" v-for="part in training" :key="part.name">
        <vs-card class="cardx">
          <vs-row>
            <h2>{{ part.name }}</h2>
          </vs-row>

          <img
            :src="imageUrl(part)"
            alt=""
            style="width: 100%;margin-bottom: 10px"
          />

          <vs-button
            type="gradient"
            color="#d083f7"
            size="small"
            @click="$router.push(part.path)"
          >
            Просмотр
          </vs-button>
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "trainingList",
  created() {
    this.getTraining();
  },
  computed: {
    ...mapGetters(["training"]),
  },
  methods: {
    ...mapActions(["getTraining"]),
    imageUrl(part) {
      console.log('part.img: ', part.img);
      return require(`../../assets/images/${part.img}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.cardx {
  transition: all .3s;
}
.cardx:hover {
  box-shadow: 0 4px 5px 3px rgb(0 0 0 / 5%);
  transform: scale(0.99);
}
</style>