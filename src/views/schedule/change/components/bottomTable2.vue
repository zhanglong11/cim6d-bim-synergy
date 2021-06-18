<!--
@任务名称: 2623/BIM协同-进度视图前端绑定
@开发人员: 董渊海
@修改日期: 2020-03-18
@任务类型: 全新代码，添加对比项静态表格

@任务名称: 2623/BIM协同-进度视图前端绑定
@开发人员: 董渊海
@修改日期: 2020-03-19
@任务类型: 修改代码，对比表格数据渲染，修改比例(40%)
-->
<template>
  <div class="compare-div">
    <div class="compare-div-a">
      <div>对比项A</div>
      <vxe-grid show-overflow :data="taskListA" :columns="columns"></vxe-grid>
    </div>
    <div class="compare-div-c"></div>
    <div class="compare-div-b">
      <div>对比项B</div>
      <vxe-grid show-overflow :data="taskListA" :columns="columns"></vxe-grid>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    taskList: Array
  },
  data() {
    return {
      taskListA: [],
      taskListB: [],
      columns: [
        {
          field: 'taskNum',
          title: '任务编号'
        },
        {
          field: 'taskName',
          title: '任务名称'
        },
        {
          field: 'startTime',
          title: '开始时间'
        },
        {
          field: 'endTime',
          title: '结束时间'
        },
        {
          field: 'duration',
          title: '工期'
        },
      ]
    }
  },
  watch: {
    taskList(val) {
      let taskListA = []
      let taskListB = []
      for (let i = 0; i < val.length; i++) {
        taskListA.push({
          taskNum: val[i].wbsCode,
          taskName: val[i].name,
          startTime: val[i].planStartTime,
          endTime: val[i].planEndTime,
          duration: val[i].planDuration
        })
        taskListB.push({
          taskNum: val[i].wbsCodeB,
          taskName: val[i].nameB,
          startTime: val[i].planStartTimeB,
          endTime: val[i].planEndTimeB,
          duration: val[i].planDurationB
        })
      }
      this.taskListA = taskListA
      this.taskListB = taskListB
    }
  },
  created() {

  }
}
</script>

<style lang="less" scoped>
.compare-div {
  display: flex;

  .compare-div-a {
    flex: 1;

    > div:nth-child(1) {
      text-align: center;
    }
  }
  .compare-div-c {
    flex: 1px 0;
    background: #293143;
  }
  .compare-div-b {
    flex: 1;

    > div:nth-child(1) {
      text-align: center;
    }
  }
}
</style>