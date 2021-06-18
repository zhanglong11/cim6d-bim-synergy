<!--
 * @Description: 
 * @Version: 
 * @Autor: 
 * @Date: 2020-02-26 10:31:25
 * @LastEditTime: 2020-03-03 14:03:11

@任务名称: 2623/BIM协同-进度视图前端绑定
@开发人员: 董渊海
@修改日期: 2020-03-18
@任务类型: 修改代码，调整计划列表接口对接、签证详情接口对接，修改比例(70%)

@任务名称: 2623/BIM协同-进度视图前端绑定
@开发人员: 董渊海
@修改日期: 2020-03-19
@任务类型: 修改代码，对接进度变更(计划A,B对比)接口，饼图数据渲染，调整计划添加对比功能，修改比例(80%)

@bug名称: 1681/BIM协同-进度变更-见下图，多了‘质量’两个字
@开发人员: 董渊海
@修改日期: 2020-04-16
@任务类型: 修改代码，修复该bug，修改比例(80%)

@bug名称: 1958/进度视图-进度变更-没有签证时，点击不要跳转
@开发人员: 董渊海
@修改日期: 2020-04-30
@任务类型: 修改代码，修复该bug，修改比例(5%)
 -->
<template>
  <div>
    <div class="m-h aside-right clearfix" v-if="!detailsFlag">
      <Block title="调整计划" sub-title="Adjustment plan">
        <div>
          <el-input v-model="search" placeholder="请输入">
            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
          </el-input>
        </div>
        <vxe-grid class="adjustment-plan" show-overflow :data="tableData" :columns="columns" highlight-current-row @current-change="currentChange"></vxe-grid>
      </Block>
      <Block title="变更详情" sub-title="cost">
        <highcharts :options="options"></highcharts>
        <!-- <Echarts ref="treeCalculate" :height="300" id-select="treeCalculate" :option="option" /> -->
      </Block>
    </div>
    <div class="m-h aside-right clearfix" v-if="detailsFlag">
      <Details @goBack="detailsFlag = false" :visa="visa" />
    </div>
    <!-- 底部table -->
    <div :class="['bottom-table', down ? 'turn-down' : '']">
      <div style="text-align:right">
        <span :class="down ? 'down' : 'up'" style="cursor: pointer;" @click="turnDown"
          ><i class="el-icon-arrow-up"></i
        ></span>
      </div>
      <!--<BottomTable />-->
      <BottomTable2 :taskList="taskList" />
    </div>
  </div>
</template>

