<template>
  <div class="training">
    <training-list />
  </div>
</template>

<script>
export default {
  name: "Training",
  components: {
    trainingList: () => import("../components/training/training-list")
  }
};
</script>

<style lang="scss" scoped>

</style>