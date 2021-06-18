<!--
 * @Description: 成本趋势
 * @Version:
 * @Autor:
 * @Date: 2020-02-24 15:35:55
 * @LastEditTime: 2020-03-03 13:55:51
 -->
<template>
  <div>
    <div class="m-h aside-right clearfix">
      <Block title="成本指标" sub-title="cost">
        <div class="ov">
          <header class="flex">
            <!--
                /**
               任务名称：TASK#2898  3月16日注释
               开发人员：崔洛宜
               日期：2020-03-16
               任务类型：注释(修改字段)
               **/
            -->
            <div>
              总盈亏<span>{{ profitLossTotal }}</span
              >万元
              <!--总盈亏<span>389.20</span>万元-->
            </div>
            <div>
              总节超<span>{{ superSectionTotal }}</span
              >万元
              <!--总节超<span>48.33</span>万元-->
            </div>
          </header>
          <Echarts ref="costIndex" :height="300" id-select="costIndex" :option="option" />
          <header class="flex">
            <div>
              本月盈亏<span>{{ profitLossMonth }}</span
              >万元
              <!--本月盈亏<span>0</span>万元-->
              <img src="../../../assets/up.png" alt="" width="12" height="16" style="vertical-align: middle" />{{
                profitLossMonthUD
              }}
            </div>
            <div>
              本月节超<span>{{ superSectionMonth }}</span
              >万元
              <!--本月节超<span>0</span>万元-->
              <img src="../../../assets/down.png" alt="" width="12" height="16" style="vertical-align: middle" />{{
                superSectionMonthUD
              }}
            </div>
          </header>
          <Echarts ref="monthIndex" :height="300" id-select="monthIndex" :option="optionMonth" />
        </div>
      </Block>
      <Block title="成本明细" sub-title="cost Details">
        <!--/**
             任务名称：BUG 1224/表格最大高度限制
             开发人员：崔洛宜
             日期：2020-03-20
             BUG类型：
             测试人员提出的系统性BUG
             **/-->
        <vxe-grid :data="tableData" :columns="columns" class="tableWrapper"></vxe-grid>
      </Block>
    </div>
    <!-- 底部的table -->
    <div :class="['bottom-table', down ? 'turn-down' : '']">
      <BlockTabs :list="titleList" :activeKey="activeKey" @change="changeTab" style="height: 100%">
        <!--
         /**
           任务名称：BUG 1225/ 智慧施工前台-成本视图-成本趋势-成本趋势图需要和时间轴、模型在同一个页面上，
                     不能下拉才能看到折线图
           开发人员：崔洛宜
           日期：2020-03-20
           BUG类型：
            测试人员提出的系统性BUG
           **/
           -->
        <!-- <span slot="btn" :class="down ? 'down' : 'up'" @click="turnDown"><i class="el-icon-arrow-up"></i></span>-->
        <!-- 成本趋势图 -->
        <!--
        /**
        任务名称：2621/BIM协同成本趋势+成本三算绑定
        开发人员：崔洛宜
        日期：2020-3-23
        任务类型：查询传递事件
        **/
        -->
        <TreedImg v-if="activeKey === 1" ref="aa" @queryData="handleQuery" />
        <!-- 成本趋势明细 -->
        <!--
        /**
        任务名称：2621/BIM协同成本趋势+成本三算绑定
        开发人员：崔洛宜
        日期：2020-3-16
        任务类型：修改传参
        **/
        -->
        <TreedDetails v-if="activeKey === 2" :tableData="tableDataDetail" />
      </BlockTabs>
    </div>
  </div>
</template>

