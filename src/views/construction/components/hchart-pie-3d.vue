<template>
  <div class="chart-pie-3d" :class="{ 'hide-animation': !showAnimation }" style="height: 260px;">
    <div :id="container" style="height: 100%;"></div>
  </div>
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
    },
    // 配色
    color: {
      type: Array,
      default: () => {
        return ['#22f1cd', '#2ebeff']
      }
    },
    // 默认数据
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    //这里存放数据
    return {
      showAnimation: true
    }
  },
  watch: {
    dataList() {
      this.initChart()
    }
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initChart()
  },
  //方法集合
  methods: {
    // 初始化图表
    initChart() {
      let showAnimation = false
      this.dataList.map(item => {
        if (item.y) {
          showAnimation = true
        }
      })
      this.showAnimation = showAnimation
      let option = {
        chart: {
          type: 'pie',
          options3d: {
            enabled: true,
            alpha: 50,
            beta: 0
          },
          backgroundColor: 'none'
        },
        title: {
          text: ''
        },
        colors: this.color,
        tooltip: {
          pointFormat: '占比：<b>{point.percentage:.1f}%</b>'
        },
        legend: {
          align: 'right',
          labelFormatter: function() {
            return `<span style="color:#fff; font-weight: normal;">${this.name}</span>
            <span style="color:${this.color};">${this.y}</span>`
          },
          layout: 'vertical',
          verticalAlign: 'middle',
          itemMarginTop: 15,
          itemStyle: {
            fontSize: '12px'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: false,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
              enabled: false,
              format: '{point.percentage:.1f}%',
              style: {
                color: '#fff'
              }
            },
            showInLegend: true
          }
        },
        series: [
          {
            type: 'pie',
            data: this.dataList
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
@import url('../../../styles/common.less');
.chart-pie-3d {
  padding: 10px;
  position: relative;
  z-index: 1;
  overflow: hidden;
  &:before {
    content: '';
    background: url('../images/labour-services/chart-line.png');
    width: 260px;
    height: 260px;
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 4.2%;
    margin-top: -130px;
    animation: scaleAnimation 4s infinite;
  }
  &.hide-animation:before {
    display: none;
  }
}
</style>
