<template>
  <div id="chart" ref="chart" style="width: 100%;height: 150px;"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'Echart',
  props: {
    id: {
      type: String
    },
    option: {}
  },
  data() {
    return {}
  },
  watch: {
    option: {
      handler() {
        this.init()
      },
      deep: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let myChart = echarts.init(document.getElementById('chart'))
      myChart.setOption(this.option, true)
    }
  }
}
</script>

<style scoped></style>
