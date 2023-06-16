<template>
  <vs-card id="loading" class="cardx">
    <h1>Активность</h1>
    <p class="mb25">Активность берется за последние 7 дней</p>
    <div v-if="userSteps">
      <apexchart
        type="area"
        height="50"
        :options="chartOptions"
        :series="userSteps"
      ></apexchart>
      <div class="mb25"></div>
      <vs-table :data="userActivity">
        <template slot="thead">
          <vs-th>
            Дата
          </vs-th>
          <vs-th>
            Шагов
          </vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td class="td-num" :data="data[indextr].date">
              {{data[indextr].date}}
            </vs-td>
            <vs-td class="td-num" :data="data[indextr].intVal">
              {{data[indextr].intVal}}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>

    <vs-progress v-else indeterminate color="primary">primary</vs-progress>
  </vs-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      series: [
        {
          name: "Шаги",
          data: null
        }
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: 'area',
          sparkline: {
            enabled: true
          },
          zoom: {
            enabled: false
          }
        },
        tooltip: {
          fixed: {
            enabled: true
          },
          x: {
            show: false
          },
          marker: {
            show: false
          }
        }
      },

    }
  },
  computed: {
    ...mapGetters(["userSteps", "userActivity"]),
  }
};
</script>

<style lang="scss">
th, td {
  font-size: 1rem !important;
}
</style>
