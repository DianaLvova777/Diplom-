<template>
  <div class="training" v-if="trainingView">
    <h1 class="training__title mb25">{{ trainingView.name }}</h1>
    <p class="text training__text">{{ trainingView.text }}</p>

    <vs-row>
      <vs-col vs-lg="3" vs-sm="12">
        <vs-row vs-justify="flex-end" class="mb25">
          <p>Прогресс: {{ trainingView.progress }} %</p>
          <vs-progress :height="4" :percent="trainingView.progress" color="primary"></vs-progress>
        </vs-row>
      </vs-col>
    </vs-row>

    <vs-row>
      <vs-col vs-lg="3" vs-sm="12">
        <vs-list class="training__list">
          <vs-list-header title="Упражнения"></vs-list-header>
          <vs-list-item
            v-for="(training, i) in trainingView.training"
            :title="training.name"
            :subtitle="training.description"
            :key="i"
          >
            <vs-checkbox color="success" v-model="training.isActive" />
          </vs-list-item>
        </vs-list>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TrainingPage",
  created() {
    this.getTraining()
      .then(() => {
        this.refreshTraining();
      });
  },
  computed: {
    ...mapGetters(["training"]),
    trainingView() {
      let training = this.training ? this.training[this.$route.params.id] : null;
      if (!training) return;
      let progress = 0;
      let count = 0;
      const steps = training.training.length;

      training.training.forEach(el => {
        if (el.isActive) {
          count += 1;
        }
      });
      progress = (100 / steps) * count;
      training.progress = progress;
      this.setCookieTraining({
        progress: training.progress,
        training: training.training
      });

      return training;
    }
  },
  methods: {
    ...mapActions(["getTraining", "refreshTraining"]),
    setCookieTraining(data) {
      if (data.progress === 0) return;

      document.cookie = `${this.$route.params.id}=${JSON.stringify(data)}; path=/; expires=${new Date(new Date().getTime() + 1000 * 60 * 60 * 24)}`;
      const than = this;
      setTimeout(() => than.refreshTraining(), 500);
    }
  }
};
</script>

<style lang="scss">
.training {
  &__list {
    max-width: 450px;
  }
}
.vs-checkbox--icon {
  font-size: 17px !important;
}
</style>