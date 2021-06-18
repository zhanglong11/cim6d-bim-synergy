<!--
 * @Description: 成本变更
 * @Version:
 * @Autor:
 * @Date: 2020-02-24 15:38:30
 * @LastEditTime: 2020-03-03 13:57:53
 -->
<template>
  <div>
    <div class="m-h aside-right clearfix" v-if="!detailsFlag">
      <Block title="成本指标" sub-title="cost" class="m-h-top">
        <div class="title-btn">
          <el-button @click="getChangeNormBudget">合同预算</el-button>
          <el-button @click="getChangeNormCalculate">成本测算</el-button>
        </div>
        <div>
          <el-input v-model="keyWords" placeholder="请输入">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <vxe-grid :data="tableData" :columns="columns"></vxe-grid>
      </Block>
      <Block title="成本明细" sub-title="cost">
        <div class="m-h-bottom">
          <div class="flex">
            <div>
              变更项目<span>{{ changeDetail.project }}</span
              >项
            </div>
            <div>
              增加<span class="add">{{ changeDetail.countbUp }}</span
              >项
            </div>
            <div>
              减少<span class="reduce">{{ changeDetail.countDn }}</span
              >项
            </div>
          </div>
          <highcharts :options="qualityChartOptions"></highcharts>
          <!-- <Echarts ref="treeCalculate" :height="300" id-select="treeCalculate" :option="option" /> -->
        </div>
      </Block>
    </div>
    <div class="m-h aside-right clearfix" v-if="detailsFlag">
      <Details @goBack="detailsFlag = false" :siteAccessId="siteAccessId" />
    </div>

    <!-- 底部的table -->
    <div :class="['bottom-table', down ? 'turn-down' : '']">
      <div style="text-align:right">
        <span :class="down ? 'down' : 'up'" style="cursor: pointer;" @click="turnDown"
          ><i class="el-icon-arrow-up"></i
        ></span>
      </div>
      <BottomTable :costIdA="costIdA" :costIdB="costIdB" />
    </div>
  </div>
</template>

<script>
import Api from '@/api/cost/change'
import Details from './details'
import BottomTable from './bottomTable'
export default {
  components: {
    BottomTable,
    Details
  },
  data() {
    return {
      costIdA: '',
      costIdB: '',
      siteAccessId: '',
      projectId: localStorage.getItem('projectId') || '01b2a1d7857d476fbf3efdfce1d5dea1',
      down: false,
      detailsFlag: false,
      columns: [
        {
          field: 'code',
          title: '调整编号'
        },
        {
          field: 'name',
          title: '调整名称'
        },
        {
          field: 'createTime',
          title: '调整日期'
        },
        {
          title: '签证名称',
          slots: {
            default: ({ row }) => {
              let A = (
                <el-button type="text" onClick={() => this.toDetail(row.accessId)}>
                  {row.accessName ? row.accessName : '-'}
                </el-button>
              )
              return [A]
            }
          }
        },
        {
          title: '选择',
          slots: {
            default: ({ row }) => {
              // let A = (
              //   <el-button type="text" onClick={() => this.selectAB(row.id, 'A')}>
              //     A
              //   </el-button>
              // )
              // let B = (
              //   <el-button type="text" onClick={() => this.selectAB(row.id, 'B')}>
              //     B
              //   </el-button>
              // )
              let A = null
              if (row.id === this.costIdA) {
                A = (
                  <span
                    class="compareBtn curBtn"
                    onClick={e => {
                      e.stopPropagation()
                      this.selectAB(row.id, 'A')
                    }}
                  >
                    A
                  </span>
                )
              } else {
                A = (
                  <span
                    class="compareBtn"
                    onClick={e => {
                      e.stopPropagation()
                      this.selectAB(row.id, 'A')
                    }}
                  >
                    A
                  </span>
                )
              }

              let B = null
              if (row.id === this.costIdB) {
                B = (
                  <span
                    class="compareBtn curBtn"
                    onClick={e => {
                      e.stopPropagation()
                      this.selectAB(row.id, 'B')
                    }}
                  >
                    B
                  </span>
                )
              } else {
                B = (
                  <span
                    class="compareBtn"
                    onClick={e => {
                      e.stopPropagation()
                      this.selectAB(row.id, 'B')
                    }}
                  >
                    B
                  </span>
                )
              }

              return [A, ' |', B]
            }
          }
        }
      ],
      tableData: [],
      keyWords: '',
      changeDetail: {
        project: 0,
        countbUp: 0,
        countDn: 0
      },
      qualityChartOptions: null
    }
  },
  created() {
    // this.qualityChartOptions = this.getOptions(0, 0, 0)
    this.qualityChartOptions = this.getOptions(1, 1, 2)
    this.getChangeNormBudget()
  },
  methods: {
    selectAB(id, type) {
      if (type === 'A') {
        this.costIdA = id
      } else {
        this.costIdB = id
      }
      this.getChangeDetail()
    },
    async getChangeNormBudget() {
      let res = await Api.getChangeNormBudget(this.projectId)
      this.tableData = res.data
      this.costIdA = null
      this.costIdB = null
    },
    async getChangeNormCalculate() {
      let res = await Api.getChangeNormCalculate(this.projectId)
      this.tableData = res.data
      this.costIdA = null
      this.costIdB = null
    },
    getChangeDetail() {
      if (this.costIdA !== null && this.costIdB !== null) {
        if (this.costIdA === this.costIdB) {
          this.$message.error('请选择不同行的数据进行对比')
        } else {
          /* Api.getChangeDetail({
            projectId: this.projectId,
            costIdA: this.costIdA,
            costIdB: this.costIdB
          }).then(res => {
             this.changeDetail = res.data
            this.qualityChartOptions = this.getOptions(res.data.quantity, res.data.unitPrice, res.data.combinedPrice)
          })*/
          this.changeDetail = {
            project: 2,
            countbUp: 0,
            countDn: 0
          }
        }
      }
    },
    getOptions(quantity, unitPrice, combinedPrice) {
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
        series: [
          {
            type: 'pie',
            name: '质量',
            data: [
              {
                name: '"数量"变更数',
                y: quantity,
                color: '#30AEDC'
              },
              {
                name: '"单价"变更数',
                y: unitPrice,
                color: '#CCC646'
              },

              {
                name: '"合价"变更数',
                y: combinedPrice,
                color: '#18C1AA'
              }
            ]
          }
        ]
      }
    },
    turnDown() {
      this.down = !this.down
    },
    toDetail(id) {
      this.siteAccessId = id
      this.detailsFlag = true
    }
  }
}
</script>

<style lang="less" scoped>
.m-h-top {
  height: calc(50vh - 110px);
  overflow-y: scroll;
}
.m-h-bottom {
  height: calc(50vh - 70px);
  overflow-y: scroll;
}
.aside-right {
  float: right;
  width: 400px;
}
.flex {
  display: flex;
  justify-content: space-around;
  padding: 12px 20px;
  div {
    text-align: center;
    width: 100%;
    span {
      color: #dcc51d;
      padding: 0 4px;
    }
    .add {
      color: rgb(16, 180, 122);
    }
    .reduce {
      color: #f84a1c;
    }
  }
}
.title-btn {
  text-align: right;
  margin-bottom: 10px;
}
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
</style>
