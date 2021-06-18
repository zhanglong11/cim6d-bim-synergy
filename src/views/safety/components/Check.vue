<!--
 * @Description: 安全检查
 * @Version:
 * @Autor:
 * @Date: 2020-03-03 09:31:41
 * @LastEditTime: 2020-04-17 10:32:42
 -->

<!--
* @任务编号:2620||安全接口对接，接口需要重新编写，后端正在开发
* @开发人员:张龙
* @日期:2020-03-17
* @任务类型: 修改代码
-->

<!--
* @任务编号:2620||安全文明图表接口对接，安全文明列表接口更换
* @开发人员:张龙
* @日期:2020-03-19
* @任务类型: 修改代码
-->

<!--
* @任务编号: 2620 || 安全逻辑处理
* @开发人员:张龙
* @日期:2020-03-25
* @任务类型: 新代码
-->
<template>
  <div>
    <div v-if="!detailsFlag">
      <Echarts ref="safety" :height="200" id-select="safety" :option="chartOptions" />
      <vxe-grid :data="tableData" :columns="columns" @cell-click="cellClick"></vxe-grid>
    </div>
<!--    <CheckDetails v-if="detailsFlag" :id="curId" @goBack="goBack" />-->
  </div>
</template>

<script>
import CheckDetails from './CheckDetails'
import api from '@/api/safe'
export default {
  components: {
    CheckDetails
  },
  data() {
    return {
      detailsFlag: false,
      checkData: [],
      curId: null,
      // 紧急程度
      urgencyList: [
        {
          label: '重大',
          value: 4,
          color: '#d24e6b'
        },
        {
          label: '严重',
          value: 3,
          color: '#db982c'
        },
        {
          label: '较大',
          value: 2,
          color: '#e0cf3a'
        },
        {
          label: '一般',
          value: 1,
          color: '#3f8fe2'
        }
      ],
      tableData: [],
      //安全检查状态
      safeCheckResult: [
        {
          label: '未解决',
          value: 0
        },
        {
          label: '已解决',
          value: 1
        }
      ],
      columns: [
        {
          field: 'issueDescription',
          title: '安全检查问题'
        },
        {
          field: 'urgency',
          title: '紧急程度',
          slots: {
            default: ({ row }) => {
              let ary = this.urgencyList.filter(i => i.value === row.emergencyLevel)
              let urgency = ary.length ? ary[0].label : '-'
              let color = ary.length ? ary[0].color : ''
              return ary.length
                ? [
                  <div class="point-wrap">
                      <span style={`color:${color}`} class="point">
                        •
                      </span>
                    <span>{urgency}</span>
                  </div>
                ]
                : [<span>{urgency}</span>]
            }
          }
        },
        {
          field: 'inspectArea',
          title: '检查部位'
        },
        {
          field: 'checkResult',
          title: '整改状态',
          slots: {
            default: ({ row }) => {
              let ary = this.safeCheckResult.filter(i => i.value === row.dealStatus)
              let status = ary.length ? ary[0].label : '-'
              return row.checkResult === 0 ? [<span style="color:red">{status}</span>] : [<span>{status}</span>]
            }
          }
        }
      ],
      chartOptions: {
        title: {
          text: '安全文明',
          x: '19%',
          y: 'center',
          textStyle: {
            fontSize: 14,
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
            radius: ['30%', '40%'],
            color: ['#d24e6b', '#db982c', '#e0cf3a', '#3f8fe2'],
            data: [
              { name: '重大隐患', value: 0 },
              { name: '严重隐患', value: 0 },
              { name: '较大隐患', value: 0 },
              { name: '一般隐患', value: 0 }
            ]
          }
        ],
        legend: {
          itemGap: 16,
          show: true,
          top: 'middle',
          right: 10,
          icon: 'circle',
          formatter: name => {
            let curItem = this.checkData.filter(r => r.name === name)
            let count = curItem.length ? curItem[0].value : 0
            let solveCount = curItem.length ? curItem[0].count : 0
            return [`{a|${name}}`, `{b|${count}}`, `{a|已整改}`, `{b|${solveCount}}`].join(' ')
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
  created() {
    this.refresh()
  },
  methods: {
    refresh() {
      this.getChartData()
      this.getListData()
    },
    async getChartData() {
      let res = await api.checkCount({ planTypes: [3] })
      let data = res.data
      this.checkData = [
        { name: '一般隐患', value: data.general, count: data.generalTODO },
        { name: '重大隐患', value: data.great, count: data.greatTODO },
        { name: '较大隐患', value: data.larger, count: data.largerTODO },
        { name: '严重隐患', value: data.severity, count: data.severityTODO }
      ]
      this.chartOptions.series[0].data = this.checkData
    },
    async getListData() {
      // let res = await api.cultureList({})
      const res = await api.listPage({
        ...this.pageQuery,
        ...{
          planType: 2
        }
      })
      this.tableData = res.data.records
    },
    goBack() {
      this.detailsFlag = false
      this.$emit('goBack')
    },
    goDetails() {
      this.detailsFlag = true
      this.$emit('goDetails')
    },
    fitViewByGUID(guidArray) {
      let bimfishApp = this.$store.state.bim.bimfishApp
      // 添加标注
      const icon = '/img/safeExamine.png'
      bimfishApp.addDrawableIconMarkerByGUID(guidArray, icon, ({ screenPoint, guid }) => {
        console.log('screenPoint:', screenPoint, guid)
      })
      // 定位
      bimfishApp.fitViewByGUID(guidArray)
    },
    async cellClick({ row }) {
      const res = await api.getCultureGuid(row.id)
      if (res.data.componentIdList.length) {
        this.fitViewByGUID(res.data.componentIdList)
      }
      this.curId = row.id
      // 展示详情
      // this.goDetails()
    }
  }
}
</script>

<style lang="less" scoped>
.point-wrap {
  display: flex;
  justify-content: center;
  .point {
    font-size: 30px;
    margin-right: 4px;
    margin-top: -2px;
  }
}
</style>
