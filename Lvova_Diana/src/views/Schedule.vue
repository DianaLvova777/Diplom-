<template>
  <div class="schedule">
    <img
      src="../assets/images/q.png"
      style="width: 100%"
      alt=""
    />
  </div>
</template>

<script>
export default {
  name: 'SchedulePage',
  data: () => ({
    schedule: [
      { id: 0, name: '',  }
    ],
    dates: [],
  }),
  created() {
    const moment = require('moment');
    let startDate = moment().startOf('week'); 
    let endDate = moment().endOf('week'); 

    this.dates = [];

    for (let day = startDate; day <= endDate; day = day.clone().add(1, 'd')) {
      this.dates.push(day.format('DD.MM'));
    }

  },
}
</script>

<style lang="scss" scoped></style>
