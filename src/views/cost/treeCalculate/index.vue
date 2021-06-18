<!--
 * @Description: 成本三算
 * @Version:
 * @Autor:
 * @Date: 2020-02-24 15:38:01
 * @LastEditTime: 2020-03-03 13:56:43
 -->
<template>
  <div>
    <div class="m-h aside-right clearfix">
      <!-- <Block title="工程划分" sub-title="cost">
        <div>
          <el-input v-model="keyWords" placeholder="请输入">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div class="tree">
          <el-tree
            ref="tree"
            default-expand-all
            :data="treeData"
            :props="defaultProps"
            @node-click="handleNodeClick"
            :filter-node-method="filterNode"
          >
            <span slot-scope="{ node, data }">
              <span :class="'type' + data.type"> {{ data.label }} </span>
            </span>
          </el-tree>
        </div>
      </Block>-->
      <Block title="成本明细" sub-title="cost" class="tableWrapper">
        <vxe-grid :data="tableData" :columns="columns"></vxe-grid>
      </Block>
    </div>

    <!-- 底部的table -->
    <div :class="['bottom-table', down ? 'turn-down' : '']">
      <!--<div style="text-align:right">
        <span :class="down ? 'down' : 'up'" style="cursor: pointer;" @click="turnDown"
          ><i class="el-icon-arrow-up"></i
        ></span>
      </div>-->
      <el-button @click="handleSelectScheduleList">选择进度计划</el-button>
      <Echarts ref="treeCalculate" :height="250" id-select="treeCalculate" :option="option" @click="handleChartClick" />
    </div>
    <!--
        /**
     任务名称：TASK#2898  3月16日注释
     开发人员：崔洛宜
     日期：2020-03-16
     任务类型：注释(添加选择进度弹窗)
     **/
    -->
    <ScheduleListDialog
      v-if="scheduleListDialogVisible"
      :visible="scheduleListDialogVisible"
      @close="scheduleListDialogVisible = false"
      @submit="handleSubmit"
    ></ScheduleListDialog>
  </div>
</template>

