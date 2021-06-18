<!--
 * @Description: 质检问题
 * @Version:
 * @Autor:
 * @Date: 2020-02-25 18:10:07
 * @LastEditTime: 2020-04-17 10:36:34
 -->
<!--*
* @任务编号:2620||页面接口对接
* @开发人员:张龙
* @日期:2020-03-16
* @任务类型:修改代码
*/
-->
<!--
  * @任务编号: 2525 || 质量视图新增详情页
  * @开发人员:申豪强
  * @日期:2020-03-17
  * @任务类型: 新代码
  -->
<!--
* @任务编号: 2620 || 质量添加搜索框
* @开发人员:张龙
* @日期:2020-03-25
* @任务类型: 新代码
-->
<template>
  <div>
    <div v-if="!detailsFlag">
      <v-chart style="width: 100%;height: 200px;" :options="chartOptions"></v-chart>
      <div>
        <el-input v-model="pageQuery.problemDesc" placeholder="请输入">
          <el-button slot="append" icon="el-icon-search" @click="refresh"></el-button>
        </el-input>
      </div>
      <el-table id="questionTable" :data="list" @row-click="rowClick">
        <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="issueDescription"
          label="问题描述"
        ></el-table-column>
        <el-table-column align="center" prop="b" label="紧急程度">
          <template slot-scope="scope">
            <span
              class="point"
              :style="{ background: _.get(_.find(urgencyDegreeList, { value: scope.row.emergencyLevel }), 'color') }"
            />
            <span>{{ _.get(_.find(urgencyDegreeList, { value: scope.row.emergencyLevel }), 'label') }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="inspectArea" label="检查部位"></el-table-column>
        <el-table-column align="center" prop="d" label="整改状态">
          <template slot-scope="scope">
            <span v-if="scope.row.dealStatus === 0" style="color:red">{{
              _.get(_.find(statusList, { value: scope.row.dealStatus }), 'label')
            }}</span>
            <span v-else>{{ _.get(_.find(statusList, { value: scope.row.dealStatus }), 'label') }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else>
      <!--      <Details @goBack="goBack" />-->
    </div>

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
import api from '@/api/quality'
import bimUtils from '@/utils/bimUtils'
import Details from './components/QualityDetails'
import moment from 'moment'
export default {
  components: {
    Details
  },
  data() {
    return {
      /*
       * @任务编号:2620||接口数据以及状态对应数据
       * @开发人员:张龙
       * @日期:2020-03-16
       * @任务类型:修改代码
       */
      pageQuery: {
        problemDesc: '',
        page: 1,
        rows: 50
      },
      list: [],
      // 详情标志
      detailsFlag: false,
      checkData: [],
      statusList: [
        {
          label: '未解决',
          value: 0
        },
        {
          label: '已解决',
          value: 1
        }
      ],
      urgencyDegreeList: [
        { label: '一般', value: 1, color: '#91C1F3' },
        { label: '较大', value: 2, color: '#FFFF00' },
        { label: '严重', value: 3, color: '#FF9650' },
        { label: '重大', value: 4, color: '#FF3333' }
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
      chartOptions: {
        title: {
          text: '质量问题',
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
            data: []
          }
        ],
        legend: {
          itemGap: 16,
          show: true,
          top: 'middle',
          right: 10,
          icon: 'circle',
          formatter: name => {
            /*
             * @任务编号:2620||实现已整改数据在echarts展现
             * @开发人员:张龙
             * @日期:2020-03-16
             * @任务类型:修改代码
             */
            let curItem = this.checkData.filter(r => r.name === name)[0]
            if (curItem) {
              let count = curItem.value
              let solveCount = curItem.count
              return [`{a|${name}}`, `{b|${count}}`, `{a|未解决}`, `{b|${solveCount}}`].join(' ')
            }
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
      historyRectifyStatusList: [
        { label: '已下达', value: 1 },
        { label: '已整改', value: 2 },
        { label: '复检通过', value: 3 },
        { label: '复检不通过', value: 4 }
      ],
      moment
    }
  },
  /*
   * @任务编号:2620||echarts接口对接
   * @开发人员:张龙
   * @日期:2020-03-16
   * @任务类型:修改代码
   */
  created() {},
  mounted() {
    this.refresh()
  },
  methods: {
    /*
     * @任务编号: 2525 || 质量视图新增详情页
     * @开发人员:申豪强
     * @日期:2020-03-17
     * @任务类型: 新代码
     */
    // 根据guid定位并添加标注
    fitViewByGUID(guidArray) {
      let bimfishApp = this.$store.state.bim.bimfishApp
      // 添加标注
      const icon = '/img/qualityProblem.png'
      bimfishApp.addDrawableIconMarkerByGUID(guidArray, icon, ({ screenPoint, guid }) => {
        // console.log('screenPoint:', screenPoint, guid)
        // console.log(guid)
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

        let tbody_wrapper = document.getElementsByClassName('el-table__body-wrapper')
        if (tbody_wrapper.length) {
          let tbody = document.getElementsByClassName('el-table__body-wrapper')[0].children[0].children[1]

          for (let i = 0; i < this.list.length; i++) {
            if (targetId === this.list[i].id) {
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
    goBack() {
      this.$emit('goBack')
      this.detailsFlag = false
    },
    async rowClick(row) {
      /*const res = await api.getGuid(row.id)
      // 返回值应该多一个dbid或者guid
      // let bimfishApp = this.$store.state.bim.bimfishApp
      if (res.data.componentIdList.length) {
        this.fitViewByGUID(res.data.componentIdList)
      }
      // this.$emit('goDetails')
      // this.detailsFlag = true*/

      this.visible = true
      this.timelineList = []
      api.getQuestionDetail(row.id).then(res => {
        // console.log(res)
        for (let item of res.data.historyDtoList) {
          this.timelineList.push({
            type: 'rectify',
            statusText: this.$getLabel(this.historyRectifyStatusList, item.rectifyStatus),
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
    async refresh() {
      const res = await api.checkCount({ planTypes: [1] })
      let data = res.data
      this.checkData = [
        { name: '一般隐患', value: data.general, count: data.generalTODO },
        { name: '重大隐患', value: data.great, count: data.greatTODO },
        { name: '较大隐患', value: data.larger, count: data.largerTODO },
        { name: '严重隐患', value: data.severity, count: data.severityTODO }
        // { name: '一般隐患', value: data.general, count: data.general - data.generalSolve },
        // { name: '重大隐患', value: data.great, count: data.great - data.greatSolve },
        // { name: '较大隐患', value: data.larger, count: data.larger - data.largerSolve },
        // { name: '严重隐患', value: data.severity, count: data.severity - data.severitySolve }
      ]
      this.chartOptions.series[0].data = this.checkData
      const listRes = await api.listPage({
        ...this.pageQuery,
        ...{
          planTypes: [1]
        }
      })
      this.list = listRes.data.records

      this.getGuids(this.list)
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
          // this.fitViewByGUID(newArray)

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
.point {
  width: 8px;
  height: 8px;
  display: inline-flex;
  margin: 0 4px 1px 0;
  border-radius: 50%;
}
/deep/ .el-table__body-wrapper .el-table__body tr.active {
  background: #5ea0e9;
}
/deep/ .el-table__body-wrapper .el-table__body tr {
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
