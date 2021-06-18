<template>
  <div :id="container" style="height: 360px;"></div>
</template>

<script>
/*
   任务名称：task#2888 【智慧施工2.0-前端】劳务管理模块切图及功能开发
   开发人员：耿为刚
   日期：2020-04-11
   任务类型：全新代码
 */
import Echarts from 'echarts'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    // 图表容器
    container: {
      type: String,
      default: 'echartBar'
    },
    // 配置
    options: {
      type: Object,
      default: () => {
        return {}
      }
    },
    //y轴标题
    yName: {
      type: String,
      default: '万'
    }
  },
  data() {
    //这里存放数据
    return {}
  },
  watch: {
    options: {
      handler: function() {
        this.initChart()
      },
      deep: true
    }
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  created() {
    this.initChart()
  },
  //方法集合
  methods: {
    initChart() {
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        color: this.options.color,
        legend: {
          data: this.options.legend,
          top: 10,
          right: 0,
          itemWidth: 15,
          itemHeight: 5,
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.options.xAxis,
            axisLabel: {
              color: 'rgba(151,197,255,0.7)',
              fontSize: 12,
              formatter: function(val) {
                let newVal = val
                if (val.length > 5) {
                  newVal = val.substring(0, 4) + '...'
                }
                return newVal
              }
            }
          }
        ],
        yAxis: [
          {
            name: this.yName,
            nameTextStyle: {
              color: '#a5d1ff',
              fontSize: 14
            },
            type: 'value',
            axisLabel: {
              color: 'rgba(151,197,255,0.7)',
              fontSize: 14
            },
            splitLine: {
              lineStyle: {
                color: '#113057'
              }
            }
          }
        ],
        series: this.options.series
      }
      this.$nextTick(() => {
        const myChart = Echarts.init(document.getElementById(this.container))
        myChart.setOption(option)
      })
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