<script>
import Api from '@/api/cost/calculate'
import ScheduleListDialog from './ScheduleListDialog'
export default {
  components: { ScheduleListDialog },
  data() {
    return {
      down: false,
      scheduleListDialogVisible: false,
      scheduleId: null,
      /**
       任务名称：2621/BIM协同成本趋势+成本三算绑定
       开发人员：崔洛宜
       日期：2020-3-19
       任务类型：1、修改单选为多选,修改表格查询逻辑
       **/
      scheduleIdArr: [],
      projectCostQueryData: [],
      clickChartsType: [],
      /**
       任务名称：2621/BIM协同成本趋势+成本三算绑定
       开发人员：崔洛宜
       日期：2020-3-17
       任务类型：修改列数据
       **/
      /**
       任务名称：BUG 1228/成本明细列换行(添加滚动条)
       开发人员：崔洛宜
       日期：2020-03-20
       BUG类型：
       测试人员提出的系统性BUG
       **/
      columns: [
        {
          type: 'seq',
          title: '序号',
          width: 60
        },
        {
          field: 'itemCode',
          title: '项目编码',
          width: 120
        },
        {
          field: 'itemName',
          title: '项目名称',
          width: 120
        },
        {
          field: 'income',
          title: '合同收入',
          width: 120
        },
        {
          field: 'budgetCost',
          title: '预算成本',
          width: 120
        },
        {
          field: 'realCost',
          title: '实际成本',
          width: 120
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // type：1为红色，2为浅蓝色
      treeData: [
        {
          label: '一级 1',
          type: '1',
          children: [
            {
              label: '二级 1-1',
              type: '2',
              children: [
                {
                  label: '三级 1-1-1',
                  type: '1'
                }
              ]
            }
          ]
        }
      ],
      tableData: [],
      keyWords: '',
      option: {
        grid: {
          left: 50,
          top: 50,
          right: 20,
          bottom: 20
        },
        // 图例样式
        legend: {
          x: 'right',
          textStyle: {
            color: '#687E91'
          },
          data: ['合同收入', '预算成本', '实际成本']
        },
        tooltip: {},
        // dataset: {
        //   source: [
        //     // ['product', '2015', '2016', '2017'],
        //     ['人工费', 43.3, 85.8, 93.7],
        //     ['材料费', 83.1, 73.4, 55.1],
        //     ['机械费', 86.4, 65.2, 82.5],
        //     ['专业分包工程', 72.4, 53.9, 39.1]
        //   ]
        // },
        xAxis: {
          data: ['人工费', '材料费', '机械费', '项目经费'],
          type: 'category', // x轴字体颜色
          axisLabel: {
            textStyle: {
              color: '#1A4876'
            }
          },
          // x轴线的颜色
          axisLine: {
            lineStyle: {
              color: '#2F76C0'
            }
          }
        },
        yAxis: {
          /**
           任务名称：BUG 1228/纵轴缺少单位万
           开发人员：崔洛宜
           日期：2020-03-20
           BUG类型：
            测试人员提出的系统性BUG
           **/
          name: '万',
          nameTextStyle: {
            color: '#a5c8e7'
          },
          // y轴字体颜色
          axisLabel: {
            textStyle: {
              color: '#1A4876'
            }
          },
          // y轴线的颜色
          axisLine: {
            lineStyle: {
              color: '#2F76C0'
            }
          },
          // 分割线参数
          splitLine: {
            show: true,
            lineStyle: {
              color: '#2F76C0'
            }
          }
        },
        series: [
          {
            name: '合同收入',
            type: 'bar',
            barWidth: '10%',
            itemStyle: {
              normal: {
                color: '#0FC0C4'
              }
            },
            data: [0, 0, 0]
          },
          {
            name: '预算成本',
            type: 'bar',
            barWidth: '10%',
            itemStyle: {
              normal: {
                color: '#0F99BD'
              }
            },
            data: [0, 0, 0]
          },
          {
            name: '实际成本',
            type: 'bar',
            barWidth: '10%',
            itemStyle: {
              normal: {
                color: '#094D6A'
              }
            },
            data: [0, 0, 0]
          }
        ]
      }
    }
  },
  mounted() {},
  watch: {
    keyWords(val) {
      this.$refs.tree.filter(val)
    },
    /**
     任务名称：2621/BIM协同成本趋势+成本三算绑定
     开发人员：崔洛宜
     日期：2020-3-19
     任务类型：1、修改单选为多选
     **/
    /* scheduleId(val) {
      console.log(val)
      this.getCostChartList(val)
      this.getCostDetailList(val)
    },*/
    scheduleIdArr(val) {
      this.getCostChartList()
    }
  },
  created() {
    //this.getCostChartList()
    //this.getCostDetailList()
  },
  methods: {
    turnDown() {
      this.down = !this.down
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleNodeClick(e) {
      console.log(e)
    },
    /**
       任务名称：2621/BIM协同成本趋势+成本三算绑定
       开发人员：崔洛宜
       日期：2020-3-16
       任务类型：新增接口对接信息51,240-283
       **/
    /**
     任务名称：2621/BIM协同成本趋势+成本三算绑定
     开发人员：崔洛宜
     日期：2020-3-17
     任务类型：修改结束的数据
     **/
    //成本明细
    getCostDetailList() {
      /**
       任务名称：2621/BIM协同成本趋势+成本三算绑定
       开发人员：崔洛宜
       日期：2020-3-19
       任务类型：1、修改查询列表详情参数
       **/
      Api.getCostDetailList({ scheduleIds: this.scheduleIdArr, types: this.clickChartsType }).then(res => {
        this.tableData = res.data
      })
      /*this.tableData = [
        { itemCode: '010103001001', itemName: '回填方', income: 5106.9, budgetCost: 4500.2, realCost: 4250.1 },
        { itemCode: 'Y010103002001', itemName: '原土打夯,碾压', income: 796.98, budgetCost: 600.1, realCost: 506.45 },
        {
          itemCode: '010201011001',
          itemName: '夯实水泥土桩',
          income: 281701.98,
          budgetCost: 245130.2,
          realCost: 246125.2
        },
        { itemCode: '010201017001', itemName: '褥垫层', income: 29297.21, budgetCost: 22465.21, realCost: 21463.2 },
        { itemCode: '010201017002', itemName: '褥垫层', income: 4496.42, budgetCost: 4126.52, realCost: 4023.52 },
        { itemCode: '010301004001', itemName: '截(凿)桩头', income: 29828.7, budgetCost: 21035.2, realCost: 20361.2 },
        { itemCode: '010301004002', itemName: '截(凿)桩头', income: 45922.05, budgetCost: 36576.21, realCost: 34512.9 },
        { itemCode: 'Y010202006001', itemName: 'CFG桩', income: 673084.63, budgetCost: 620543.2, realCost: 594352.3 },
        { itemCode: '010402001001', itemName: '砌块墙', income: 55483.01, budgetCost: 51221.2, realCost: 50247.3 }
      ]*/
    },

    /**
     任务名称：2621/BIM协同成本趋势+成本三算绑定
     开发人员：崔洛宜
     日期：2020-3-17
     任务类型：注释掉工程划分
     **/
    //工程划分
    /*getEngineerDivision() {
      Api.getEngineerDivision().then(res => {
        console.log(res)
      })
    },*/
    //获取数据charts数据
    /**
     任务名称：2621/BIM协同成本趋势+成本三算绑定
     开发人员：崔洛宜
     日期：2020-3-17
     任务类型：修改获取echarts接口
     **/
    /**
     任务名称：2621/BIM协同成本趋势+成本三算绑定
     开发人员：崔洛宜
     日期：2020-3-19
     任务类型：处理获取echarts数据
     **/
    async getCostChartList(val) {
      let res1 = await Api.getCostChartList(this.scheduleIdArr)
      let res2 = await Api.getProjectCost(this.projectCostQueryData)
      let incomeArr = []
      //预算成本
      let budgetCostArr = []
      //实际成本
      let realCostArr = []
      res1.data &&
        res1.data.map(item => {
          if (item.type === 1) {
            incomeArr[0] = item.income
            budgetCostArr[0] = item.budgetCost
            realCostArr[0] = item.realCost
          }
          if (item.type === 3) {
            incomeArr[2] = item.income
            budgetCostArr[2] = item.budgetCost
            realCostArr[2] = item.realCost
          }
          if ((item.type === 2) | (item.type === 6) | (item.type === 7)) {
            incomeArr[1] = incomeArr[1] ? incomeArr[1] + item.income : item.income
            budgetCostArr[1] = budgetCostArr[1] ? budgetCostArr[1] + item.budgetCost : item.budgetCost
            realCostArr[1] = realCostArr[1] ? realCostArr[1] + item.realCost : item.realCost
          }
        })
      let projectCost = res2.data[0]
      incomeArr[3] = projectCost.income
      budgetCostArr[3] = projectCost.budgetCost
      realCostArr[3] = projectCost.realCost

      this.option = {
        grid: {
          left: 50,
          top: 50,
          right: 20,
          bottom: 20
        },
        // 图例样式
        legend: {
          x: 'right',
          textStyle: {
            color: '#687E91'
          },
          data: ['合同收入', '预算成本', '实际成本']
        },
        tooltip: {},
        // dataset: {
        //   source: [
        //     // ['product', '2015', '2016', '2017'],
        //     ['人工费', 43.3, 85.8, 93.7],
        //     ['材料费', 83.1, 73.4, 55.1],
        //     ['机械费', 86.4, 65.2, 82.5],
        //     ['专业分包工程', 72.4, 53.9, 39.1]
        //   ]
        // },
        xAxis: {
          data: ['人工费', '材料费', '机械费', '项目经费'],
          type: 'category', // x轴字体颜色
          axisLabel: {
            textStyle: {
              color: '#1A4876'
            }
          },
          // x轴线的颜色
          axisLine: {
            lineStyle: {
              color: '#2F76C0'
            }
          }
        },
        yAxis: {
          name: '万',
          nameTextStyle: {
            color: '#2F76C0'
          },
          // y轴字体颜色
          axisLabel: {
            textStyle: {
              color: '#2F76C0'
            }
          },
          // y轴线的颜色
          axisLine: {
            lineStyle: {
              color: '#2F76C0'
            }
          },
          // 分割线参数
          splitLine: {
            show: true,
            lineStyle: {
              color: '#2F76C0'
            }
          }
        },
        series: [
          {
            name: '合同收入',
            type: 'bar',
            barWidth: '10%',
            itemStyle: {
              normal: {
                color: '#0FC0C4'
              }
            },
            data: incomeArr
            //data: [589.5, 1890.4, 450.2, 289.1]
          },
          {
            name: '预算成本',
            type: 'bar',
            barWidth: '10%',
            itemStyle: {
              normal: {
                color: '#0F99BD'
              }
            },
            data: budgetCostArr
            //data: [530.5, 1300.3, 210.33, 220.2]
          },
          {
            name: '实际成本',
            type: 'bar',
            barWidth: '10%',
            itemStyle: {
              normal: {
                color: '#094D6A'
              }
            },
            data: realCostArr
            //data: [535.5, 1220.3, 198.25, 205.1]
          }
        ]
      }
    },
    handleSelectScheduleList() {
      this.scheduleListDialogVisible = true
    },
    handleSubmit(data) {
      /**
       任务名称：2621/BIM协同成本趋势+成本三算绑定
       开发人员：崔洛宜
       日期：2020-3-19
       任务类型：1、修改单选为多选
       **/
      //projectCostQueryData
      this.projectCostQueryData = data.map(item => {
        return {
          endDate: item.actualEndTime,
          projectId: item.projectId,
          startDate: item.actualStartTime
        }
      })
      this.scheduleIdArr = data.map(item => item.id)
      this.scheduleListDialogVisible = false
    },
    /**
     任务名称：2621/BIM协同成本趋势+成本三算绑定
     开发人员：崔洛宜
     日期：2020-3-19
     任务类型：处理echarts点击事件
     **/
    handleChartClick(data) {
      console.log(data.name)
      switch (data.name) {
        case '人工费':
          this.clickChartsType = [1]
          break
        case '材料费':
          this.clickChartsType = [2, 6, 7]
          break
        case '机械费':
          this.clickChartsType = [3]
          break
        case '项目经费':
          this.clickChartsType = [5]
          break
        default:
          return false
      }
      this.getCostDetailList()
    }
  }
}
</script>

<style lang="less" scoped>
.aside-right {
  float: right;
  width: 400px;
}
.tree {
  .type1:after {
    content: '•';
    color: red;
  }
  .type2:after {
    content: '•';
    color: #356294;
  }
}
/**
      任务名称：BUG 1228/成本明细列换行(表格最大高度)
      开发人员：崔洛宜
      日期：2020-03-20
      BUG类型：
      测试人员提出的系统性BUG
      **/
.tableWrapper /deep/.vxe-table--body-wrapper {
  max-height: 400px;
  overflow: auto;
}
</style>
