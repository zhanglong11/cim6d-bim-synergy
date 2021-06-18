<!--
* @任务编号:2662||首页跳转功能
* @开发人员:张龙
* @日期:2020-03-19
* @任务类型: 修改代码
-->

<template>
  <div class="aside-right m-h clearfix">
    <BlockTabs :list="tabs" :activeKey="activeKey" @change="changeTab" v-if="!detailsFlag"> </BlockTabs>
    <Problem v-if="activeKey === 1" @goDetails="detailsFlag = true" @goBack="detailsFlag = false" />
    <Check v-if="activeKey === 2" @goDetails="detailsFlag = true" @goBack="detailsFlag = false" />
  </div>
</template>

<script>
import Check from './components/Check'
import Problem from './components/Problem'
export default {
  components: {
    Problem,
    Check
  },
  name: 'safety',
  data() {
    return {
      detailsFlag: false,
      activeKey: 1,
      tabs: [
        {
          title: '安全问题',
          value: 1,
          desc: 'safety Problem'
        },
        /*{
          title: '安全文明问题',
          desc: 'safety Check',
          value: 2
        }*/
      ],
      list: new Array(10).fill({
        a: '容易坠落',
        b: '重大',
        c: '柱',
        d: '未整改'
      }),
      treeData: [
        {
          label: 'XXX楼',
          children: [
            {
              label: '9.22一下结构',
              children: [
                {
                  label: '二层钢梁顶'
                },
                {
                  label: '首层夹层4.720'
                },
                {
                  label: '基础项'
                }
              ]
            },
            {
              label: '9.22一下结构',
              children: [
                {
                  label: '二层钢梁顶'
                },
                {
                  label: '首层夹层4.720'
                },
                {
                  label: '基础项'
                }
              ]
            },
            {
              label: '9.22一下结构',
              children: [
                {
                  label: '二层钢梁顶'
                },
                {
                  label: '首层夹层4.720'
                },
                {
                  label: '基础项'
                }
              ]
            }
          ]
        }
      ],
      chartOptions: {
        title: {
          text: '危险源风险',
          x: '16%',
          y: 'center',
          textStyle: {
            fontSize: 16,
            fontWeight: 'normal',
            color: '#b3dafe'
          }
        },
        grid: {
          left: 0,
          top: 0
        },
        label: {
          formatter: '{d}%'
        },
        series: [
          {
            width: 220,
            name: '风险',
            type: 'pie',
            radius: ['45%', '60%'],
            color: ['#d24e6b', '#db982c', '#e0cf3a', '#3f8fe2'],
            data: [
              { name: '重大风险', value: 11 },
              { name: '较大风险', value: 15 },
              { name: '一般风险', value: 16 },
              { name: '低风险', value: 26 }
            ]
          }
        ],
        legend: {
          itemGap: 16,
          show: true,
          top: 'middle',
          right: 10,
          icon: 'circle',
          formatter: function(name) {
            return [`{a|${name}}`, `{b|12}`, `{a|已整改}`, `{b|12}`].join(' ')
          },
          orient: 'vertical',

          textStyle: {
            rich: {
              a: {
                color: '#b3dafe'
              },
              b: {
                color: '#2268d3',
                padding: [0, 6, 0, 2]
              }
            },
            color: '#859caf',
            fontSize: 13
          }
        }
      }
    }
  },
  methods: {
    refresh() {
      if (this.$route.query.curKey === 'culture') {
        this.activeKey = 2
      }
    },
    changeTab(e) {
      this.activeKey = e
    }
  },
  created() {
    this.refresh()
  }
}
</script>

<style lang="less" scoped></style>
