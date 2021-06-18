<template>
  <highcharts :id="id" :option="option"></highcharts>
</template>

<script>
import HighChart from 'highcharts'
export default {
  name: 'HighCharts',
  props: {
    id: { type: String },
    option: {
      type: Object
    }
  },
  mounted() {
    this.chart = HighChart.chart(this.id, this.option)
  }
}
</script>

<style scoped></style>
