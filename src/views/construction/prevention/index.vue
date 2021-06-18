<template>
  <div class="container base-wrap">
    <div class="left">
      <!-- 今日进退场统计 start -->
      <div class="plague">
        <div class="country">
          <StaticTitle name="国内疫情情况" />
          <ul>
            <li>
              <p class="number err">{{ chinaTotal.confirm }}</p>
              <p class="name">累计确诊</p>
              <p class="compare">
                <span>较昨日</span>
                <span class="add err">{{ formatterNum(chinaAdd.confirm) }}</span>
              </p>
            </li>
            <li>
              <p class="number warn">{{ chinaTotal.nowConfirm }}</p>
              <p class="name">现有确诊</p>
              <p class="compare">
                <span>较昨日</span>
                <span class="add warn">{{ formatterNum(chinaAdd.nowConfirm) }}</span>
              </p>
            </li>
            <li>
              <p class="number info">{{ chinaTotal.dead }}</p>
              <p class="name">死亡</p>
              <p class="compare">
                <span>较昨日</span>
                <span class="add info">{{ formatterNum(chinaAdd.dead) }}</span>
              </p>
            </li>
            <li>
              <p class="number primary">{{ chinaTotal.heal }}</p>
              <p class="name">治愈</p>
              <p class="compare">
                <span>较昨日</span>
                <span class="add primary">{{ formatterNum(chinaAdd.heal) }}</span>
              </p>
            </li>
          </ul>
        </div>
        <div class="province">
          <StaticTitle name="本省疫情情况" />
          <ul>
            <li>
              <p class="number err">{{ countryTotal.total.confirm }}</p>
              <p class="name">确诊</p>
            </li>
            <li>
              <p class="number warn">{{ countryTotal.total.nowConfirm }}</p>
              <p class="name">现有确诊</p>
            </li>
            <li>
              <p class="number info">{{ countryTotal.total.dead }}</p>
              <p class="name">死亡</p>
            </li>
            <li>
              <p class="number primary">{{ countryTotal.total.heal }}</p>
              <p class="name">治愈</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="map">
        <StaticTitle name="疫情地图" />
        <Echarts ref="safety" :height="400" id-select="map" :option="chartOptions" />
      </div>
      <!-- 今日人员到场率 end -->
    </div>
    <div class="center">
      <div class="site">
        <MoveTitle name="工地疫情监控" sub="Site epidemic monioring">
          <p class="title primary">
            在册工人
            <span class="info" style="color:#fff">{{ siteData.registeredPersonCount }}</span>
            人 已复工
            <span class="info" style="color:#fff">{{ siteData.returnToWorkPersonCount }}</span>
            人
          </p>
        </MoveTitle>
        <div class="alarm">
          <ul>
            <li>
              <div class="img">
                <img src="./img/day-back.png" alt="" class="back delay1" />
                <img src="./img/day.png" alt="" class="info" />
              </div>
              <div>
                <p>
                  监控天数
                </p>
                <p class="val">
                  <span class="primary num">{{ siteData.monitorDays }}</span>
                  <span class="info unit">天</span>
                </p>
              </div>
            </li>
            <li>
              <div class="img">
                <img src="./img/person-back.png" alt="" class="back delay2" />
                <img src="./img/person.png" alt="" class="info" />
              </div>
              <div>
                <p>
                  累计监控人数
                </p>
                <p class="val">
                  <span class="primary num">{{ siteData.totalMonitorPersonCount }}</span>
                  <span class="info unit">人</span>
                </p>
              </div>
            </li>
            <li>
              <div class="img">
                <img src="./img/car-back.png" alt="" class="back delay3" />
                <img src="./img/car.png" alt="" class="info" />
              </div>
              <div>
                <p>
                  累计监控车辆
                </p>
                <p class="val">
                  <span class="primary num">{{ siteData.totalMonitorCarsCount }}</span>
                  <span class="info unit">辆</span>
                </p>
              </div>
            </li>
            <li>
              <div class="img">
                <img src="./img/err-back.png" alt="" class="back" />
                <img src="./img/err-content.png" alt="" class="info" />
              </div>
              <div>
                <p>
                  累计异常报警
                </p>
                <p class="val">
                  <span class="primary num">{{ siteData.totalErrorAlertCount }}</span>
                  <span class="info unit">个</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
        <ul class="total">
          <li class="person">
            <ProgressSvg start-color="#79EEFB" title="实时场内人数" :num="siteData.realTimePersonCount" unit="人" />
          </li>
          <li class="car">
            <ProgressSvg start-color="#5186E6" title="实时场内车辆" :num="siteData.realTimeCarsCount" unit="辆" />
          </li>
          <li class="unusual">
            <ProgressSvg start-color="#E3575A" title="今日异常报警" :num="siteData.realTimeErrorCount" unit="个" />
          </li>
        </ul>
      </div>
      <div class="today">
        <MoveTitle name="今日测量" sub="Site epidemic monioring" />
        <el-table :data="tableData" height="400" stripe class="information-table">
          <el-table-column prop="employeeName" label="姓名" align="center" />
          <el-table-column prop="groupName" label="班组" align="center" />
          <el-table-column prop="labourCompanyName" label="所属公司" show-overflow-tooltip align="center" />
          <el-table-column prop="mobile" label="联系方式" align="center" />
          <el-table-column prop="bodyTemperature" label="体温℃" align="center" />
          <el-table-column prop="statusName" label="状态" align="center" />
          <el-table-column prop="monitorTime" label="测量时间" width="160" align="center" />
        </el-table>
      </div>
    </div>
    <div class="right">
      <div class="total">
        <StaticTitle name="累计趋势" />
        <TabTitle :title="totalTab" :active="curTotal" @getTotalKey="key => (curTotal = key)" />
        <Echarts
          v-if="curTotal === 1"
          key="1"
          class="totalChart"
          ref="confirmTotal"
          :height="400"
          id-select="confirmTotal"
          :option="confirmTotalOption"
        />
        <Echarts
          v-else
          key="2"
          ref="healTotal"
          class="totalChart"
          :height="400"
          id-select="healTotal"
          :option="dealTotalOption"
        />
      </div>
      <div class="add h50">
        <StaticTitle name="新增趋势" />
        <TabTitle :title="addTab" :active="curAdd" @getTotalKey="key => (curAdd = key)" />
        <Echarts
          v-if="curAdd === 1"
          key="3"
          class="totalChart"
          ref="confirmAdd"
          :height="400"
          id-select="confirmAdd"
          :option="confirmAddOption"
        />
        <Echarts
          v-else
          key="4"
          ref="healAdd"
          class="totalChart"
          :height="400"
          id-select="healAdd"
          :option="dealAddOption"
        />
      </div>
    </div>
  </div>
