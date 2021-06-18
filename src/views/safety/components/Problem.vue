<!--
 * @Description: 安全问题
 * @Version:
 * @Autor:
 * @Date: 2020-03-03 09:31:41
 * @LastEditTime: 2020-04-17 10:33:30
 -->

<!--
* @任务编号:2620||安全接口对接，接口需要重新编写，后端正在开发
* @开发人员:张龙
* @日期:2020-03-17
* @任务类型: 修改代码
-->

<!--
* @任务编号:2620||安全图表接口对接，安全列表接口更换
* @开发人员:张龙
* @日期:2020-03-19
* @任务类型: 修改代码
-->
<!--
* @任务编号: 2620 || 安全详情接口对接
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
    <!--    <ProblemDetails v-show="detailsFlag" :id="curId" @goBack="goBack" />-->

    <el-dialog title="详情" :visible.sync="visible" append-to-body>
      <div>
        <div style="overflow: auto;">
          <div class="timeline">
            <div class="item">
              <div>
                <p>检查{{ ['未检查', '合格', '不合格'][dataDetail.inspectStatus] }}</p>
                <p>检查人:{{ dataDetail.inspectPrincipalName }}</p>
                <p>
                  {{ dataDetail.actualInspectTime ? moment(dataDetail.actualInspectTime).format('YYYY-MM-DD') : '' }}
                </p>
              </div>
            </div>
            <div v-for="item in timelineList" :key="item.type + item.rectifyReviewId" class="item">
              <div v-if="item.type === 'rectify'">
                <p>{{ item.statusText }}</p>
                <p>整改人:{{ item.rectifyPrincipalName }}</p>
                <p>{{ item.rectifyTime ? moment(item.rectifyTime).format('YYYY-MM-DD') : '' }}</p>
              </div>
              <div v-else>
                <p>{{ item.statusText }}</p>
                <p>复查人:{{ item.reviewPrincipalName }}</p>
                <p>{{ item.reviewTime ? moment(item.reviewTime).format('YYYY-MM-DD') : '' }}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <vxe-table :data="dataDetail.inspectTaskResultList" class="case-list">
            <vxe-table-column field="inspectPosition" title="检查部位" show-overflow>
              <template v-slot="{ row }">
                <span v-if="row.inspectPosition" :title="row.inspectPosition">{{ row.inspectPosition }}</span>
                <span v-else>-</span>
              </template>
            </vxe-table-column>
            <vxe-table-column field="issueDescription" title="问题描述" show-overflow>
              <template v-slot="{ row }">
                <span v-if="row.issueDescription" :title="row.issueDescription">{{ row.issueDescription }}</span>
                <span v-else>-</span>
              </template>
            </vxe-table-column>
            <vxe-table-column title="问题等级">
              <template v-slot="{ row }">
                <span>{{ $getLabel(issueLevelList, row.issueLevel) }}</span>
              </template>
            </vxe-table-column>
            <vxe-table-column title="紧急程度">
              <template v-slot="{ row }">
                <span>{{ $getLabel(emergencyLevelList, row.emergencyLevel) }}</span>
              </template>
            </vxe-table-column>
            <vxe-table-column field="badLocation" title="不合格位置" show-overflow>
              <template v-slot="{ row }">
                <span v-if="row.badLocation" :title="row.badLocation">{{ row.badLocation }}</span>
                <span v-else>-</span>
              </template>
            </vxe-table-column>
            <vxe-table-column title="现场照片">
              <template v-slot="{ row }">
                <AttachmentDialog img-width="50px" :ids="row.taskFileId" type="previewImage" />
              </template>
            </vxe-table-column>
            <vxe-table-column field="taskRemark" title="备注" show-overflow>
              <template v-slot="{ row }">
                <span v-if="row.taskRemark" :title="row.taskRemark">{{ row.taskRemark }}</span>
                <span v-else>-</span>
              </template>
            </vxe-table-column>
          </vxe-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ProblemDetails from './ProblemDetails'
