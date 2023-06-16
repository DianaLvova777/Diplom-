<template>
  <vs-card class="cardx">
    <h1 class="mb25">Калории</h1>
    <div id="donut">
      <apexchart
        type="donut"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
    <div class="foods" style="margin: 5px">
      <vs-input
        class="foods__search"
        style="width: 100%"
        label="Потребление за день"
        v-model="search"
      />
      <ul class="foods__list" v-show="focus">
        <li
          class="foods__list--item"
          v-for="food in search_food"
          :key="food.id"
          @click="setSearch(food)"
        >{{ food.name }}</li>
      </ul>
    </div>
    <vs-row>
      <vs-col vs-w="3.65" style="margin: 5px">
        <vs-input style="width: 100%" label="Белки" v-model="proteins"/>
      </vs-col>
      <vs-col vs-w="3.65" style="margin: 5px">
        <vs-input style="width: 100%" label="Жиры" v-model="fat"/>
      </vs-col>
      <vs-col vs-w="3.65" style="margin: 5px">
        <vs-input style="width: 100%" label="Углеводы" v-model="carbohydrates"/>
      </vs-col>
      <vs-col vs-w="3.65" style="margin: 5px">
        <vs-input style="width: 100%" label="Вес" class="mb15" v-model="weight"/>
      </vs-col>
    </vs-row>
    <vs-button
      type="gradient"
      color="#d083f7"
      size="small"
      @click="setCcal"
    >
      Сохранить
    </vs-button>
  </vs-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "userCcal",
  data() {
    return {
      focus: false,
      search: "",
      selected: "",
      fat: 0,
      proteins: 0,
      carbohydrates: 0,
      weight: 0,
      series: [1, 1, 1],
      chartOptions: {
        stroke: {
          width: 1,
          colors: ['#2f3233']
        },
        colors:['#F44336', '#E91E63', '#9C27B0'],
        fill: {
          colors: ['#F44336', '#E91E63', '#9C27B0']
        },
        labels: ["Белки", "Жиры", "Углеводы"],
        chart: {
          type: 'bar',
        },
        tooltip: {
            theme: 'dark'
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: '100%'
            },
            legend: {
              position: 'top'
            }
          }
        }]
      }
    };
  },
  created() {
    this.getFoods();
  },
  computed: {
    ...mapGetters(["foods"]),
    search_food() {
      const search = this.search.toLowerCase();
      let foods = this.foods;
      if (search.length >= 3) {
        foods = foods.filter(el => {
          return (el.name || "").toLowerCase().includes(search);
        });
        console.log(search, foods);
        this.setFocus(true);
      }
      if (search.length <= 3) {
        this.setFocus(false);
      }

      return foods;
    }
  },
  methods: {
    ...mapActions(["getFoods"]),
    setFocus(bool) {
      this.focus = bool;
    },
    resetFields() {
      this.search = "";
      this.selected = "";
      this.fat = 0;
      this.proteins = 0;
      this.carbohydrates = 0;
      this.weight = 0;
    },
    setSearch(s) {
      this.search = s.name;
      this.selected = s.name;
      this.fat = s.fat;
      this.proteins = s.proteins;
      this.carbohydrates = s.carbohydrates;
      this.weight = s.weight;
      this.setFocus(false);
    },
    setCcal() {
      this.series = [
        this.series[0] + this.proteins,
        this.series[1] + this.fat,
        this.series[2] + this.carbohydrates
      ];

      this.resetFields();
      console.log({
        carbohydrates: this.carbohydrates,
        fat: this.fat,
        name: this.selected,
        proteins: this.proteins,
        weight: this.weight
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#donut {
  width: 100%;
  margin-bottom: 40px;
}
.foods {
  position: relative;
  z-index: 1;
  &__list {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 300px;
    overflow: auto;
    background: #2f3233;
    box-shadow: 0 4px 25px 0 rgb(0 0 0 / 10%);
    border-radius: 8px;
    &--item {
      padding: 5px 10px;
    }
    &--item:hover {
      background: rgba(0, 0, 0, .2);
      cursor: pointer;
    }
  }
}
</style>
