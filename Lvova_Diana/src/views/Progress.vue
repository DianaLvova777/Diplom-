<template>
  <div class="progress">
    <h2>Настройки параметров тела</h2>

    <vs-input
      class="foods__search"
      style="width: 100%;margin-bottom: 10px"
      label="Рост"
      v-model="usheight"
    />
    <vs-input
      class="foods__search"
      style="width: 100%;margin-bottom: 10px"
      label="Вес"
      v-model="usweight"
    />
    <vs-input
      class="foods__search"
      style="width: 100%;margin-bottom: 10px"
      label="Цель"
      v-model="ustarget"
    />
    <vs-input
      class="foods__search"
      style="width: 100%;margin-bottom: 10px"
      label="Заболевания"
      v-model="usdiseases"
    />
    <vs-button 
      class="recipe-filters__close"
      color="dark"
      type="flat"
      size="small"
      @click="saveOptions()"
    >Сохранить</vs-button>
  </div>
</template>

<script>
export default {
  name: 'ProgressPage',
  data: () => ({
    usheight: '',
    usweight: '',
    ustarget: '',
    usdiseases: '',
  }),
  methods: {
    saveOptions() {
      localStorage.setItem('usOpt', JSON.stringify({
        usheight: this.usheight,
        usweight: this.usweight,
        ustarget: this.ustarget,
        usdiseases: this.usdiseases,
      }))
    },
    getUsOpt() {
      const result = JSON.parse(localStorage.getItem('usOpt') || '{}');
      this.usheight = result?.usheight || '';
      this.usweight = result?.usweight || '';
      this.ustarget = result?.ustarget || '';
      this.usdiseases = result?.usdiseases || '';
    },
  },
  mounted() {
    this.getUsOpt();
  },
}
</script>

<style lang="scss" scoped>

</style>