import api from '@/api/safe'
import moment from 'moment'
export default {
  components: {
    ProblemDetails
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
      issueLevelList: [
        {
          label: '一级',
          value: 1
        },
        {
          label: '二级',
          value: 2
        },
        {
          label: '三级',
          value: 3
        },
        {
          label: '四级',
          value: 4
        }
      ],
      emergencyLevelList: [
        {
          label: '一般隐患',
          value: 1
        },
        {
          label: '较大隐患',
          value: 2
        },
        {
          label: '严重隐患',
          value: 3
        },
        {
          label: '重大隐患',
          value: 4
        }
      ],
      columns: [
        {
          field: 'issueDescription',
          title: '安全检查问题',
          showOverflow: true,
          showHeaderOverflow: true
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
          title: '检查部位',
          showOverflow: true
        },
        {
          field: 'checkResult',
          title: '整改状态',
          slots: {
            default: ({ row }) => {
              let ary = this.safeCheckResult.filter(i => i.value === row.dealStatus)
              let status = ary.length ? ary[0].label : '-'
              return row.dealStatus === 0 ? [<span style="color:red">{status}</span>] : [<span>{status}</span>]
            }
          }
        }
      ],
      chartOptions: {
        title: {
          text: '安全问题',
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
            return [`{a|${name}}`, `{b|${count}}`, `{a|未解决}`, `{b|${solveCount}}`].join(' ')
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
      },
      resultData: [],
      visible: false,
      dataDetail: {},
      timelineList: [],
      rectifyStatusList: [
        {
          label: '未检查',
          value: 0
        },
        {
          label: '无问题',
          value: 1
        },
        {
          label: '待整改',
          value: 2
        },
        {
          label: '整改中',
          value: 3
        },
        {
          label: '未复查',
          value: 4
        },
        {
          label: '复查合格',
          value: 5
        },
        {
          label: '复查不合格',
          value: 6
        }
      ],
      moment
    }
  },
  created() {},
  mounted() {
    this.refresh()
  },
  methods: {
    refresh() {
      this.getChartData()
      this.getListData()
    },
    async getChartData() {
      let res = await api.checkCount({ planTypes: [2, 3] })
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
      // let res = await api.checkList({})
      const res = await api.listPage({
        page: 1,
        rows: 50,
        ...{
          planTypes: [2, 3]
        }
      })
      this.tableData = res.data.records

      this.getGuids(res.data.records)
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
      const icon = '/img/safecCheck.png'
      bimfishApp.addDrawableIconMarkerByGUID(guidArray, icon, ({ screenPoint, guid }) => {
        // console.log('screenPoint:', screenPoint, guid)
        let targetIds = []
        for (let i = 0; i < this.resultData.length; i++) {
          let componentIds = this.resultData[i].componentId
          for (let j = 0; j < componentIds.length; j++) {
            if (guid === componentIds[j]) {
              targetIds.push(this.resultData[i].targetId)
            }
          }
        }
        targetIds = _.uniq(targetIds)
        let targetId = targetIds[0]

        let vxe_table_body = document.getElementsByClassName('vxe-table--body')
        if (vxe_table_body.length) {
          let tbody = vxe_table_body[0].children[1]
          for (let i = 0; i < this.tableData.length; i++) {
            if (targetId === this.tableData[i].id) {
              tbody.children[i].classList.add('active')
              tbody.children[i].scrollIntoView({ block: 'start', behavior: 'smooth' })
            } else {
              tbody.children[i].classList.remove('active')
            }
          }
        }
      })
      // 定位
      bimfishApp.fitViewByGUID(guidArray)
    },
    async cellClick({ row }) {
      /*const res = await api.getCheckGuid(row.id)
      if (res.data.componentIdList.length) {
        this.fitViewByGUID(res.data.componentIdList)
      }
      // this.curId = row.id
      // 展示详情
      // this.goDetails()*/

      this.visible = true
      this.timelineList = []
      api.getQuestionDetail(row.id).then(res => {
        // console.log(res)
        for (let item of res.data.historyDtoList) {
          this.timelineList.push({
            type: 'rectify',
            statusText: this.$getLabel(this.rectifyStatusList, item.rectifyStatus),
            ..._.pick(item, ['rectifyPrincipalName', 'rectifyReviewId', 'rectifyStatus', 'rectifyTime'])
          })
          if (item.reviewTime) {
            _.last(this.timelineList).statusText = '整改完成'
            this.timelineList.push({
              type: 'review',
              statusText: '复查' + ['不合格', '合格'][item.reviewResult],
              ..._.pick(item, ['rectifyReviewId', 'reviewPrincipalName', 'reviewResult', 'reviewTime'])
            })
          }
        }
        this.dataDetail = res.data
      })
    },
    async getGuids(list) {
      let questions = list.filter(item => item.dealStatus === 0)
      let ids = _.map(questions, 'id').filter(item => item !== null)
      if (ids.length) {
        const res = await api.getGuids(ids)
        if (res.data) {
          this.resultData = res.data // 点击icon，根据构件id搜索targetId时用
          res.data.map(item => {
            item.componentId = item.componentId.split(',')
          })
          let componentIdArray = _.map(res.data, 'componentId') // 二维数组

          let newArray = _.flatMap(componentIdArray, array => [...array]) // 二维转一维
          newArray = _.uniq(newArray) // 去重

          let bimfishApp = this.$store.state.bim.bimfishApp
          bimfishApp.viewer.addEventListener('geometryLoaded', () => {
            this.fitViewByGUID(newArray)
          })
        }
      }
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
/deep/ .vxe-table--body-wrapper .vxe-table--body tr.active {
  background: #1c589a;
}
/deep/ .vxe-table--body-wrapper .vxe-table--body tr {
  cursor: default;
}
/deep/ .el-dialog {
  background: #133861;
  .el-dialog__title {
    color: #ffffff;
  }
}

.timeline {
  width: max-content;
  display: flex;
  flex-wrap: wrap;
  margin: 10 -10px;
  .item {
    width: 120px;
    height: 120px;
    background-color: #00a6ff;
    color: #fff;
    margin: 10px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: 13px;
    border: 2px solid #fffc;
    // box-shadow: 5px 5px 5px #3333;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    position: relative;
    & + .item {
      margin-left: 150px;
      &:before {
        content: '';
        display: block;
        width: 100px;
        height: 30px;
        position: absolute;
        top: 45px;
        left: -130px;
        background: url(~@/assets/images/arrow.png) no-repeat;
      }
    }
  }
}

.case-list {
  /deep/ .vxe-table--body .vxe-cell {
    max-height: unset !important;

    .img-list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
  }
}
</style>
