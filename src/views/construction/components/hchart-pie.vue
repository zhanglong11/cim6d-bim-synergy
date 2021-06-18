<template>
  <div :id="container" style="height: 260px;"></div>
</template>

<script>
/*
   任务名称：task#2889 【智慧施工2.0-前端】质量与安全模块切图及功能开发
   开发人员：耿为刚
   日期：2020-04-14
   任务类型：全新代码
 */
import Highcharts from 'highcharts'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    // 图表容器
    container: {
      type: String,
      default: 'hchartBar'
    }
  },
  data() {
    //这里存放数据
    return {}
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initChart()
  },
  //方法集合
  methods: {
    initChart() {
      let option = {
        chart: {
          spacing: [40, 0, 40, 0],
          backgroundColor: 'none'
        },
        title: {
          floating: true,
          text: '圆心显示的标题'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              style: {
                color: '#fff'
              }
            }
          }
        },
        series: [
          {
            type: 'pie',
            innerSize: '80%',
            name: '市场份额',
            data: [{ name: 'Firefox', y: 45.0 }, ['IE', 26.8], ['Safari', 8.5], ['Opera', 6.2], ['其他', 0.7]]
          }
        ]
      }
      this.$nextTick(() => {
        const myChart = Highcharts.chart(this.container, option)
      })
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
