<!--
 * @Description: 进度明细
 * @Version: 
 * @Autor: 
 * @Date: 2020-02-26 11:23:53
 * @LastEditTime: 2020-02-28 15:07:00

@任务名称: 2623/BIM协同-进度视图前端绑定
@开发人员: 董渊海
@修改日期: 2020-03-17
@任务类型: 复制修改代码，进度明细数据格式化、绑定渲染、vxe-grid组件更换树表格组件，修改比例(95%)

@任务名称: 2623/BIM协同-进度视图前端绑定
@开发人员: 董渊海
@修改日期: 2020-03-31
@任务类型: 修改代码，选中当前任务后，联动模型高亮显示，修改比例(8%)

@bug名称: 1635/进度模块、计划进度-左侧筛选树时间不正确，且右侧筛选结果不正确
@开发人员: 董渊海
@修改日期: 2020-04-15
@任务类型: 修改代码，根据李建敏的进度模块，修复进度明细表筛选bug，修改比例(5%)
 -->
<template>
  <div>
    <!--<div class="btn-box"><el-button type="primary">导出</el-button></div>-->
    <!--<vxe-grid :data="listAll" :columns="columns"></vxe-grid>-->
    <vxe-table
      ref="table"
      resizable
      tree-config
      highlight-current-row
      :data="treeData"
      row-id="taskUniqueId"
      @current-change="currentChangeEvent"
    >
      <vxe-table-column title="序号" type="seq" width="60"></vxe-table-column>
      <vxe-table-column title="任务编号" field="wbsCode" width="140px" tree-node></vxe-table-column>
      <vxe-table-column title="任务名称" field="name" min-width="200px"></vxe-table-column>
      <vxe-table-column
        width="100px"
        title="计划开始时间"
        :formatter="['toDateString', 'yyyy-MM-dd']"
        field="planStartTime"
      ></vxe-table-column>
      <vxe-table-column
        width="100px"
        title="计划结束时间"
        :formatter="['toDateString', 'yyyy-MM-dd']"
        field="planEndTime"
      ></vxe-table-column>
      <vxe-table-column title="工期(天)" width="70px" field="planDuration"></vxe-table-column>
      <vxe-table-column
        width="100px"
        title="实际开始时间"
        :formatter="['toDateString', 'yyyy-MM-dd']"
        field="actualStartTime"
      ></vxe-table-column>
      <vxe-table-column
        width="100px"
        title="实际结束时间"
        :formatter="['toDateString', 'yyyy-MM-dd']"
        field="actualEndTime"
      ></vxe-table-column>
      <vxe-table-column title="实际工期(天)" width="100px" field="actualDuration"></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
import toTree from '@/utils/toTree'
import treeForEach from '@/utils/treeForEach'
import treeFilter from '@/utils/treeFilter'
import Api from '@/api/schedule'
export default {
  props: {
    listAll: Array,
    activeNode: Object
  },
  data() {
    return {
      treeData: [],
      columns: [
        {
          type: 'seq',
          title: '序号',
          width: 60
        },
        {
          field: 'wbsCode',
          title: '任务编号'
        },
        {
          field: 'name',
          title: '任务名称'
        },
        {
          field: 'planStartTime',
          title: '计划开始时间'
        },
        {
          field: 'planEndTime',
          title: '计划结束时间'
        },
        {
          field: 'planDuration',
          title: '工期（天）'
        },
        {
          field: 'actualStartTime',
          title: '实际开始时间',
          slots: {
            default: ({ row, column }) => {
              return [row.actualStartTime !== null ? row.actualStartTime : '-']
            }
          }
        },
        {
          field: 'actualEndTime',
          title: '实际结束时间',
          slots: {
            default: ({ row, column }) => {
              return [row.actualEndTime !== null ? row.actualEndTime : '-']
            }
          }
        },
        {
          field: 'realityDuration',
          title: '实际工期',
          slots: {
            default: ({ row, column }) => {
              return [row.realityDuration !== null ? row.realityDuration : '-']
            }
          }
        }
      ]
    }
  },
  watch: {
    activeNode(val) {
      this.treeData = this.computedList
    },
    listAll(val) {
      this.treeData = this.computedList
    }
  },
  computed: {
    computedList() {
      let data = _.cloneDeep(this.listAll)
      let list = toTree(data, 'parentTaskUniqueId', 'planStartTime', 'taskUniqueId', false)
      treeForEach(list, (item, parent, index) => {
        if (!parent) {
          item.wbsCode = index + 1
        } else {
          item.wbsCode = parent.wbsCode + '.' + (index + 1)
        }

        let PS = moment(item.planStartTime).format('YYYY-MM-DD')
        let PE = moment(item.planEndTime).format('YYYY-MM-DD')
        let AS = moment(item.actualStartTime).format('YYYY-MM-DD')
        let AE = moment(item.actualStartTime).format('YYYY-MM-DD')
        let today = moment().format('YYYY-MM-DD')

        if (item.status === 1) {
          if (AS > PS) {
            item.statusText = '延期开始'
          } else if (AS < PS) {
            item.statusText = '延期开始'
          } else {
            item.statusText = '正常开始'
          }
        } else if (item.status === 2) {
          if (AE > PE) {
            item.statusText = '提前结束'
          } else if (AE < PE) {
            item.statusText = '延期结束'
          } else {
            item.statusText = '正常结束'
          }
        } else {
          if (today > PS) {
            item.statusText = '已延期'
          } else {
            item.statusText = '未开始'
          }
        }
      })
      if (this.activeNode) {
        const { year, month } = this.activeNode
        if (month) {
          list = treeFilter(list, e => {
            return moment()
              .year(year)
              .month(month)
              .isBetween(moment(e.planStartTime), moment(e.planEndTime), 'month', '[]')
          })
        } else if (year) {
          list = treeFilter(list, e => moment(e.planStartTime).get('year') === year)
        }
      }
      return list
    },
  },
  created() {
    setTimeout(() => {
      this.treeData = this.computedList
    }, 100)
  },
  methods: {
    currentChangeEvent({ row }) { // 选中当前任务后，联动模型高亮显示
      let projectId = localStorage.getItem('projectId')
      Api.componentBindListGuid({projectId: projectId, taskIds: [row.id]}).then(res => {
        let guIds = res.data[row.id]
        if (guIds && guIds.length) {
          this.$store.commit('bim/showModalByGuids', guIds)
        } else {
          this.$store.commit('bim/showAll')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.btn-box {
  text-align: right;
  padding: 6px 0;
}
</style>
