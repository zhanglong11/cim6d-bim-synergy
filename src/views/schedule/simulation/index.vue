<!--
 * @Description: 进度视图--进度模拟
 * @Version:
 * @Autor:
 * @Date: 2020-02-26 10:22:40
 * @LastEditTime: 2020-04-23 11:06:12
 -->
<!--
  * @任务编号: 2524 || 进度模拟，根据计划时间为基础对应实际时间的提前和延迟做出绿色和红色变化
  * @开发人员:申豪强
  * @日期:2020-03-19
  * @任务类型: 新代码
  -->
<template>
  <div>
    <!-- 底部的table -->
    <div :class="['bottom-table', 'bottom-table-simulation', down ? 'turn-down' : '']">
      <div style="text-align:right">
        <span :class="down ? 'down' : 'up'" style="cursor: pointer;" @click="turnDown"
          ><i class="el-icon-arrow-up"></i
        ></span>
      </div>
      <div class="search">
        <el-form inline :model="form">
          <div class="flex">
            <div>
              <el-form-item label="选择工期">
                <el-select v-model="form.type" style="width:120px">
                  <el-option
                    v-for="item in planList"
                    :value="item.value"
                    :key="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="时间">
                <el-date-picker
                  v-model="form.date"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
              <!-- 传给后台时间跨度固定为日，否则会造成获取不到特定日期数据 -->
              <el-form-item label="时间跨度">
                <el-select v-model="form.timeSpan" style="width:100px">
                  <el-option label="月" :value="3"></el-option>
                  <el-option label="周" :value="2"></el-option>
                  <el-option label="日" :value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button @click="onSubmit" type="primary">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button @click="start" type="primary">开始模拟</el-button>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div>
        <DateTickBar
          ref="DateTickBar"
          :scaleUnit="form.scaleUnit"
          :start="form.beginDate"
          :end="form.endDate"
          @tickChange="dateTickChangeHandle"
          :width="width"
        />
      </div>
      <vxe-grid :data="tableData" :columns="columns" tree-config row-id="taskUniqueId"></vxe-grid>
    </div>
  </div>
</template>

