<!--
 * @Description: 
 * @Version: 
 * @Autor: 
 * @Date: 2020-02-26 14:23:37
 * @LastEditTime: 2020-02-29 15:01:06
 -->
<template>
  <div>
    <el-form inline :model="form">
      <div class="flex">
        <div>
          <el-form-item label="三算选择">
            <el-select v-model="form.project" style="width:120px">
              <el-option label="全部" value="all"></el-option>
              <el-option label="任务一" value="shanghai"></el-option>
              <el-option label="任务二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              v-model="form.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="日期跨度">
            <el-select v-model="form.project" style="width:100px">
              <el-option label="全部" value="all"></el-option>
              <el-option label="布吉岛" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item>
            <el-button @click="search" type="primary">查询</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <vxe-grid :data="tableData" :columns="columns"></vxe-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          time: '2019-09-22',
          income: '20',
          budgetCost: '12',
          actualCost: '18'
        }
      ],
      typeList: [
        {
          name: '213',
          value: 213
        }
      ],
      columns: [
        {
          title: ' ',
          children: [
            {
              type: 'seq',
              title: '序号'
            },
            {
              field: 'income',
              title: '任务编号'
            },
            {
              field: 'income',
              title: '任务名称'
            }
          ]
        },
        {
          title: '对比项A计划工期',
          children: [
            {
              field: 'income',
              title: '计划开始时间'
            },
            {
              field: 'income',
              title: '计划结束时间'
            },
            {
              field: 'income',
              title: '工期（天）'
            }
          ]
        },
        {
          title: '对比项B实际工期',
          children: [
            {
              field: 'income',
              title: '实际开始时间'
            },
            {
              field: 'income',
              title: '实际结束时间'
            },
            {
              field: 'income',
              title: '实际工期'
            }
          ]
        }
      ],
      form: {}
    }
  },
  watch: {
    'form.date': {
      handler: function(n) {
        if (n[0] !== null) {
          this.form.startTime = moment(n[0]).format('YYYY-MM-DD HH:MM:SS')
          this.form.endTime = moment(n[1]).format('YYYY-MM-DD HH:MM:SS')
        } else {
          this.form.startTime = ''
          this.form.endTime = ''
        }
      }
    }
  },
  methods: {
    search() {}
  }
}
</script>

<style lang="less" scoped>
.flex {
  display: flex;
  justify-content: space-between;
}
</style>
<style lang="less">
.vxe-table.t--border.b--style-none .vxe-header--column {
  background-image: unset;
}
</style>
