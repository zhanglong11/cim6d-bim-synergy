<!--
/**
 任务名称：2621/BIM协同成本趋势+成本三算绑定
 开发人员：崔洛宜
 日期：2020-3-16
 任务类型：1、全新代码
 **/
-->
<!--
/**
 任务名称：2621/BIM协同成本趋势+成本三算绑定
 开发人员：崔洛宜
 日期：2020-3-19
 任务类型：1、修改单选为多选
 **/
-->
<template>
  <el-dialog class="version" title="进度计划" :visible="visible" width="600px" top="10vh" @close="$emit('close')">
    <div style="width: 400px;max-height: 40vh;overflow:auto; margin: 0 auto">
      <vxe-grid
        :data="tableData"
        :columns="columns"
        @checkbox-change="checkboxChangeEvent"
        @checkbox-all="checkoutAll"
      ></vxe-grid>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleSubmit">确定</el-button>
      <el-button @click="$emit('close')">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import Api from '@/api/cost/calculate'
export default {
  name: 'ScheduleListDialog',
  components: {},
  props: ['visible'],
  data() {
    return {
      selectRows: [],
      columns: [
        {
          type: 'checkbox'
        },
        {
          type: 'seq',
          title: '序号'
        },
        {
          field: 'name',
          title: '名称'
        }
      ],
      tableData: []
    }
  },
  created() {
    Api.getScheduleList().then(res => {
      this.tableData = res.data
    })
  },
  methods: {
    checkboxChangeEvent({ selection }) {
      this.selectRows = selection
    },
    checkoutAll({ selection }) {
      this.selectRows = selection
    },
    /**
 任务名称：2621/BIM协同成本趋势+成本三算绑定
 开发人员：崔洛宜
 日期：2020-3-19
 任务类型：1、修改单选为多选
 **/
    handleSubmit() {
      if (this.selectRows.length > 0) {
        this.$emit('submit', this.selectRows)
      } else {
        this.$message.error('请至少选择一个')
      }
    }
  }
}
</script>
<style lang="less" scoped>
/*/deep/ .vxe-table {*/
/*  background-color: red !important;*/
/*}*/
.version {
  /deep/.el-dialog {
    background: #253446;
    .el-dialog__title {
      color: #5ea0e9;
    }
  }
}
</style>
