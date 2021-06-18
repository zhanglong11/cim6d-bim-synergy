<!--
 * @Description: 趋势图
 * @Version:
 * @Autor:
 * @Date: 2020-02-24 16:15:41
 * @LastEditTime: 2020-03-23 17:10:01
 -->
<template>
  <div>
    <div class="search" style="height: 35px">
      <el-form inline :model="form">
        <div class="flex">
          <div>
            <!--
        /**
        任务名称：2621/BIM协同成本趋势+成本三算绑定
        开发人员：崔洛宜
        日期：2020-3-19
        任务类型：远行修改,注释掉选择下拉框
        **/
        -->
            <el-form-item label="选择工期">
              <el-select v-model="form.scheduleType" style="width:100px">
                <el-option label="实际工期" value="actual"></el-option>
                <el-option label="计划工期" value="plan"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker
                v-model="form.date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="刻度单位">
              <!--
       /**
       任务名称：2621/BIM协同成本趋势+成本三算绑定
       开发人员：崔洛宜
       日期：2020-3-19
       任务类型：修改刻度下拉框
       **/
       -->
              <el-select v-model="form.scaleUnit" style="width:100px">
                <el-option label="月" value="month"></el-option>
                <el-option label="周" value="week"></el-option>
                <el-option label="日" value="day"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="onSubmit">查询</el-button>
            </el-form-item>
          </div>
          <div>
            <el-form-item>
              <!--
                  /**
                   任务名称：2739/进度模拟播放器刻度关联
                   开发人员：崔洛宜
                   日期：2020-3-26
                   任务类型：进度模拟播放器刻度关联
                   **/
              -->
              <el-select v-model="playSpeed" :style="{ width: '70px' }">
                <el-option v-for="speed in [1, 2, 4, 8, 16]" :key="speed" :value="speed" :label="`${speed}X`"
                  >{{ speed }}X</el-option
                >
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="start">开始模拟</el-button>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
    <div>
      <DateTickBar
        ref="bar"
        :start="form.startTime"
        :end="form.endTime"
        :scaleUnit="form.scaleUnit"
        :width="width"
        @tickChange="dateTickChangeHandle"
      />
    </div>
    <div>
      <!--      <Echarts ref="TreedImg" :height="300" idSelect="TreedImg" :option="option" />-->
      <Echarts ref="TreedImg" :height="160" idSelect="TreedImg" :option="option" />
    </div>
  </div>
</template>

