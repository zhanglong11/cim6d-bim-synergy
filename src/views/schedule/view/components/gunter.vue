<!--
 * @Description: 甘特图
 * @Version: 
 * @Autor: 
 * @Date: 2020-02-26 11:24:13
 * @LastEditTime: 2020-02-27 12:14:42

@任务名称: 2623/BIM协同-进度视图前端绑定
@开发人员: 董渊海
@修改日期: 2020-03-17
@任务类型: 复制修改代码，甘特图数据格式化、绑定渲染，修改比例(85%)

@bug名称: 1630、1688/BIM协同-进度视图-甘特图-实际进度的显示需要优化一下；BIM协同-进度视图-甘特图-后台的实际进度都是100%，前台显示的不一致
@开发人员: 董渊海
@修改日期: 2020-04-17
@任务类型: 修改代码，修复2个bug，修改比例(2%)
 -->
<template>
  <div>
    <Gantt
      ref="gantt"
      view-mode="month"
      :tasks="ganttTaskList"
      style="padding-bottom: 15px;"
      @taskClick="handleGanttTaskClick"
      @task-updated="debugEventLog.push($event)"
      @task-date-updated="debugEventLog.push($event)"
      @task-progress-change="debugEventLog.push($event)"
    />
  </div>
</template>

<script>
import ganttTaskList from '@/components/Gantt/data.js'
import Gantt from '@/components/Gantt'
import toTree from '@/utils/toTree'
import toFlat from '@/utils/toFlat'
import treeForEach from '@/utils/treeForEach'
import treeFilter from '@/utils/treeFilter'
export default {
  components: {
    Gantt
  },
  props: {
    listAll: Array,
    activeNode: Object
  },
  data() {
    return {
      debugEventLog: [],
      ganttTaskList: []
    }
  },
  watch: {
    activeNode(val) {
      this.ganttTaskList = this.ganttTasks
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
          list = treeFilter(
                  list,
                  e => moment(e.planStartTime).get('year') === year && moment(e.planStartTime).get('month') + 1 === month
          )
        } else if (year) {
          list = treeFilter(list, e => moment(e.planStartTime).get('year') === year)
        }
      }
      return list
    },
    ganttTasks() {
      let result = toFlat(this.computedList, 'parentTaskUniqueId', 'taskUniqueId').map(e => ({
        id: '' + e.taskUniqueId,
        rowId: e.id,
        text: e.name,
        actual_start: moment(e.planStartTime).toDate(),
        actual_end: moment(e.planEndTime).toDate(),
        start_date: moment(e.planStartTime).toDate(),
        end_date: moment(e.planEndTime).toDate(),
        progress: e.actualProgress,
        // parent: e.parentTaskUniqueId,
        dependencies: e.preTaskId ? e.preTaskId.split(',') : [],
        linkType: e.preTaskId === (e.parentTaskUniqueId || -1).toString() ? '1' : '0'
      }))
      //console.log(result)
      return result
    },
  },
  created() {
    /*let arr = JSON.parse(JSON.stringify(ganttTaskList))
    arr.forEach(item => {
      item.actual_start = item.actual_start ? moment(item.actual_start).toDate() : null
      item.actual_end = item.actual_end ? moment(item.actual_end).toDate() : null
      item.start_date = item.start_date ? moment(item.start_date).toDate() : null
      item.end_date = item.actual_end ? moment(item.end_date).toDate() : null
    })
    console.log(arr)
    setTimeout(() => {
      this.ganttTaskList = arr
    }, 100)*/

    setTimeout(() => {
      this.ganttTaskList = this.ganttTasks
    }, 100)
  },
  methods: {
    handleGanttTaskClick(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped></style>