</template>
<script>
import MoveTitle from './components/MoveTitle'
import StaticTitle from './components/StaticTitle'
import ProgressSvg from './components/ProgressSvg'
import TabTitle from './components/TabTitle'
import api from '@/api/prevention'
export default {
  name: 'Prevention',
  // import引入的组件需要注入到对象中才能使用
  components: {
    MoveTitle,
    StaticTitle,
    ProgressSvg,
    TabTitle
  },
  data() {
    // 这里存放数据
    return {
      siteData: {
        monitorDays: 0,
        realTimeCarsCount: 0,
        realTimeErrorCount: 0,
        realTimePersonCount: 0,
        registeredPersonCount: 0,
        returnToWorkPersonCount: 0,
        totalErrorAlertCount: 0,
        totalMonitorCarsCount: 0,
        totalMonitorPersonCount: 0
      },
      tableData: [],
      chinaTotal: {},
      chinaAdd: {},
      totalTab: [
        { title: '确诊', value: 1 },
        { title: '死亡/治愈', value: 2 }
      ],
      addTab: [
        { title: '确诊/疑似', value: 1 },
        { title: '死亡/治愈', value: 2 }
      ],
      colorList: ['#E65561', '#FFD661', '#87878A', '#6ABD7F'],
      curTotal: 1,
      curAdd: 1,
      countryTotal: {
        total: {}
      },
      areaTotal: [],
      chartOptions: {
        tooltip: {
          formatter: function(e) {
            return 0.5 == e.value ? e.name + '：有疑似病例' : e.seriesName + '<br />' + e.name + '：' + e.value
          }
        },
        visualMap: {
          min: 0,
          max: 500,
          left: 20,
          bottom: 20,
          showLabel: !0,
          text: ['高', '低'],
          pieces: [
            {
              gt: 100,
              label: '> 100 人',
              color: '#7f1100'
            },
            {
              gte: 10,
              lte: 100,
              label: '10 - 100 人',
              color: '#ff5428'
            },
            {
              gte: 1,
              lt: 10,
              label: '1 - 9 人',
              color: '#ff8c71'
            },
            {
              gt: 0,
              lt: 1,
              label: '疑似',
              color: '#ffd768'
            },
            {
              value: 0,
              color: '#ffffff'
            }
          ],
          show: !0
        },
        geo: {
          map: 'china',
          roam: !1,
          scaleLimit: {
            min: 1,
            max: 2
          },
          zoom: 0.1,
          label: {
            normal: {
              show: !0,
              fontSize: '10',
              color: 'rgba(0,0,0,0.7)'
            }
          },
          itemStyle: {
            normal: {
              //shadowBlur: 50,
              //shadowColor: 'rgba(0, 0, 0, 0.2)',
              borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
              areaColor: '#f2d5ad',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0
            }
          }
        },
        series: [
          {
            name: '确诊病例',
            type: 'map',
            geoIndex: 0,
            data: []
          }
        ]
      },
      confirmTotalOption: {
        tooltip: {
          trigger: 'axis',
          formatter: this.toolTipFormatter
        },
        // legend: {
        //   data: ['确诊/疑似', '死亡/治愈'],
        //   icon: 'none',
        //   itemGap: -24,
        //   textStyle: {
        //     color: '#fff',
        //     fontSize: 12,
        //     padding: [10, 12, 6, 12],
        //     backgroundColor: {
        //       image:
        //         'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF8AAAAYCAMAAACrz9ETAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAARFQTFRFAAAAPoCnPoCnPoCnPoCnPoCnM3KfJmGXJ2OYPH6mPoCnPoCnPH2lJ2KXNHSgPoCnPoCnL22dKmaaPX+mPYCmPoCnOnqkOHmjPoCnPoCnK2iaLmucPoCnPoCnNnWhO3ylPoCnPoCnPX+mKGSYMnCfPoCnPoCnPX+mPoCnPoCnJmKXNXWhPoCnPoCnLmycK2eaPoCnPoCnOXqjPoCnPoCnPoCnPoCnPoCnNXShPoCnPoCnPX6mM3GfPoCnPoCnMW+eKWWZPX+mPYCnPoCnNnaiPoCnPoCnLWqcLGmbPoCnPoCnOHijOnukPoCnPoCnPX+mKWaZMG6dPoCnPoCnNHOgPoCnPoCnPoCnPoCnPoCnPoCn+ZAjkgAAAFt0Uk5TABXy/6uV/////ys3////ibf//+YIWf//Z9n//8R7//9FHvv//6Kd/yNA//+Av///3mL/XgPhvIT/PCb//5qm///3GUj/eMj//9Vq//9WDOr//7OM/zQvka7vElfH2QoAAADZSURBVHicvdbHVsJgFIVRivAHCS1UaQESmtKrKFWRXgSiIu//IEw587M4D7DXN7iDazLdc2aLlbsH9G12wZzkeATeKbuovtuD+V4flVf8AeCDISovwhHMf4pS+Vgc+USSygs1BXw6o1F5PYv5OZ3Ka/kC8EX1meq/lDC/XKHy1Rry9TCVF40m8K22QuV9HczvvlJ5l9wD/u1dovr9AeYPR1R+PPkA/lOl8mL6hfmzOZVfLJFfram82GyB3+2/qfzhiPkng8pLjh/gf2XubRp/mH8mvwz/l1v9CjVqP4O0HjNzAAAAAElFTkSuQmCC'
        //     }
        //   }
        // },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#366C84'
            },
            onZero: false
          },
          axisLabel: {
            rotate: 45,
            textStyle: {
              color: '#636670'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          data: []
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: '确诊',
            type: 'line',
            lineStyle: {
              shadowColor: 'rgba(0,0,0,0.4)',
              shadowBlur: 10,
              shadowOffsetY: 10,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#E65561' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#E65561' // 100% 处的颜色
                  }
                ]
              }
            },
            stack: '总量',
            areaStyle: {
              opacity: 0.2,
              color: {
                type: 'linear',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: '#E65561' // 0% 处的颜色
                  },
                  {
                    offset: 0.7,
                    color: '#E65561' // 100% 处的颜色
                  }
                ]
              }
            },
            data: []
          }
        ]
      },
      dealTotalOption: {
        tooltip: {
          trigger: 'axis',
          formatter: this.toolTipFormatter
        },
        // legend: {
        //   data: ['确诊/疑似', '死亡/治愈'],
        //   icon: 'none',
        //   itemGap: -24,
        //   textStyle: {
        //     color: '#fff',
        //     fontSize: 12,
        //     padding: [10, 12, 6, 12],
        //     backgroundColor: {
        //       image:
        //         'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF8AAAAYCAMAAACrz9ETAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAARFQTFRFAAAAPoCnPoCnPoCnPoCnPoCnM3KfJmGXJ2OYPH6mPoCnPoCnPH2lJ2KXNHSgPoCnPoCnL22dKmaaPX+mPYCmPoCnOnqkOHmjPoCnPoCnK2iaLmucPoCnPoCnNnWhO3ylPoCnPoCnPX+mKGSYMnCfPoCnPoCnPX+mPoCnPoCnJmKXNXWhPoCnPoCnLmycK2eaPoCnPoCnOXqjPoCnPoCnPoCnPoCnPoCnNXShPoCnPoCnPX6mM3GfPoCnPoCnMW+eKWWZPX+mPYCnPoCnNnaiPoCnPoCnLWqcLGmbPoCnPoCnOHijOnukPoCnPoCnPX+mKWaZMG6dPoCnPoCnNHOgPoCnPoCnPoCnPoCnPoCnPoCn+ZAjkgAAAFt0Uk5TABXy/6uV/////ys3////ibf//+YIWf//Z9n//8R7//9FHvv//6Kd/yNA//+Av///3mL/XgPhvIT/PCb//5qm///3GUj/eMj//9Vq//9WDOr//7OM/zQvka7vElfH2QoAAADZSURBVHicvdbHVsJgFIVRivAHCS1UaQESmtKrKFWRXgSiIu//IEw587M4D7DXN7iDazLdc2aLlbsH9G12wZzkeATeKbuovtuD+V4flVf8AeCDISovwhHMf4pS+Vgc+USSygs1BXw6o1F5PYv5OZ3Ka/kC8EX1meq/lDC/XKHy1Rry9TCVF40m8K22QuV9HczvvlJ5l9wD/u1dovr9AeYPR1R+PPkA/lOl8mL6hfmzOZVfLJFfram82GyB3+2/qfzhiPkng8pLjh/gf2XubRp/mH8mvwz/l1v9CjVqP4O0HjNzAAAAAElFTkSuQmCC'
        //     }
        //   }
        // },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#366C84'
            },
            onZero: false
          },
          axisLabel: {
            rotate: 45,
            textStyle: {
              color: '#636670'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          data: []
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: '死亡',
            type: 'line',
            lineStyle: {
              shadowColor: 'rgba(0,0,0,0.4)',
              shadowBlur: 10,
              shadowOffsetY: 10,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#87878A' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#87878A' // 100% 处的颜色
                  }
                ]
              }
            },
            stack: '总量',
            areaStyle: {
              opacity: 0.2,
              color: {
                type: 'linear',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: '#87878A' // 0% 处的颜色
                  },
                  {
                    offset: 0.7,
                    color: '#87878A' // 100% 处的颜色
                  }
                ]
              }
            },
            data: []
          },
          {
            name: '治愈',
            type: 'line',
            lineStyle: {
              shadowColor: 'rgba(0,0,0,0.4)',
              shadowBlur: 10,
              shadowOffsetY: 10,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#6ABD7F' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#6ABD7F' // 100% 处的颜色
                  }
                ]
              }
            },
            stack: '总量',
            areaStyle: {
              opacity: 0.2,
              color: {
                type: 'linear',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: '#6ABD7F' // 0% 处的颜色
                  },
                  {
                    offset: 0.7,
                    color: '#6ABD7F' // 100% 处的颜色
                  }
                ],
                global: false
              }
            },
            data: []
          }
        ]
      },
      confirmAddOption: {
        tooltip: {
          trigger: 'axis',
          formatter: this.toolTipFormatter
        },
        // legend: {
        //   data: ['确诊/疑似', '死亡/治愈'],
        //   icon: 'none',
        //   itemGap: -24,
        //   textStyle: {
        //     color: '#fff',
        //     fontSize: 12,
        //     padding: [10, 12, 6, 12],
        //     backgroundColor: {
        //       image:
        //         'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF8AAAAYCAMAAACrz9ETAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAARFQTFRFAAAAPoCnPoCnPoCnPoCnPoCnM3KfJmGXJ2OYPH6mPoCnPoCnPH2lJ2KXNHSgPoCnPoCnL22dKmaaPX+mPYCmPoCnOnqkOHmjPoCnPoCnK2iaLmucPoCnPoCnNnWhO3ylPoCnPoCnPX+mKGSYMnCfPoCnPoCnPX+mPoCnPoCnJmKXNXWhPoCnPoCnLmycK2eaPoCnPoCnOXqjPoCnPoCnPoCnPoCnPoCnNXShPoCnPoCnPX6mM3GfPoCnPoCnMW+eKWWZPX+mPYCnPoCnNnaiPoCnPoCnLWqcLGmbPoCnPoCnOHijOnukPoCnPoCnPX+mKWaZMG6dPoCnPoCnNHOgPoCnPoCnPoCnPoCnPoCnPoCn+ZAjkgAAAFt0Uk5TABXy/6uV/////ys3////ibf//+YIWf//Z9n//8R7//9FHvv//6Kd/yNA//+Av///3mL/XgPhvIT/PCb//5qm///3GUj/eMj//9Vq//9WDOr//7OM/zQvka7vElfH2QoAAADZSURBVHicvdbHVsJgFIVRivAHCS1UaQESmtKrKFWRXgSiIu//IEw587M4D7DXN7iDazLdc2aLlbsH9G12wZzkeATeKbuovtuD+V4flVf8AeCDISovwhHMf4pS+Vgc+USSygs1BXw6o1F5PYv5OZ3Ka/kC8EX1meq/lDC/XKHy1Rry9TCVF40m8K22QuV9HczvvlJ5l9wD/u1dovr9AeYPR1R+PPkA/lOl8mL6hfmzOZVfLJFfram82GyB3+2/qfzhiPkng8pLjh/gf2XubRp/mH8mvwz/l1v9CjVqP4O0HjNzAAAAAElFTkSuQmCC'
        //     }
        //   }
        // },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#366C84'
            },
            onZero: false
          },
          axisLabel: {
            rotate: 45,
            textStyle: {
              color: '#636670'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          data: []
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: '确诊',
            type: 'line',
            lineStyle: {
              shadowColor: 'rgba(0,0,0,0.4)',
              shadowBlur: 10,
              shadowOffsetY: 10,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#E65561' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#E65561' // 100% 处的颜色
                  }
                ]
              }
            },
            stack: '总量',
            areaStyle: {
              opacity: 0.2,
              color: {
                type: 'linear',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: '#E65561' // 0% 处的颜色
                  },
                  {
                    offset: 0.7,
                    color: '#E65561' // 100% 处的颜色
                  }
                ]
              }
            },
            data: []
          },
          {
            name: '疑似',
            type: 'line',
            lineStyle: {
              shadowColor: 'rgba(0,0,0,0.4)',
              shadowBlur: 10,
              shadowOffsetY: 10,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#FFD661' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#FFD661' // 100% 处的颜色
                  }
                ]
              }
            },
            stack: '总量',
            areaStyle: {
              opacity: 0.2,
              color: {
                type: 'linear',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: '#FFD661' // 0% 处的颜色
                  },
                  {
                    offset: 0.7,
                    color: '#FFD661' // 100% 处的颜色
                  }
                ],
                global: false
              }
            },
            data: []
          }
        ]
      },
      dealAddOption: {
        tooltip: {
          trigger: 'axis',
          formatter: this.toolTipFormatter
        },
        // legend: {
        //   data: ['确诊/疑似', '死亡/治愈'],
        //   icon: 'none',
        //   itemGap: -24,
        //   textStyle: {
        //     color: '#fff',
        //     fontSize: 12,
        //     padding: [10, 12, 6, 12],
        //     backgroundColor: {
        //       image:
        //         'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF8AAAAYCAMAAACrz9ETAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAARFQTFRFAAAAPoCnPoCnPoCnPoCnPoCnM3KfJmGXJ2OYPH6mPoCnPoCnPH2lJ2KXNHSgPoCnPoCnL22dKmaaPX+mPYCmPoCnOnqkOHmjPoCnPoCnK2iaLmucPoCnPoCnNnWhO3ylPoCnPoCnPX+mKGSYMnCfPoCnPoCnPX+mPoCnPoCnJmKXNXWhPoCnPoCnLmycK2eaPoCnPoCnOXqjPoCnPoCnPoCnPoCnPoCnNXShPoCnPoCnPX6mM3GfPoCnPoCnMW+eKWWZPX+mPYCnPoCnNnaiPoCnPoCnLWqcLGmbPoCnPoCnOHijOnukPoCnPoCnPX+mKWaZMG6dPoCnPoCnNHOgPoCnPoCnPoCnPoCnPoCnPoCn+ZAjkgAAAFt0Uk5TABXy/6uV/////ys3////ibf//+YIWf//Z9n//8R7//9FHvv//6Kd/yNA//+Av///3mL/XgPhvIT/PCb//5qm///3GUj/eMj//9Vq//9WDOr//7OM/zQvka7vElfH2QoAAADZSURBVHicvdbHVsJgFIVRivAHCS1UaQESmtKrKFWRXgSiIu//IEw587M4D7DXN7iDazLdc2aLlbsH9G12wZzkeATeKbuovtuD+V4flVf8AeCDISovwhHMf4pS+Vgc+USSygs1BXw6o1F5PYv5OZ3Ka/kC8EX1meq/lDC/XKHy1Rry9TCVF40m8K22QuV9HczvvlJ5l9wD/u1dovr9AeYPR1R+PPkA/lOl8mL6hfmzOZVfLJFfram82GyB3+2/qfzhiPkng8pLjh/gf2XubRp/mH8mvwz/l1v9CjVqP4O0HjNzAAAAAElFTkSuQmCC'
        //     }
        //   }
        // },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#366C84'
            },
            onZero: false
          },
          axisLabel: {
            rotate: 45,
            textStyle: {
              color: '#636670'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          data: []
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: '死亡',
            type: 'line',
            lineStyle: {
              shadowColor: 'rgba(0,0,0,0.4)',
              shadowBlur: 10,
              shadowOffsetY: 10,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#87878A' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#87878A' // 100% 处的颜色
                  }
                ]
              }
            },
            stack: '总量',
            areaStyle: {
              opacity: 0.2,
              color: {
                type: 'linear',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: '#87878A' // 0% 处的颜色
                  },
                  {
                    offset: 0.7,
                    color: '#87878A' // 100% 处的颜色
                  }
                ]
              }
            },
            data: []
          },
          {
            name: '治愈',
            type: 'line',
            lineStyle: {
              shadowColor: 'rgba(0,0,0,0.4)',
              shadowBlur: 10,
              shadowOffsetY: 10,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#6ABD7F' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#6ABD7F' // 100% 处的颜色
                  }
                ]
              }
            },
            stack: '总量',
            areaStyle: {
              opacity: 0.2,
              color: {
                type: 'linear',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: '#6ABD7F' // 0% 处的颜色
                  },
                  {
                    offset: 0.7,
                    color: '#6ABD7F' // 100% 处的颜色
                  }
                ],
                global: false
              }
            },
            data: []
          }
        ]
      }
    }
  },
  computed: {
    location() {
      console.log(this.$store.state.location.location)
      return this.$store.state.location.location
    }
  },
  // 生命周期 - 实例创建完成，可访问data、computed、watch、methods上的方法和数据，未挂载到DOM，不能访问到属性，属性内容为空数组
  created() {
    this.refresh()
  },
  // 方法集合
  methods: {
    // 刷新列表
    refresh() {
      this.getOne()
      this.getList()
      this.getSiteData()
      this.getTodayList()
    },
    async getLocation() {
      return await this.axios.get(``, { baseURL: '/location', type: 'prevention' })
    },
    async getOne() {
      const res = await api.getOnsInfo()
      const resData = JSON.parse(res.data)
      this.chinaTotal = resData.chinaTotal
      this.chinaAdd = resData.chinaAdd
      console.log(resData.areaTree[0])
      this.chartOptions.series[0].data = resData.areaTree[0].children.map(r => {
        return { name: r.name, value: r.total.nowConfirm }
      })
      console.log(resData.areaTree[0].children.filter(r => this.location.includes(r.name))[0])
      this.countryTotal = resData.areaTree[0].children.filter(r => this.location.includes(r.name))[0]
    },
    async getList() {
      const res = await api.getTotalList()
      const resData = JSON.parse(res.data)
      const dateTotal = resData.chinaDayList.map(r => r.date)
      const confirmTotal = resData.chinaDayList.map(r => r.confirm)
      const deadTotal = resData.chinaDayList.map(r => r.dead)
      const healTotal = resData.chinaDayList.map(r => r.heal)

      this.confirmTotalOption.xAxis.data = dateTotal
      this.confirmTotalOption.series[0].data = confirmTotal

      this.dealTotalOption.xAxis.data = dateTotal
      this.dealTotalOption.series[0].data = deadTotal
      this.dealTotalOption.series[1].data = healTotal

      const dateAdd = resData.chinaDayAddList.map(r => r.date)
      const confirmAdd = resData.chinaDayAddList.map(r => r.confirm)
      const suspectAdd = resData.chinaDayAddList.map(r => r.suspect)
      const deadAdd = resData.chinaDayAddList.map(r => r.dead)
      const healAdd = resData.chinaDayAddList.map(r => r.heal)

      this.confirmAddOption.xAxis.data = dateAdd
      this.confirmAddOption.series[0].data = confirmAdd
      this.confirmAddOption.series[1].data = suspectAdd

      this.dealAddOption.xAxis.data = dateAdd
      this.dealAddOption.series[0].data = deadAdd
      this.dealAddOption.series[1].data = healAdd
    },
    async getSiteData() {
      const res = await api.getSiteData({})
      this.siteData = res.data
    },
    async getTodayList() {
      const res = await api.getTodayList({})
      this.tableData = res.data
    },
    toolTipFormatter(data) {
      const item = data
        .map(d => {
          let color = 'red'
          if (d.seriesName === '确诊') {
            color = '#E65561'
          } else if (d.seriesName === '疑似') {
            color = '#FFD661'
          } else if (d.seriesName === '死亡') {
            color = '#87878A'
          } else if (d.seriesName === '治愈') {
            color = '#6ABD7F'
          } else {
            color = 'transparent'
          }
          return `<p><span class="point" style="background: ${color}""></span><span>${d.seriesName}</span><span class="num" style="color:${color}">${d.data}</span></p>`
        })
        .join('')
      return `<div style="background: rgba(1,1,1,.2)"><p>${data[0].name}</p>${item}</div>`
    },
    formatterNum(num) {
      return num > 0 ? `+${num}` : num
    }
  }
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  .left {
    flex: 0 0 450px;
    padding: 10px;
    .plague {
      margin-bottom: 20px;
      ul {
        display: flex;
        padding: 40px 0;
        > li {
          flex: 1;
          color: #eee;
          p {
            padding: 6px 0;
            text-align: center;
            .add {
              margin-left: 4px;
            }
          }
        }
      }
    }
  }
  .center {
    flex: 1;
    padding: 0 40px;
    .site {
      .title {
        font-size: 14px;
        margin-left: 10px;
      }
      .alarm {
        > ul {
          padding: 60px 0;
          display: flex;
          margin-top: 15px;
          li {
            display: flex;
            justify-content: center;
            flex: 1;
            > .img {
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              width: 80px;
              height: 80px;
              margin-right: 10px;
              .back {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                z-index: -1;
                &.delay1 {
                  animation-delay: 1s !important;
                }
                &.delay2 {
                  animation-delay: 2s !important;
                }
                &.delay3 {
                  animation-delay: 3s !important;
                }
                animation: rotateReversalAnimation 4s infinite;
              }
              .info {
                position: absolute;
                width: 20px;
                height: 20px;
                background: #000;
                border-radius: 50%;
              }
            }
            > div {
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              margin-left: 10px;
              color: #fff;
              .num {
                vertical-align: -2px;
                font-size: 24px;
              }
              .unit {
                font-size: 14px;
                margin-left: 10px;
              }
            }
          }
        }
      }
      .total {
        display: flex;
        justify-content: space-around;
        padding: 30px 0 50px 0;
        li {
          width: 140px;
          height: 140px;
          &.car {
            width: 160px;
            height: 160px;
            margin-top: -20px;
          }
        }
      }
    }
    .today {
    }
  }
  .right {
    flex: 0 0 450px;
    padding: 10px;
  }
}
.err {
  color: #ff7b44;
}
.warn {
  color: #e7c335;
}
.info {
  color: #afafb0;
}
.primary {
  color: #08d1ea;
}
.toolTip {
  padding: 10px;
}
.totalChart {
  /deep/.point {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 10px;
  }
  /deep/.num {
    margin-left: 4px;
  }
}
</style>
