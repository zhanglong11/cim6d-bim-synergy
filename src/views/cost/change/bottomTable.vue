<!--
 * @Description: 底部table：计划工期、实际工期
 * @Version:
 * @Autor:
 * @Date: 2020-02-25 16:45:57
 * @LastEditTime: 2020-03-03 16:20:50
 -->
<template>
  <div class="change">
    <el-form inline :model="form">
      <div class="flex">
        <div>
          <el-form-item label="三算选择">
            <el-select v-model="form.module" style="width:120px">
              <el-option
                v-for="item in moduleList"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="资源">
            <el-select v-model="form.type" style="width:120px">
              <el-option
                v-for="item in resourceList"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
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
import Api from '@/api/cost/change'
export default {
  props: {
    costIdA: {
      type: String,
      default: ''
    },
    costIdB: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      moduleList: [
        {
          label: '预算成本',
          value: 0
        },
        {
          label: '测算成本',
          value: 1
        },
        {
          label: '核算成本',
          value: 2
        }
      ],
      resourceList: [
        {
          label: '人工费',
          value: 1
        },
        {
          label: '机械费',
          value: 3
        },
        {
          label: '管理费',
          value: 4
        },
        {
          label: '利润',
          value: 5
        },
        {
          label: '耗材费',
          value: 6
        },
        {
          label: '周材费',
          value: 7
        }
      ],
      tableData: [],
      columns: [
        {
          title: ' ',
          children: [
            {
              field: 'itemCode',
              title: '项目编号'
            },
            {
              field: 'itemName	',
              title: '项目名称'
            },
            {
              field: 'type',
              title: '项目类型',
              formatter: ({ cellValue }) =>
                _.get(
                  this.resourceList.find(item => item.value === cellValue),
                  'label',
                  '-'
                ),
              className: () => {
                return 'spliceBorder'
              }
            }
          ]
        },
        {
          title: '调整名称A',
          children: [
            {
              field: 'quantityA',
              title: '数量',
              width: '11%'
            },
            {
              field: 'unitPriceA',
              title: '单价',
              width: '11%'
            },
            {
              field: 'combinedPriceA',
              title: '合价',
              width: '11%',
              className: () => {
                return 'spliceBorder'
              }
            }
          ]
        },
        {
          title: '调整名称B',
          children: [
            {
              field: 'quantityB',
              title: '数量',
              width: '11%',
              className: ({ row }) => {
                if (row.type === 1) {
                  return 'add'
                } else {
                  return 'reduce'
                }
              }
            },
            {
              field: 'unitPriceB',
              title: '单价',
              width: '11%',
              className: ({ row }) => {
                if (row.type === 2) {
                  return 'add'
                } else {
                  return 'reduce'
                }
              }
            },
            {
              field: 'combinedPriceB',
              title: '合价',
              width: '11%',
              className: ({ row }) => {
                if (row.type === 1) {
                  return 'add'
                } else {
                  return 'reduce'
                }
              }
            }
          ]
        }
      ],
      form: {
        projectId: localStorage.getItem('projectId') || '01b2a1d7857d476fbf3efdfce1d5dea1'
      }
    }
  },
  created() {
    this.search()
  },
  methods: {
    async search() {
      this.form.costIdA = this.costIdA
      this.form.costIdB = this.costIdB
      let res = await Api.getChangeList(this.form)
      this.tableData = res.data
    }
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
.change .vxe-table .vxe-table--body .vxe-body--row .add .vxe-cell {
  color: red;
}
.change .vxe-table .vxe-table--body .vxe-body--row .reduce .vxe-cell {
  color: green;
}
.change .vxe-table .vxe-table--body .vxe-body--row .spliceBorder {
  border-right: 1px solid #293143;
}
</style>