<script>
import TreedImg from './components/TreedImg'
import TreedDetails from './components/TreedDetails'
import { LinearGradient } from 'echarts/src/util/graphic'
import Api from '@/api/cost/trending'
export default {
  components: {
    TreedImg,
    TreedDetails
  },
  /**
   任务名称：2621/BIM协同成本趋势+成本三算绑定
   开发人员：崔洛宜
   日期：2020-3-16
   任务类型：新增接口对接信息73-76
   **/
  data() {
    return {
      down: false,
      profitLossTotal: 0, //总盈亏
      superSectionTotal: 0, //总节超
      profitLossMonth: 0, //本月盈亏
      superSectionMonth: 0, //本月节超
      profitLossMonthUD: 0, //本月盈亏涨跌
      superSectionMonthUD: 0, //本月节超涨跌
      tableDataDetail: [], //成本趋势明细,
      tableData: [],
      columns: [
        /**
         任务名称：BUG 1224/表格列换行
         开发人员：崔洛宜
         日期：2020-03-20
         BUG类型：
         测试人员提出的系统性BUG
         **/
        {
          type: 'seq',
          title: '序号',
          width: 60
        },
        {
          field: 'projectNum',
          title: '项目编号',
          width: 120
        },
        {
          field: 'projectName',
          title: '项目名称',
          width: 120
        },
        {
          field: 'amount',
          title: '合同收入',
          width: 120
        },
        {
          field: 'budgetCombinedPrice',
          title: '预算成本',
          width: 120
        },
        {
          field: 'realCombinedPrice',
          title: '实际成本',
          width: 120
        }
      ],
      activeKey: 1,
      titleList: [
        {
          title: '成本趋势图',
          value: 1
        }
        /*{
          title: '成本趋势明细',
          value: 2
        }*/
      ],
      /**
       任务名称：2621/BIM协同成本趋势+成本三算绑定
       开发人员：崔洛宜
       日期：2020-3-19
       任务类型：处理接口返回的数据
       **/
      option: {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['总合同收入', '总预算成本', '总实际成本'],
          axisTick: {
            alignWithLabel: true
          }, // x轴字体颜色
          axisLabel: {
            textStyle: {
              color: '#235A95'
            }
          },
          // x轴线的颜色
          axisLine: {
            lineStyle: {
              color: '#13365C'
            }
          }
        },
        yAxis: {
          /**
           任务名称：BUG 1224/纵轴缺少单位万
           开发人员：崔洛宜
           日期：2020-03-20
           BUG类型：
           测试人员提出的系统性BUG
           **/
          name: '万',
          nameTextStyle: {
            color: '#a5c8e7'
          },

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
            name: '数值',
            type: 'bar',
            barWidth: '60%',
            label: {
              show: true, //开启显示
              position: 'top', //在上方显示
              textStyle: {
                // 数值样式
                color: '#fff',
                fontSize: 12
              }
            },
            itemStyle: {
              normal: {
                color: new LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#1E86C5'
                  },
                  {
                    offset: 1,
                    color: '#091E3E'
                  }
                ])
              }
            },
            data: [0, 0, 0]
          }
        ]
      },
      optionMonth: {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['总合同收入', '总预算成本', '总实际成本'],
          axisTick: {
            alignWithLabel: true
          }, // x轴字体颜色
          axisLabel: {
            textStyle: {
              color: '#235A95'
            }
          },
          // x轴线的颜色
          axisLine: {
            lineStyle: {
              color: '#13365C'
            }
          }
        },
        yAxis: {
          /**
           任务名称：BUG 1224/纵轴缺少单位万
           开发人员：崔洛宜
           日期：2020-03-20
           BUG类型：
           测试人员提出的系统性BUG
           **/
          name: '万',
          nameTextStyle: {
            color: '#a5c8e7'
          },
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
            name: '数值',
            type: 'bar',
            barWidth: '60%',
            label: {
              show: true, //开启显示
              position: 'top', //在上方显示
              textStyle: {
                // 数值样式
                color: '#fff',
                fontSize: 12
              }
            },
            itemStyle: {
              normal: {
                color: new LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#1E86C5'
                  },
                  {
                    offset: 1,
                    color: '#091E3E'
                  }
                ])
              }
            },
            data: [0, 0, 0]
          }
        ]
      }
    }
  },
  /**
   任务名称：2621/BIM协同成本趋势+成本三算绑定
   开发人员：崔洛宜
   日期：2020-3-16
   任务类型：新增接口对接信息212-257
   **/
  mounted() {
    //获取成本指标
    this.getCostQuota()
    //获取成本明细
    this.getCostDetail()
    this.getCostTrendDetail()
  },
  methods: {
    /**
     任务名称：2621/BIM协同成本趋势+成本三算绑定
     开发人员：崔洛宜
     日期：2020-3-19
     任务类型：处理接口返回的数据
     **/
    getCostQuota() {
      Api.getCostQuota().then(res => {
        let {
          /**
           任务名称：BUG 1224/数值显示优化(添加涨跌)
           开发人员：崔洛宜
           日期：2020-03-20
           BUG类型：
           测试人员提出的系统性BUG
           **/
          profitLossTotal,
          superSectionTotal,
          profitLossMonth,
          superSectionMonth,
          incomeTotal,
          budgetCostTotal,
          realCostTotal,
          incomeMonth,
          incomeMonthUD,
          budgetCostMonth,
          budgetCostMonthUD,
          realCostMonth,
          realCostMonthUD,
          profitLossMonthUD,
          superSectionMonthUD
        } = res.data
        this.profitLossTotal = this.toFixed4(profitLossTotal)
        this.superSectionTotal = this.toFixed4(superSectionTotal)
        this.profitLossMonth = this.toFixed4(profitLossMonth)
        this.superSectionMonth = this.toFixed4(superSectionMonth)
        this.profitLossMonthUD = this.toFixed4(profitLossMonthUD)
        this.superSectionMonthUD = this.toFixed4(superSectionMonthUD)
        this.option = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: ['总合同收入', '总预算成本', '总实际成本'],
            axisTick: {
              alignWithLabel: true
            }, // x轴字体颜色
            axisLabel: {
              textStyle: {
                color: '#235A95'
              }
            },
            // x轴线的颜色
            axisLine: {
              lineStyle: {
                color: '#13365C'
              }
            }
          },
          yAxis: {
            /**
             任务名称：BUG 1224/纵轴缺少单位万
             开发人员：崔洛宜
             日期：2020-03-20
             BUG类型：
             测试人员提出的系统性BUG
             **/
            name: '万',
            nameTextStyle: {
              color: '#a5c8e7'
            },
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
              name: '数值',
              type: 'bar',
              barWidth: '60%',
              label: {
                show: true, //开启显示
                /**
                 任务名称：BUG 1224/数值显示位置
                 开发人员：崔洛宜
                 日期：2020-03-20
                 BUG类型：
                 测试人员提出的系统性BUG
                 **/
                position: 'insideTop', //在内部上方显示
                textStyle: {
                  // 数值样式
                  color: '#fff',
                  fontSize: 12
                }
              },
              itemStyle: {
                normal: {
                  color: new LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: '#1E86C5'
                    },
                    {
                      offset: 1,
                      color: '#091E3E'
                    }
                  ])
                }
              },
              data: [this.toFixed4(incomeTotal), this.toFixed4(budgetCostTotal), this.toFixed4(realCostTotal)]
              /* data: [3200, 2810.8, 2762.47]*/
            }
          ]
        }
        this.optionMonth = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: ['本月总合同收入', '本月总预算成本', '本月总实际成本'],
            axisTick: {
              alignWithLabel: true
            }, // x轴字体颜色
            axisLabel: {
              textStyle: {
                color: '#235A95'
              }
            },
            // x轴线的颜色
            axisLine: {
              lineStyle: {
                color: '#13365C'
              }
            }
          },
          yAxis: {
            /**
             任务名称：BUG 1224/纵轴缺少单位万
             开发人员：崔洛宜
             日期：2020-03-20
             BUG类型：
             测试人员提出的系统性BUG
             **/
            name: '万',
            nameTextStyle: {
              color: '#a5c8e7'
            },
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
              name: '数值',
              type: 'bar',
              barWidth: '60%',
              label: {
                show: true, //开启显示
                /**
                 任务名称：BUG 1224/数值显示位置
                 开发人员：崔洛宜
                 日期：2020-03-20
                 BUG类型：
                 测试人员提出的系统性BUG
                 **/
                //position: 'insideTop', //在内部上方显示
                position: 'outside', //在内部上方显示
                textStyle: {
                  // 数值样式
                  color: '#fff',
                  fontSize: 12
                },
                /**
                 任务名称：BUG 1224/数值显示优化
                 开发人员：崔洛宜
                 日期：2020-03-20
                 BUG类型：
                 测试人员提出的系统性BUG
                 **/
                formatter: params => {
                  let cla = ''
                  if (params.data.ud > 0) {
                    cla = '{up|}'
                  } else if (params.data.ud < 0) {
                    cla = '{down|}'
                  } else {
                    cla = ''
                  }
                  return `${cla}${params.value}`
                },
                rich: {
                  up: {
                    //引入图片
                    width: 9,
                    height: 12,
                    backgroundColor: {
                      image:
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAA2klEQVQ4T+2RMU5CQRCGvz8kFBSegGACHYnNm4J7GLExNnRewMTCxsrE3hoKbKg4gRdgX/FKTSi4A4kJj4xZsiSwRjs7/mpn9v9mZmdFJu/3m7Rac9y/6HavNJttDy06DHw4bLBcToCblJ8Swq3A975jwOwVuDtqKr1osbj/AbjZI/CUj5jiB4XwHM+7Dm4Wq8bqv8lxH6ksx/KiuEZ6Axp/APFqi3QpN3sHOsncBNoZuALqlPvMH30BVBlwrhAitNMJcLP/3tJgcEZdl0Avrf2DzaZQVa33//ANfbVc44bEJkIAAAAASUVORK5CYII='
                    }
                  },
                  down: {
                    width: 9,
                    height: 12,
                    backgroundColor: {
                      image:
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAA7UlEQVQ4T2NkQAJCb835GP/+P/efgUEZKnyL9d8Po5cSl77ClDEiaxB8YanLyPT3ErLYf5a/8u+Fzj4a1QALAdqEktArs4MMDAwyUFvYkNgQof8MjxgYGf5A5W8zCr0yC2VgYFjOwMDAjBxhWNh/mRiZgsAxLfjSNJORkXEaHg3/GRn+J70VO70AnjSEX5nW/GdgbMam6T/D/8r3Yqc7QHIoaUn4tdm0//8ZMpE1MTIydL0VPVWONS0x/GdgEn5ltug/I0M02L+MDIvfi5yKZ2Bk+I9dA1iVFpvQa56N/xkZfrwXkQ9hYFz9F9lGAO4ce4ALLvjKAAAAAElFTkSuQmCC'
                    }
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: new LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: '#1E86C5'
                    },
                    {
                      offset: 1,
                      color: '#091E3E'
                    }
                  ])
                }
              },
              /**
               任务名称：BUG 1224/数值显示优化
               开发人员：崔洛宜
               日期：2020-03-20
               BUG类型：
               测试人员提出的系统性BUG
               **/
              data: [
                { value: this.toFixed4(incomeMonth), ud: this.toFixed4(incomeMonthUD) },
                { value: this.toFixed4(budgetCostMonth), ud: this.toFixed4(budgetCostMonthUD) },
                { value: this.toFixed4(realCostMonth), ud: this.toFixed4(realCostMonthUD) }
              ]
              /*data: [
                { value: 0, ud: 0 },
                { value: 0, ud: 0 },
                { value: 0, ud: 0 }
              ]*/
            }
          ]
        }
      })
    },
    /**
     任务名称：2621/BIM协同成本趋势+成本三算绑定
     开发人员：崔洛宜
     日期：2020-3-17
     任务类型：添加成本明细接口
     **/
    getCostDetail() {
      Api.getCostDetail().then(res => {
        if (res.code === 200) {
          this.tableData = res.data
        }
      })
    },
    /**
    任务名称：2621/BIM协同成本趋势+成本三算绑定
开发人员：崔洛宜
日期：2020-3-20
任务类型：添加获取成本趋势明细接口
**/
    getCostTrendDetail() {
      /**
       任务名称：2621/BIM协同成本趋势+成本三算绑定
       开发人员：崔洛宜
       日期：2020-3-23
       任务类型：获取成本趋势明细接口添加参数
       **/
      let filterForm = this.$refs.aa.form
      Api.getCostTrendDetail(filterForm).then(res => {
        if (res.code === 200) {
          this.tableDataDetail = res.data
        }
      })
    },
    turnDown() {
      this.down = !this.down
    },
    changeTab(e) {
      this.activeKey = e
    },
    /**
     任务名称：2621/BIM协同成本趋势+成本三算绑定
     开发人员：崔洛宜
     日期：2020-3-23
     任务类型：获取并查询趋势明细接口
     **/
    handleQuery(form) {
      Api.getCostTrendDetail(form).then(res => {
        if (res.code === 200) {
          this.tableDataDetail = res.data
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.aside-right {
  float: right;
  width: 400px;
  // padding: 10px;
}
.flex {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  div {
    text-align: center;
    width: 100%;
    span {
      color: #dcc51d;
      padding: 0 4px;
    }
  }
}
/**
   任务名称：BUG 1224/表格最大高度限制
   开发人员：崔洛宜
   日期：2020-03-20
   BUG类型：
   测试人员提出的系统性BUG
**/
.tableWrapper /deep/.vxe-table--body-wrapper {
  max-height: 300px;
  overflow: auto;
}
</style>
