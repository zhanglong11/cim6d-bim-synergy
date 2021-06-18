<template>
  <div :id="container" style="height: 260px;"></div>
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
    // 是否是空心
    isHollow: {
      type: Boolean,
      default: false
    },
    // 显示图例
    isLegend: {
      type: Boolean,
      default: true
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
        return [
          { value: 65, name: '女生' },
          { value: 180, name: '男生' }
        ]
      }
    }
  },
  data() {
    //这里存放数据
    return {}
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
    initChart() {
      let option = {
        title: {
          text: '',
          show: false
        },
        color: this.color,
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          show: this.isLegend,
          left: 'right',
          top: 'center',
          orient: 'vertical',
          textStyle: {
            color: '#fff'
          }
        },
        series: [
          {
            type: 'pie',
            radius: this.isHollow ? [50, 62] : [0, 65],
            center: ['50%', '50%'],
            roseType: this.isHollow ? 'radius' : '',
            label: {
              formatter: '{d}%'
            },
            data: this.dataList
          }
        ]
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
