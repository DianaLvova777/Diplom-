<template>
  <div class="home">
    <vs-row class="mb25" vs-justify="center" vs-w="12">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6" vs-sm="12">
        <img class="banner w-100" src="../assets/images/896h574.jpg" alt="banner" />
      </vs-col>
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6" vs-sm="12">
        <userCcal />
      </vs-col>
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6" vs-sm="12">
        <userActivity />
      </vs-col>
    </vs-row>

    <training-list />
  </div>
</template>

<script>
import userActivity from "../components/UserActivity";
import userCcal from "../components/UserCcal";
import trainingList from "../components/training/training-list";

export default {
  name: "Home",
  components: {
    userActivity,
    userCcal,
    trainingList,
  }
};
</script>

<docs>
#### Главная страница приложения
</docs>
