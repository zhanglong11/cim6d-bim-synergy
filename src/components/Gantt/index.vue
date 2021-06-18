<!--
@bug名称: 1630、1688/BIM协同-进度视图-甘特图-实际进度的显示需要优化一下；BIM协同-进度视图-甘特图-后台的实际进度都是100%，前台显示的不一致
@开发人员: 董渊海
@修改日期: 2020-04-17
@任务类型: 修改代码，修复2个bug，修改比例(8%)
-->
<template>
  <div class="gantt">
    <el-form style="margin-top: 5px;" inline>
      <el-form-item label="视图" class="fr" label-width="40px" style="margin-right: 0;margin-bottom:10px">
        <el-radio-group v-model="viewMode" size="mini">
          <el-radio-button :label="1">月</el-radio-button>
          <el-radio-button :label="2">周</el-radio-button>
          <el-radio-button :label="3">日</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div ref="gantt" class="gantt-box" style="height: 282px;margin-top: 0px;"></div>
  </div>
</template>

<script>
import '@/assets/js/dhtmlxgantt'
import 'dhtmlx-gantt/codebase/locale/locale_cn.js'
export default {
  name: 'Gantt',
  props: {
    tasks: {
      type: Array,
      required: true,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      gantt: null,
      activeBaseLine: null,
      activeBaseLineTaskList: [],
      layerId: null,
      viewMode: 3
    }
  },
  watch: {
    tasks() {
      if (!this.gantt) {
        this.setupGanttChart()
      }
      this.updateTasks()
    },
    async activeBaseLine(id) {
      if (id) {
        await this.axios.schedule.get('schedule/plan/taskList/' + id).then(res => {
          this.activeBaseLineTaskList = res.data
        })
      }
      this.render()
    },
    viewMode() {
      this.setScale()
    }
  },
  methods: {
    setupGanttChart() {
      gantt.config.scale_height = 50
      gantt.config.task_height = 16
      gantt.config.row_height = 40
      gantt.config.min_column_width = 40
      gantt.config.show_grid = false
      gantt.config.show_task_cells = false
      gantt.config.readonly = true
      gantt.config.columns = []
      gantt.init(this.$refs.gantt)
      this.setScale()
      this.render()
      gantt.attachEvent('onTaskDblClick', () => {
        return false
      })
      gantt.attachEvent('onTaskClick', id => {
        this.$emit('taskClick', id)
      })
    },
    render() {
      if (this.layerId) {
        gantt.removeTaskLayer(this.layerId)
      }
      this.layerId = gantt.addTaskLayer(task => {
        if (!this.activeBaseLine) {
          if (task.actual_start && task.actual_end) {
            let sizes = gantt.getTaskPosition(task, task.actual_start, task.actual_end)
            let el = document.createElement('div')
            el.className = 'baselines'
            el.style.left = sizes.left + 'px'
            el.style.width = sizes.width + 'px'
            el.style.top = sizes.top + gantt.config.task_height + 13 + 'px'
            el.style.height = 14 + 'px'
            /*el.innerHTML = `
              <div class="gantt_task_content" style="line-height: 14px;">
                <span style="z-index:11;color:#fff;font-weight: bold;">实际</span>
                <span style="display: block;
                position: absolute;
                height: 100%;
                width: ${task.progress * 100}%;
                background-color:#659FE2;
                top: 0;
                z-index:10">
                <span style="position: absolute;left: 100%;margin-left: 5px;">${task.progress * 100}%</span>
                </span>
              </div>`*/
            if (task.progress === 1) {
              el.innerHTML = `
                <div class="gantt_task_content" style="line-height: 14px; background-color:#659FE2;">
                  <span style="color:#fff; font-weight: bold;">实际</span>
                  <span>${task.progress * 100}%</span>
                </div>
              `
            } else {
              el.innerHTML = `
                <div class="gantt_task_content" style="line-height: 14px;">
                  <span style="display: block;
                    position: absolute;
                    height: 100%;
                    width: ${task.progress * 100}%;
                    background-color:#659FE2;
                    top: 0;
                    z-index:10"
                  >
                    <span style="position: absolute;left: 100%;margin-left: 5px;">
                      <span style="color:#fff; font-weight: bold;">实际</span>
                      ${task.progress * 100}%
                    </span>
                  </span>
                </div>
              `
            }
            el.style.pointerEvents = 'none'
            return el
          }
        } else {
          const baseLineTask = _.find(this.activeBaseLineTaskList, { taskUniqueId: +task.id })
          if (baseLineTask) {
            let sizes = gantt.getTaskPosition(
              task,
              moment(baseLineTask.planStartTime).toDate(),
              moment(baseLineTask.planEndTime).toDate()
            )
            let el = document.createElement('div')
            el.className = 'baseline'
            el.style.left = sizes.left + 'px'
            el.style.width = sizes.width + 'px'
            el.style.top = sizes.top + gantt.config.task_height + 13 + 'px'
            el.style.height = 14 + 'px'
            el.innerHTML = `<div class="gantt_task_content" style="line-height: 14px;">基准</div>`
            el.style.pointerEvents = 'none'
            return el
          }
        }

        return false
      })
      gantt.render()
    },
    updateTasks() {
      gantt.clearAll()
      let links = []
      this.tasks.forEach(e => {
        e.dependencies.forEach(f => {
          links.push({ id: _.uniqueId(), source: f, target: e.id, type: '1' })
        })
      })
      gantt.parse({
        data: this.tasks,
        links
      })
    },
    setScale() {
      gantt.config.scales = [
        [{ unit: 'month', step: 1, format: '%Y年%M' }],
        [{ unit: 'week', step: 1, format: '%Y年%M%d日', width: 200 }],
        [
          { unit: 'week', step: 1, format: '%F, %Y' },
          { unit: 'day', step: 1, format: '%j, %D' }
        ]
      ][this.viewMode - 1]
      gantt.config.min_column_width = [60, 100, 40][this.viewMode - 1]
      gantt.render()
    }
  }
}
</script>

<style lang="less">
@import '~dhtmlx-gantt/codebase/dhtmlxgantt.css';
.gantt_task_content {
  text-align: left;
}
.gantt_task_row {
  // background: #05539b;
}
.baseline {
  position: absolute;
  border-radius: 2px;
  opacity: 0.6;
  margin-top: -7px;
  height: 12px;
}
.baselines {
  position: absolute;
  border-radius: 2px;
  opacity: 0.6;
  margin-top: -7px;
  height: 12px;
  background: rgba(0, 0, 0, 0);
}
// 计划进度条
.gantt_task_line,
.gantt_line_wrapper {
  margin-top: -9px;
  div {
    background-color: #4996dd;
  }
}

.gantt_side_content {
  margin-bottom: 7px;
}

.gantt_task_link .gantt_link_arrow {
  margin-top: -10px;
}

.gantt_side_content.gantt_right {
  bottom: 0;
}
.gantt_task .gantt_task_scale .gantt_scale_cell {
  color: #a2c6e6 !important;
}
</style>
<style lang="less" scoped>
.gantt {
  /deep/ .gantt-box {
    border: none !important;
    .gantt_scale_cell {
      border: none;
    }
    .gantt_task_scale,
    .gantt_container,
    .gantt_row,
    .gantt_task_row,
    .gantt_layout_cell_border_bottom {
      border: none !important;
    }
    .gantt_container {
      background-color: #05172c !important;
    }
  }
}
</style>