<script>
// import { LinearGradient } from 'echarts/src/util/graphic'
import DateTickBar from '@/components/TickProgressBar/DateTickBar'
import Api from '@/api/cost/trending'
import ProjectSelect from '@/components/ProjectSelect'
export default {
  components: {
    DateTickBar,
    ProjectSelect
  },
  data() {
    return {
      /**
       任务名称：2739/进度模拟播放器刻度关联
       开发人员：崔洛宜
       日期：2020-3-26
       任务类型：进度模拟播放器刻度关联
       **/
      playSpeed: 1,
      width: null,
      form: {
        //date: [],
        date: ['2015-08-01 00:00:00', '2018-05-31 00:00:00'],
        scaleUnit: 'month',
        scheduleType: 'actual',
        statisType: 1, //统计类型 1：累计，2：周期
        /*startTime: null,
        endTime: null*/
        startTime: '2015-08-01 00:00:00',
        endTime: '2018-05-31 00:00:00'
      },
      chartData: [],
      option: {
        // 网格
        grid: {
          left: 50,
          top: 50,
          right: 20,
          bottom: 20,
          containLabel: true
        },
        // 提示框
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          show: true,
          x: 'right',
          textStyle: {
            color: '#687E91'
          }
        },
        xAxis: {
          type: 'category',
          // 坐标轴两边留白策略
          boundaryGap: false,
          // x轴字体颜色
          axisLabel: {
            textStyle: {
              color: '#1A4876'
            }
          },
          // x轴线的颜色
          axisLine: {
            lineStyle: {
              color: '#13365C'
            }
          },
          data: []
        },
        yAxis: {
          type: 'value',
          // y轴字体颜色
          axisLabel: {
            textStyle: {
              color: '#1A4876'
            }
          },
          // y轴线的颜色
          axisLine: {
            lineStyle: {
              color: '#13365C'
            }
          },
          // 分割线参数
          splitLine: {
            show: true,
            lineStyle: {
              color: '#13365C'
            }
          }
        },
        series: [
          {
            name: '合同预算',
            type: 'line',
            stack: '总量1',
            symbol: 'none',
            itemStyle: {
              normal: {
                color: '#0CD2B9',
                lineStyle: {
                  color: '#0CD2B9',
                  width: 1
                }
              }
            },
            data: []
          },
          {
            name: '测算成本',
            type: 'line',
            stack: '总量2',
            symbol: 'none',
            itemStyle: {
              normal: {
                color: '#5E9CBD',
                lineStyle: {
                  color: '#5E9CBD',
                  width: 1
                }
                // areaStyle: {
                //   color: new LinearGradient(0, 1, 0, 0, [
                //     {
                //       offset: 0,
                //       color: '#5E9CBD'
                //     },
                //     {
                //       offset: 1,
                //       color: 'rgba(0,0,0,0)'
                //     }
                //   ])
                // }
              }
            },
            data: []
          },
          {
            name: '核算成本',
            type: 'line',
            stack: '总量3',
            symbol: 'none',
            itemStyle: {
              normal: {
                color: '#F8B264',
                lineStyle: {
                  color: '#F8B264',
                  width: 1
                }
              }
            },
            data: []
          }
        ]
      },
      startDate: moment()
        .startOf('year')
        .format('YYYY-MM-DD'),
      endDate: moment()
        .endOf('year')
        .format('YYYY-MM-DD')
    }
  },
  watch: {
    'form.date': {
      handler: function(n) {
        if (n && n[0] !== null) {
          this.form.startTime = moment(n[0]).format('YYYY-MM-DD 00:00:00')
          this.form.endTime = moment(n[1]).format('YYYY-MM-DD 00:00:00')
          // this.form.startTime = moment('20190312').format('YYYY-MM-DD HH:MM:SS')
          // this.form.endTime = moment('20200315').format('YYYY-MM-DD HH:MM:SS')
        } else {
          this.form = { ...this.form, startTime: null }
          this.form = { ...this.form, endTime: null }
        }
      }
    },
    /**
     任务名称：2739/进度模拟播放器刻度关联
     开发人员：崔洛宜
     日期：2020-3-26
     任务类型：进度模拟播放器刻度关联
     **/
    playSpeed(val) {
      this.$refs.bar.handlePlaySpeedChange(val)
    }
  },
  mounted() {
    this.width = window.innerWidth - 780
    //this.$refs.bar.initBar()
  },
  methods: {
    /**
     任务名称：2621/BIM协同成本趋势+成本三算绑定
     开发人员：崔洛宜
     日期：2020-3-17
     任务类型：开始播放事件,获取charts接口
     **/
    /**
     任务名称：2621/BIM协同成本趋势+成本三算绑定
     开发人员：崔洛宜
     日期：2020-3-20
     任务类型：修改echart数据
     **/
    /**
     任务名称：2533 | 模拟时模型跟着变化
     开发人员：申豪强
     日期：2020-3-23
     任务类型：新增代码
     **/
    //  模拟时，模型跟着改变
    modelChangeByGuid(list) {
      let bimfishApp = this.$store.state.bim.bimfishApp
      bimfishApp.hideAll()
      bimfishApp.show(list)
    },
    async onSubmit(flag = true) {
      /**
       任务名称：2621/BIM协同成本趋势+成本三算绑定
       开发人员：崔洛宜
       日期：2020-3-23
       任务类型：传递form参数
       **/
      /**
      任务名称：BUG#1339/进度模拟播放器初始化问题
      开发人员：崔洛宜
      日期：2020-3-27
      任务类型：进度模拟播放器初始化问题
      **/
      if (!this.form.startTime || !this.form.endTime) {
        this.$message.error('请选择起始时间')
        return false
      }
      this.$refs.bar.initBar()
      this.$refs.bar.handleBackToStart()
      this.$emit('queryData', this.form)
      let chartData = await Api.getChartsData({
        ...this.form,
        step: ['day', 'week', 'month'].indexOf(this.form.scaleUnit) + 1
        //scaleUnit: 2
      })
      let data = chartData.data
      this.chartData = data
      // let xArr = Object.keys(data)
      if (!flag) {
        let xArr = []
        let incomeArr = []
        let budgetCostArr = []
        let realCostArr = []
        data.map(item => {
          xArr.push(item.key)
          incomeArr.push(item.actualTotalBudgetAmount)
          budgetCostArr.push(item.actualTotalCalculateAmount)
          realCostArr.push(item.actualTotalRealAmount)
        })
        this.option = {
          // 提示框
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            show: true,
            x: 'right',
            textStyle: {
              color: '#687E91'
            }
          },
          // 网格
          grid: {
            left: 50,
            top: 20,
            right: 20,
            bottom: 10,
            containLabel: true
          },
          xAxis: {
            type: 'category',
            // 坐标轴两边留白策略
            boundaryGap: false,
            // x轴字体颜色
            axisLabel: {
              textStyle: {
                color: '#1A4876'
              }
            },
            // x轴线的颜色
            axisLine: {
              lineStyle: {
                color: '#13365C'
              }
            },
            data: xArr
          },
          yAxis: {
            type: 'value',
            // y轴字体颜色
            axisLabel: {
              textStyle: {
                color: '#1A4876'
              }
            },
            // y轴线的颜色
            axisLine: {
              lineStyle: {
                color: '#13365C'
              }
            },
            // 分割线参数
            splitLine: {
              show: true,
              lineStyle: {
                color: '#13365C'
              }
            }
          },
          series: [
            {
              name: '合同预算',
              type: 'line',
              stack: '总量1',
              symbol: 'none',
              itemStyle: {
                normal: {
                  color: '#0CD2B9',
                  lineStyle: {
                    color: '#0CD2B9',
                    width: 1
                  }
                }
              },
              data: incomeArr
            },
            {
              name: '测算成本',
              type: 'line',
              stack: '总量2',
              symbol: 'none',
              itemStyle: {
                normal: {
                  color: '#5E9CBD',
                  lineStyle: {
                    color: '#5E9CBD',
                    width: 1
                  }
                  // areaStyle: {
                  //   color: new LinearGradient(0, 1, 0, 0, [
                  //     {
                  //       offset: 0,
                  //       color: '#5E9CBD'
                  //     },
                  //     {
                  //       offset: 1,
                  //       color: 'rgba(0,0,0,0)'
                  //     }
                  //   ])
                  // }
                }
              },
              data: budgetCostArr
            },
            {
              name: '核算成本',
              type: 'line',
              stack: '总量3',
              symbol: 'none',
              itemStyle: {
                normal: {
                  color: '#F8B264',
                  lineStyle: {
                    color: '#F8B264',
                    width: 1
                  }
                }
              },
              data: realCostArr
            }
          ]
        }
      }
    },

    async start() {
      /**
       任务名称：2621/BIM协同成本趋势+成本三算绑定
       开发人员：崔洛宜
       日期：2020-3-20
       任务类型：点击模拟的逻辑
       **/
      /**
       任务名称：2739/进度模拟播放器刻度关联
       开发人员：崔洛宜
       日期：2020-3-26
       任务类型：进度模拟播放器刻度关联
       **/
      let aa = await this.onSubmit(true)
      if (aa === false) {
        return
      }
      this.$refs.bar.handleBackToStart()
      this.$refs.bar.handleForwardPlay()
    },
    dateTickChangeHandle(e, date) {
      /**
      任务名称：2621/BIM协同成本趋势+成本三算绑定
      开发人员：崔洛宜
      日期：2020-3-20
      任务类型：根据模拟时间修改echart数据
      **/
      let data = this.chartData
      let xArr = []
      let incomeArr = []
      let budgetCostArr = []
      let realCostArr = []
      data.map(item => {
        xArr.push(item.key)
        if (moment(item.key).isBefore(moment(date)) || moment(item.key).isSame(moment(date))) {
          incomeArr.push(item.actualTotalBudgetAmount)
          budgetCostArr.push(item.actualTotalCalculateAmount)
          realCostArr.push(item.actualTotalRealAmount)
        }
      })
      this.option = {
        // 提示框
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          show: true,
          x: 'right',
          textStyle: {
            color: '#687E91'
          }
        },
        // 网格
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          // 坐标轴两边留白策略
          boundaryGap: false,
          // x轴字体颜色
          axisLabel: {
            textStyle: {
              color: '#1A4876'
            }
          },
          // x轴线的颜色
          axisLine: {
            lineStyle: {
              color: '#13365C'
            }
          },
          data: xArr
        },
        yAxis: {
          type: 'value',
          // y轴字体颜色
          axisLabel: {
            textStyle: {
              color: '#1A4876'
            }
          },
          // y轴线的颜色
          axisLine: {
            lineStyle: {
              color: '#13365C'
            }
          },
          // 分割线参数
          splitLine: {
            show: true,
            lineStyle: {
              color: '#13365C'
            }
          }
        },
        series: [
          {
            name: '合同预算',
            type: 'line',
            stack: '总量1',
            symbol: 'none',
            itemStyle: {
              normal: {
                color: '#0CD2B9',
                lineStyle: {
                  color: '#0CD2B9',
                  width: 1
                }
              }
            },
            data: incomeArr
          },
          {
            name: '测算成本',
            type: 'line',
            stack: '总量2',
            symbol: 'none',
            itemStyle: {
              normal: {
                color: '#5E9CBD',
                lineStyle: {
                  color: '#5E9CBD',
                  width: 1
                }
                // areaStyle: {
                //   color: new LinearGradient(0, 1, 0, 0, [
                //     {
                //       offset: 0,
                //       color: '#5E9CBD'
                //     },
                //     {
                //       offset: 1,
                //       color: 'rgba(0,0,0,0)'
                //     }
                //   ])
                // }
              }
            },
            data: budgetCostArr
          },
          {
            name: '核算成本',
            type: 'line',
            stack: '总量3',
            symbol: 'none',
            itemStyle: {
              normal: {
                color: '#F8B264',
                lineStyle: {
                  color: '#F8B264',
                  width: 1
                }
              }
            },
            data: realCostArr
          }
        ]
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
</style>
