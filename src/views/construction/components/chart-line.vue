<template>
  <div :id="container" :style="`height: ${height}px;`"></div>
</template>

<script>
/*
   任务名称：task#2885 【智慧施工2.0-前端】绿色施工模块切图及功能开发
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
      default: 'echartLine'
    },
    // 默认高度
    height: {
      type: Number,
      default: 340
    },
    // 配置
    options: {
      type: Object,
      default: () => {
        return {}
      }
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
  watch: {
    options: {
      deep: true,
      handler: function() {
        this.initChart()
      }
    }
  },
  //方法集合
  methods: {
    initChart() {
      let option = {
        title: {
          text: '',
          show: false
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          show: false
        },
        color: ['#529ace', '#7a7a3e'],
        grid: {
          left: '15',
          right: '0',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            //boundaryGap: false,
            data: ['02:00', '04:00', '06:00', '10:00', '12:00', '14:00', '16:00'],
            axisLabel: {
              color: 'rgba(255,255,255,0.5)'
            }
          }
        ],
        yAxis: [
          {
            name: '摄氏度',
            nameTextStyle: {
              color: 'rgba(255,255,255,0.5)',
              fontSize: 14
            },
            type: 'value',
            axisLabel: {
              color: 'rgba(151,197,255,0.7)',
              fontSize: 14
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(255,255,255,0.3)'
              }
            }
          }
        ],
        series: [
          {
            name: '摄氏度',
            type: 'line',
            areaStyle: {
              color: 'rgba(74,164,228, 0.2)'
            },
            data: [18, 10, 22, 6, 14, 5, 18]
          },
          {
            name: '湿度',
            type: 'line',
            areaStyle: {
              color: 'rgba(235,203,28, 0.2)'
            },
            data: [9, 20, 12, 16, 3, 13, 4]
          }
        ]
      }
      let opts = Object.assign({}, option, this.options)
      this.$nextTick(() => {
        const myChart = Echarts.init(document.getElementById(this.container))
        myChart.setOption(opts)
      })
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