<script>
//import BottomTable from './components/bottomTable'
import BottomTable2 from './components/bottomTable2'
import Details from './components/details'
import Api from '@/api/schedule'
export default {
  components: {
    //BottomTable,
    BottomTable2,
    Details
  },
  data() {
    return {
      search: '',
      down: false,
      detailsFlag: false,
      aId: null,
      bId: null,
      visa: {},
      tableData: [],
      taskList: [],
      columns: [
        /*{
          type: 'seq',
          title: '序号'
        },*/
        {
          field: 'planNum',
          title: '调整编号'
        },
        {
          field: 'planName',
          title: '调整名称'
        },
        {
          field: 'createTime',
          title: '调整日期'
        },
        {
          field: 'visaName',
          title: '签证名称',
          slots: {
            default: ({ row }) => {
              return [row.visaName ? row.visaName : '-']
            }
          }
        },
        {
          title: '选择',
          slots: {
            default: ({ row }) => {
              /*let A = (
                <el-button type="text" onClick={(e) => {
                  e.stopPropagation()
                  this.compareA(row.id, row)
                }}>
                  A
                </el-button>
              )
              let B = (
                <el-button type="text" onClick={(e) => {
                  e.stopPropagation()
                  this.compareB(row.id, row)
                }}>
                  B
                </el-button>
              )*/

              let A = null
              if (row.id === this.aId) {
                A = <span class="compareBtn curBtn" onClick={(e) => {
                  e.stopPropagation()
                  this.compareA(row.id, row)
                }}>A</span>
              } else {
                A = <span class="compareBtn" onClick={(e) => {
                  e.stopPropagation()
                  this.compareA(row.id, row)
                }}>A</span>
              }

              let B = null
              if (row.id === this.bId) {
                B = <span class="compareBtn curBtn" onClick={(e) => {
                  e.stopPropagation()
                  this.compareB(row.id, row)
                }}>B</span>
              } else {
                B = <span class="compareBtn" onClick={(e) => {
                  e.stopPropagation()
                  this.compareB(row.id, row)
                }}>B</span>
              }

              return [A, B]
            }
          }
        }
      ],
      options: null
    }
  },
  created() {
    this.getList()
    this.options = this.getOptions(0, 0)
  },
  methods: {
    async getList() {
      let data = {
        search: this.search,
        projectId: localStorage.getItem('projectId'),
        status: 2,
        page: 1,
        rows: 10000
      }
      let res = await Api.getPlanList(data)
      this.tableData = res.data.records
      this.aId = null
      this.bId = null
    },
    handleSearch() {
      this.getList()
    },
    turnDown() {
      this.down = !this.down
    },
    getOptions(planDurationA, planDurationB) {
      return {
        chart: {
          type: 'pie',
                  options3d: {
            enabled: true,
                    alpha: 50,
                    beta: 0
          },
          height: 200,
                  width: 350,
                  backgroundColor: 'rgba(0,0,0,0)'
        },
        legend: {
          align: 'right',
                  labelFormat:
          '<span style="color:#8098ac;">{name} </span>' + '<span style="color:#218cef;font-size: 16px;"> {y}</span>',
                  layout: 'vertical',
                  verticalAlign: 'middle',
                  itemMarginTop: 15,
                  itemStyle: {
            fontSize: '14px'
          }
        },
        title: null,
                tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 50,
                    dataLabels: {
              enabled: false,
                      format: '{point.name}'
            },
            showInLegend: true
          }
        },
        tooltip: {
          headerFormat: '{series.name}<br>',
          pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
        },
        series: [
          {
            type: 'pie',
            name: '',
            data: [
              {
                name: '计划A工期',
                y: planDurationA,
                color: '#30AEDC'
              },
              {
                name: '计划B工期',
                y: planDurationB,
                color: '#CCC646'
              }
            ]
          }
        ]
      }
    },
    compareA(id) {
      //console.log('a')
      this.aId = id
      this.compareFun()
    },
    compareB(id) {
      //console.log('b')
      this.bId = id
      this.compareFun()
    },
    compareFun() {
      if (this.aId !== null && this.bId !== null) {
        if (this.aId === this.bId) {
          this.$message.error('请选择不同行的数据进行对比')
        } else {
          Api.comparePlanAplanB(this.aId, this.bId).then(res => {
            //console.log(res)
            //饼图数据渲染
            this.options = this.getOptions(res.data.planDurationA, res.data.planDurationB)

            //底部对比表格数据渲染
            let taskList = res.data.taskList
            if (taskList && taskList.length) {
              this.taskList = taskList
            }
          })
        }
      }
    },
    currentChange({ row }, e) {
      //console.log(row)
      let visa = {}
      if (row.visaId) {
        Api.getVisaDetail(row.visaId).then(res => {
          //console.log(res)
          if (res.data) {
            visa = res.data
          }
          this.detailsFlag = true
          this.visa = visa
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.compareBtn {
  padding: 2px 6px;
  margin: 0px 2px;
  cursor: pointer;
  color: #85add2;
  border-radius: 2px;
}
.curBtn {
  background: #5ea0e9;
  color: #0b253d;
}
.adjustment-plan {
  /deep/ .vxe-body--row.row--current {
    background: none;//#e6f7ff
  }
}
</style>