<script>
import toTree from '@/utils/toTree'
import treeForEach from '@/utils/treeForEach'
import Api from '@/api/schedule'
import DateTickBar from '@/components/TickProgressBar/DateTickBar'
import moment from 'moment'
export default {
  components: {
    DateTickBar
  },
  data() {
    return {
      // 去除初始值
      width: 960,
      index: 0,
      // 以时间为key的map
      timeData: {},
      // 查询model的参数
      form: {
        beginDate: '',
        endDate: moment()
          .endOf('year')
          .format('YYYY-MM-DD'),
        projectId: localStorage.getItem('projectId'),
        scaleUnit: 'week', //时间跨度，不传后台，传插件里
        timeSpan: 2, //时间跨度
        type: 1
      },
      // 计划列表
      planList: [
        {
          value: 1,
          label: '计划工期'
        },
        {
          value: 2,
          label: '实际工期'
        }
      ],
      down: false,
      startDate: moment()
        .startOf('year')
        .format('YYYY-MM-DD'),
      endDate: moment()
        .endOf('year')
        .format('YYYY-MM-DD'),
      tableData: [],
      columns: [
        {
          type: 'seq',
          title: '序号',
          width: 60
        },
        {
          field: 'wbsCode',
          title: '任务编号',
          treeNode: true
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
          title: '计划工期（天）'
        },
        {
          field: 'actualStartTime',
          title: '实际开始时间'
        },
        {
          field: 'actualEndTime',
          title: '实际结束时间'
        },
        {
          field: 'realityDuration',
          title: '实际工期'
        }
      ]
    }
  },
  watch: {
    'form.date': {
      handler: function(n) {
        if (n[0] !== null) {
          this.form.beginDate = moment(n[0]).format('YYYY-MM-DD HH:MM:SS')
          this.form.endDate = moment(n[1]).format('YYYY-MM-DD HH:MM:SS')
        } else {
          this.form.beginDate = ''
          this.form.endDate = ''
        }
      }
    },
    'form.timeSpan': {
      handler: function(e) {
        if (e === 1) {
          this.form.scaleUnit = 'day'
        } else if (e === 2) {
          this.form.scaleUnit = 'week'
        } else {
          this.form.scaleUnit = 'month'
        }
      }
    }
  },
  mounted() {
    this.$refs.DateTickBar.initBar()
    this.width = window.innerWidth - 430
    this.getTable()
  },
  methods: {
    // 每天的数据模拟
    turnDown() {
      this.down = !this.down
    },
    // 获取table数据
    async getTable() {
      let res = await Api.getTaskList(localStorage.getItem('projectId'))
      console.log(res)
      // this.tableData = res.data.taskList
      let data = _.cloneDeep(res.data.taskList)
      let list = toTree(data, 'parentTaskUniqueId', 'planStartTime', 'taskUniqueId', false)
      treeForEach(list, (item, parent, index) => {
        if (!parent) {
          item.wbsCode = index + 1
        } else {
          item.wbsCode = parent.wbsCode + '.' + (index + 1)
        }
      })
      console.log(list)
      this.tableData = list
    },
    // 获取时间轴数据
    async onSubmit() {
      if (!this.form.beginDate || !this.form.endDate) {
        return this.$message.error('时间必填')
      }
      this.$refs.DateTickBar.initBar()
      this.$refs.DateTickBar.handleBackToStart()
      // 待更改为this.form
      let res = await Api.getSimulateData(this.form)
      this.timeData = res.data
    },
    // 开始模拟
    async start() {
      if (!this.form.beginDate || !this.form.endDate) {
        return this.$message.error('时间必填')
      }
      await this.onSubmit()
      this.$refs.DateTickBar.handleBackToStart()
      this.$refs.DateTickBar.handleForwardPlay()
      //  隐藏所有
      let bimfishApp = this.$store.state.bim.bimfishApp
      // step1:清除颜色
      bimfishApp.clearThemingColors()
      // step2：隐藏所有
      bimfishApp.hideAll()
      bimfishApp.setGhosting(false)
    },
    // 根据guid跟模型进行绑定
    setThemingColor(guidArray, planTime, practicalTime) {
      let app = this.$store.state.bim.bimfishApp
      let flag = Number(new Date(practicalTime).valueOf()) > Number(new Date(planTime).valueOf())
      app.clearThemingColorByGUID(guidArray)
      if (flag) {
        app.setThemingColor(guidArray, 1)
      } else {
        app.setThemingColor(guidArray, 0, 1)
      }
    },
    /**
     * @description: 根据dbid改变模型颜色
     * @param {Array} dbidArray dbid数组
     * @param {Array} modelArray 模型id的集合
     * @param {String} planTime 计划时间
     * @param {String} practicalTime 实际时间
     * @author: 申豪强
     */
    setThemingColorByDbId(dbidArray, modelArray = [], planTime, practicalTime) {
      let app = this.$store.state.bim.bimfishApp
      // 实际时间大于计划时间，则为滞后，为红色；反之为绿色
      let flag = Number(new Date(practicalTime).valueOf()) > Number(new Date(planTime).valueOf())
      app.clearThemingColors()
      for (let id of modelArray) {
        let model = app.findModelByid(id)
        if (flag) {
          this.$store.commit('bim/setColorByDbId', { dbidArray: dbidArray, model: model, color: [1] })
          // app.setThemingColorByDbId(dbidArray, model, 1)
        } else {
          this.$store.commit('bim/setColorByDbId', { dbidArray: dbidArray, model: model, color: [0, 1] })
          // app.setThemingColorByDbId(dbidArray, model, 0, 1)
        }
      }
    },
    // 修复模拟数据固定为日的问题，时间轴按照后台数据传 申豪强 2020-04-20
    dateTickChangeHandle(e, date) {
      let targetMoment = null
      // 月
      if (this.form.timeSpan === 3) {
        targetMoment = moment(date)
          .endOf('month')
          .format('YYYY-MM-DD')
        if (new Date(targetMoment).valueOf() > new Date(this.form.endDate).valueOf()) {
          date = moment(this.form.endDate).format('YYYY-MM-DD')
        } else {
          date = targetMoment
        }
        console.log(date)
      }

      // 每次执行都要清空上次遗留的项目数据
      let bimfishApp = this.$store.state.bim.bimfishApp
      let target = this.timeData[date]
      console.log(target)
      if (target && target.length > 0) {
        for (let item of target) {
          let guids = item.componentIds
          if (item.status === 0) {
            // 未开始隐藏
            console.log('隐藏')
            bimfishApp.hide(guids)
          } else if (item.status === 1) {
            // 进行中：高亮（蓝色）
            console.log('蓝色')
            bimfishApp.show(guids)
            // bug#1711 蓝色遮盖 申豪强 2020-04-17
            bimfishApp.setThemingColor(guids, 0, 0, 1, 0.3)
          } else if (item.status === 2) {
            // 结束：原色
            // ['7166c8d6-0146-4033-9109-227e0c832543-001c3ae9']
            bimfishApp.show(guids)
            bimfishApp.clearThemingColorByGUID(guids)
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.flex {
  display: flex;
  justify-content: space-between;
}
.bottom-table-simulation {
  right: 80px;
  left: 360px;
  padding: 10px;
}
</style>
