<template>
  <div class="green-construction base-wrap">
    <div class="left">
      <!-- 最近30天 start -->
      <div class="main-title2">
        <span class="name">最近30天</span>
      </div>
      <div class="green-construction-list">
        <ul>
          <li>
            <div class="box">
              <div class="chart">
                <span class="name">AQI</span>
                <img src="../images/green-construction/ring1.png" class="garden" />
                <img src="../images/green-construction/ring1-1.png" class="garden-line" />
              </div>
              <div class="target">
                <p class="status status0">
                  <em></em>
                  <span>优秀</span>
                  <b>{{ threeInfo.AQI.fineDays }}</b>
                </p>
                <p class="status status1">
                  <em></em>
                  <span>中度</span>
                  <b>{{ threeInfo.AQI.mediumDays }}</b>
                </p>
                <p class="status status2">
                  <em></em>
                  <span>良好</span>
                  <b>{{ threeInfo.AQI.goodDays }}</b>
                </p>
                <p class="status status3">
                  <em></em>
                  <span>重度</span>
                  <b>{{ threeInfo.AQI.severeDays }}</b>
                </p>
                <p class="status status4">
                  <em></em>
                  <span>轻度</span>
                  <b>{{ threeInfo.AQI.mildDays }}</b>
                </p>
                <p class="status status5">
                  <em></em>
                  <span>严重</span>
                  <b>{{ threeInfo.AQI.seriousDays }}</b>
                </p>
              </div>
            </div>
          </li>
          <li>
            <div class="box">
              <div class="chart">
                <span class="name">PM2.5</span>
                <img src="../images/green-construction/ring1.png" class="garden" />
                <img src="../images/green-construction/ring1-1.png" class="garden-line" />
              </div>
              <div class="target">
                <p class="status status0">
                  <em></em>
                  <span>优秀</span>
                  <b>{{ threeInfo.pm25.fineDays }}</b>
                </p>
                <p class="status status1">
                  <em></em>
                  <span>中度</span>
                  <b>{{ threeInfo.pm25.mediumDays }}</b>
                </p>
                <p class="status status2">
                  <em></em>
                  <span>良好</span>
                  <b>{{ threeInfo.pm25.goodDays }}</b>
                </p>
                <p class="status status3">
                  <em></em>
                  <span>重度</span>
                  <b>{{ threeInfo.pm25.severeDays }}</b>
                </p>
                <p class="status status4">
                  <em></em>
                  <span>轻度</span>
                  <b>{{ threeInfo.pm25.mildDays }}</b>
                </p>
                <p class="status status5">
                  <em></em>
                  <span>严重</span>
                  <b>{{ threeInfo.pm25.seriousDays }}</b>
                </p>
              </div>
            </div>
          </li>
          <li>
            <div class="box">
              <div class="chart">
                <span class="name">PM10</span>
                <img src="../images/green-construction/ring1.png" class="garden" />
                <img src="../images/green-construction/ring1-1.png" class="garden-line" />
              </div>
              <div class="target">
                <p class="status status0">
                  <em></em>
                  <span>优秀</span>
                  <b>{{ threeInfo.pm10.fineDays }}</b>
                </p>
                <p class="status status1">
                  <em></em>
                  <span>中度</span>
                  <b>{{ threeInfo.pm10.mediumDays }}</b>
                </p>
                <p class="status status2">
                  <em></em>
                  <span>良好</span>
                  <b>{{ threeInfo.pm10.goodDays }}</b>
                </p>
                <p class="status status3">
                  <em></em>
                  <span>重度</span>
                  <b>{{ threeInfo.pm10.severeDays }}</b>
                </p>
                <p class="status status4">
                  <em></em>
                  <span>轻度</span>
                  <b>{{ threeInfo.pm10.mildDays }}</b>
                </p>
                <p class="status status5">
                  <em></em>
                  <span>严重</span>
                  <b>{{ threeInfo.pm10.seriousDays }}</b>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 最近30天 end -->

      <!-- 最近90天 start -->
      <div class="main-title2">
        <span class="name">最近90天</span>
      </div>
      <div class="green-construction-list">
        <ul>
          <li>
            <div class="box">
              <div class="chart">
                <span class="name">AQI</span>
                <img src="../images/green-construction/ring1.png" class="garden" />
                <img src="../images/green-construction/ring1-1.png" class="garden-line" />
              </div>
              <div class="target">
                <p class="status status0">
                  <em></em>
                  <span>优秀</span>
                  <b>{{ nineInfo.AQI.fineDays }}</b>
                </p>
                <p class="status status1">
                  <em></em>
                  <span>中度</span>
                  <b>{{ nineInfo.AQI.mediumDays }}</b>
                </p>
                <p class="status status2">
                  <em></em>
                  <span>良好</span>
                  <b>{{ nineInfo.AQI.goodDays }}</b>
                </p>
                <p class="status status3">
                  <em></em>
                  <span>重度</span>
                  <b>{{ nineInfo.AQI.severeDays }}</b>
                </p>
                <p class="status status4">
                  <em></em>
                  <span>轻度</span>
                  <b>{{ nineInfo.AQI.mildDays }}</b>
                </p>
                <p class="status status5">
                  <em></em>
                  <span>严重</span>
                  <b>{{ nineInfo.AQI.seriousDays }}</b>
                </p>
              </div>
            </div>
          </li>
          <li>
            <div class="box">
              <div class="chart">
                <span class="name">PM2.5</span>
                <img src="../images/green-construction/ring1.png" class="garden" />
                <img src="../images/green-construction/ring1-1.png" class="garden-line" />
              </div>
              <div class="target">
                <p class="status status0">
                  <em></em>
                  <span>优秀</span>
                  <b>{{ nineInfo.pm25.fineDays }}</b>
                </p>
                <p class="status status1">
                  <em></em>
                  <span>中度</span>
                  <b>{{ nineInfo.pm25.mediumDays }}</b>
                </p>
                <p class="status status2">
                  <em></em>
                  <span>良好</span>
                  <b>{{ nineInfo.pm25.goodDays }}</b>
                </p>
                <p class="status status3">
                  <em></em>
                  <span>重度</span>
                  <b>{{ nineInfo.pm25.severeDays }}</b>
                </p>
                <p class="status status4">
                  <em></em>
                  <span>轻度</span>
                  <b>{{ nineInfo.pm25.mildDays }}</b>
                </p>
                <p class="status status5">
                  <em></em>
                  <span>严重</span>
                  <b>{{ nineInfo.pm25.seriousDays }}</b>
                </p>
              </div>
            </div>
          </li>
          <li>
            <div class="box">
              <div class="chart">
                <span class="name">PM10</span>
                <img src="../images/green-construction/ring1.png" class="garden" />
                <img src="../images/green-construction/ring1-1.png" class="garden-line" />
              </div>
              <div class="target">
                <p class="status status0">
                  <em></em>
                  <span>优秀</span>
                  <b>{{ nineInfo.pm10.fineDays }}</b>
                </p>
                <p class="status status1">
                  <em></em>
                  <span>中度</span>
                  <b>{{ nineInfo.pm10.mediumDays }}</b>
                </p>
                <p class="status status2">
                  <em></em>
                  <span>良好</span>
                  <b>{{ nineInfo.pm10.goodDays }}</b>
                </p>
                <p class="status status3">
                  <em></em>
                  <span>重度</span>
                  <b>{{ nineInfo.pm10.severeDays }}</b>
                </p>
                <p class="status status4">
                  <em></em>
                  <span>轻度</span>
                  <b>{{ nineInfo.pm10.mildDays }}</b>
                </p>
                <p class="status status5">
                  <em></em>
                  <span>严重</span>
                  <b>{{ nineInfo.pm10.seriousDays }}</b>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 最近90天 end -->
    </div>
    <div class="center">
      <!-- 实时环境监测 start -->
      <div class="main-title3">
        <span class="name">实时环境监测</span>
      </div>
      <div class="environmental">
        <div class="environmental-left">
          <ul>
            <li>
              <img src="../images/green-construction/ring2.png" class="garden" />
              <b>{{ currentInfo.pm25 }}</b>
              <span>PM2.5</span>
            </li>
            <li>
              <img src="../images/green-construction/ring2.png" class="garden" />
              <b>{{ currentInfo.pm10 }}</b>
              <span>PM10</span>
            </li>
            <li>
              <img src="../images/green-construction/ring2.png" class="garden" />
              <b>{{ currentInfo.noise }}</b>
              <span>噪音</span>
            </li>
          </ul>
        </div>
        <div class="environmental-center">
          <img src="../images/green-construction/ring3.png" class="garden" />
          <img src="../images/green-construction/ring3-1.png" class="garden-line" />
          <p>
            <span>AQI</span>
            <b>{{ currentInfo.aqi }}</b>
            <span>
              {{
                _.get(
                  _.find(levelList, o => {
                    return _.inRange(currentInfo.aqi, o.value[0], o.value[1])
                  }),
                  'label'
                )
              }}</span
            >
          </p>
        </div>
        <div class="environmental-right">
          <ul>
            <li>
              <div class="box">
                <img src="../images/green-construction/icon1.png" class="environmental-icon" />
                <p class="desc">
                  <span class="name">风速</span>
                  <b>
                    {{ currentInfo.windSpeed }}
                    <span class="unit">m/s</span>
                  </b>
                </p>
              </div>
            </li>
            <li>
              <div class="box">
                <img src="../images/green-construction/icon2.png" class="environmental-icon" />
                <p class="desc">
                  <span class="name">温度</span>
                  <b>
                    {{ currentInfo.temperature }}
                    <span class="unit">C<sup>0</sup></span>
                  </b>
                </p>
              </div>
            </li>
            <li>
              <div class="box">
                <img src="../images/green-construction/icon3.png" class="environmental-icon" />
                <p class="desc">
                  <span class="name">风向</span>
                  <b>
                    {{ currentInfo.windDirection }}
                  </b>
                </p>
              </div>
            </li>
            <li>
              <div class="box">
                <img src="../images/green-construction/icon4.png" class="environmental-icon" />
                <p class="desc">
                  <span class="name">湿度</span>
                  <b>
                    {{ currentInfo.humidity }}
                    <span class="unit">rh</span>
                  </b>
                </p>
              </div>
            </li>
            <li>
              <div class="box">
                <img src="../images/green-construction/icon5.png" class="environmental-icon" />
                <p class="desc">
                  <span class="name">风力</span>
                  <b>
                    {{ currentInfo.windPower }}
                    <span class="unit">级</span>
                  </b>
                </p>
              </div>
            </li>
            <li>
              <div class="box">
                <img src="../images/green-construction/icon6.png" class="environmental-icon" />
                <p class="desc">
                  <span class="name">水位</span>
                  <b>
                    {{ currentInfo.waterLevel }}
                  </b>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="environmental-status">
        <ul>
          <li>
            <p class="status-num">
              <b class="first-num">0</b>
              <b>50</b>
            </p>
            <p class="status-line" style="background: #187870;"></p>
            <span class="name" style="color: #80f2ff;">优秀</span>
          </li>
          <li>
            <p class="status-num">
              <b>100</b>
            </p>
            <p class="status-line" style="background: #366885;"></p>
            <span class="name" style="color: #72cfff;">良好</span>
          </li>
          <li>
            <p class="status-num">
              <b>150</b>
            </p>
            <p class="status-line" style="background: #4c773f;"></p>
            <span class="name" style="color: #9feb62;">轻度污染</span>
          </li>
          <li>
            <p class="status-num">
              <b>200</b>
            </p>
            <p class="status-line" style="background: #750b19;"></p>
            <span class="name" style="color: #fa010b;">中度污染</span>
          </li>
          <li>
            <p class="status-num">
              <b>250</b>
            </p>
            <p class="status-line" style="background: #421665;"></p>
            <span class="name" style="color: #8918b5;">重度污染</span>
          </li>
          <li>
            <p class="status-num">
              <b>300</b>
            </p>
            <p class="status-line" style="background: #451528;"></p>
            <span class="name" style="color: #901b37;">严重污染</span>
          </li>
        </ul>
      </div>
      <!-- 实时环境监测 end -->
      <!-- 最近24小时 start -->
      <div class="main-title3">
        <span class="name">最近24小时</span>
      </div>
      <ChartLine container="announcementStatistics" :options="chartOptions" />
      <!-- 最近24小时 end -->
    </div>
    <div class="right">
      <!-- 今日数据（次） start -->
      <div class="main-title2">
        <span class="name">今日数据（次）</span>
      </div>
      <div class="green-construction-list green-construction-right">
        <ul>
          <li>
            <div class="box">
              <div class="chart">
                <span class="name">AQI</span>
                <img src="../images/green-construction/ring4.png" class="garden" />
                <img src="../images/green-construction/ring4-1.png" class="garden-line" />
              </div>
              <div class="target">
                <p class="status status0">
                  <em></em>
                  <span>优秀</span>
                  <b>{{ todayInfo.fine_cts }}</b>
                </p>
                <p class="status status1">
                  <em></em>
                  <span>中度</span>
                  <b>{{ todayInfo.medium_cts }}</b>
                </p>
                <p class="status status2">
                  <em></em>
                  <span>良好</span>
                  <b>{{ todayInfo.good_cts }}</b>
                </p>
                <p class="status status3">
                  <em></em>
                  <span>重度</span>
                  <b>{{ todayInfo.serious_cts }}</b>
                </p>
                <p class="status status4">
                  <em></em>
                  <span>轻度</span>
                  <b>{{ todayInfo.mild_cts }}</b>
                </p>
                <p class="status status5">
                  <em></em>
                  <span>严重</span>
                  <b>{{ todayInfo.grave_cts }}</b>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 今日数据（次） end -->
      <!-- 昨日数据（次） start -->
      <div class="main-title2">
        <span class="name">昨日数据（次）</span>
      </div>
      <div class="green-construction-list green-construction-right">
        <ul>
          <li>
            <div class="box">
              <div class="chart">
                <span class="name">AQI</span>
                <img src="../images/green-construction/ring4.png" class="garden delay2" />
                <img src="../images/green-construction/ring4-1.png" class="garden-line delay2" />
              </div>
              <div class="target">
                <p class="status status0">
                  <em></em>
                  <span>优秀</span>
                  <b>{{ yesterdayInfo.fine_cts }}</b>
                </p>
                <p class="status status1">
                  <em></em>
                  <span>中度</span>
                  <b>{{ yesterdayInfo.medium_cts }}</b>
                </p>
                <p class="status status2">
                  <em></em>
                  <span>良好</span>
                  <b>{{ yesterdayInfo.good_cts }}</b>
                </p>
                <p class="status status3">
                  <em></em>
                  <span>重度</span>
                  <b>{{ yesterdayInfo.serious_cts }}</b>
                </p>
                <p class="status status4">
                  <em></em>
                  <span>轻度</span>
                  <b>{{ yesterdayInfo.mild_cts }}</b>
                </p>
                <p class="status status5">
                  <em></em>
                  <span>严重</span>
                  <b>{{ yesterdayInfo.grave_cts }}</b>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 昨日数据（次） end -->
      <!-- 本周污染点TOP 10 start -->
      <div class="main-title2">
        <span class="name">本周污染点TOP 10</span>
      </div>
      <div class="green-construction-top10">
        <ul>
          <li v-for="(item, i) in topList" :key="i">
            <span class="top-num">{{ i + 1 }}</span>
            <div class="desc">
              <p class="title" v-text="item.title"></p>
              <el-progress :stroke-width="10" :percentage="item.percentage" class="progress"></el-progress>
            </div>
          </li>
        </ul>
      </div>
      <!-- 本周污染点TOP 10 end -->
    </div>
  </div>
</template>

<script>
import ChartLine from '../components/chart-line'
import Api from './api'
export default {
  //import引入的组件需要注入到对象中才能使用
  name: 'home',
  components: {
    ChartLine
  },
  data() {
    //这里存放数据
    return {
      levelList: [
        { label: '优秀', value: [0, 50] },
        { label: '良好', value: [50, 100] },
        { label: '轻度污染', value: [100, 150] },
        { label: '中度污染', value: [150, 200] },
        { label: '重度污染', value: [200, 250] },
        { label: '严重污染', value: [300, Infinity] }
      ],
      currentInfo: {},
      topList: [],
      chartOptions: {
        legend: {
          show: false,
          top: 10,
          right: 0,
          textStyle: {
            color: '#fff'
          }
        },
        xAxis: [
          {
            data: []
          }
        ],
        yAxis: [
          {
            name: '',
            axisLabel: {
              color: 'rgba(151,197,255,0.7)',
              fontSize: 14
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(255,255,255,0.3)'
              }
            }
          }
        ],
        series: [
          {
            name: '温度(℃)',
            type: 'line',
            data: []
          },
          {
            name: '湿度(%RH)',
            type: 'line',
            data: []
          }
        ]
      },
      todayInfo: {},
      yesterdayInfo: {},
      threeInfo: {
        AQI: {},
        pm25: {},
        pm10: {}
      },
      nineInfo: {
        AQI: {},
        pm25: {},
        pm10: {}
      }
    }
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  created() {
    this.refresh()
  },
  //方法集合
  methods: {
    refresh() {
      this.getHourTemperature()
      this.getAQIThisWeek()
      this.devCurrentInfo()
      this.getAQIStaticsTimes()
      this.getPMStatics()
    },
    async getHourTemperature() {
      const res = await Api.getHourTemperature()
      const cloneData = _.cloneDeep(res.data)

      let xData = cloneData.map(r => r.everyHours)
      let templateData = cloneData.map(r => r.wenduValue - 0)
      let humidityData = cloneData.map(r => r.shiduValue - 0)
      this.chartOptions.xAxis[0].data = xData
      this.chartOptions.series[0].data = templateData
      this.chartOptions.series[1].data = humidityData
    },
    async getAQIThisWeek() {
      const res = await Api.getAQIThisWeek({})
      let cloneData = _.cloneDeep(res.data)
      let sortData = _.sortBy(cloneData, 'aqiValue').reverse()

      sortData.map(r => {
        r.title = `${r.deviceAddress} ${r.weekDay} AQI ${r.aqiValue}`
        r.percentage = _.round((r.aqiValue / sortData[0].aqiValue) * 100, 2)
        return r
      })
      this.topList = sortData
    },
    async devCurrentInfo() {
      const res = await Api.devCurrentInfo()
      this.currentInfo = _.cloneDeep(res.data)
    },
    async getAQIStaticsTimes() {
      const todayRes = await Api.getAQIStaticsTimes(0)
      const yesterdayRes = await Api.getAQIStaticsTimes(1)
      this.todayInfo = todayRes.data[0] || {}
      this.yesterdayInfo = yesterdayRes.data[0] || {}
    },

    async getPMStatics() {
      const threePMRes = await Api.getPMStatisticsDays(30)
      const ninePMRes = await Api.getPMStatisticsDays(90)
      this.threeInfo = threePMRes.data
      this.nineInfo = ninePMRes.data
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../../styles/common.less');
//@import url(); 引入公共css类
.green-construction {
  .left {
    width: 360px;
  }
  .center {
    margin: 0 60px;
    padding-top: 40px;
    flex: 1;
    position: relative;
    width: 1076px;
    height: 860px;
  }
  .right {
    width: 414px;
  }
}
.green-construction-list {
  margin-top: 20px;
  ul {
    li {
      margin-bottom: 8px;
      padding: 10px;
      background: #040f26;
      border-radius: 4px;
      .box {
        display: flex;
        align-items: center;
        .chart {
          width: 110px;
          height: 110px;
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: #a5fedb;
          .garden,
          .garden-line {
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: -1;
            top: 0;
            left: 0;
            &.delay2 {
              animation-delay: 2s !important;
            }
          }
          .garden {
            animation: rotateReversalAnimation 4s infinite;
          }
          .garden-line {
            animation: rotateAnimation 3s infinite;
          }
        }
        .target {
          flex: 1;
          &:after {
            content: '';
            clear: both;
            display: table;
          }
          .status {
            margin: 5px 0;
            padding-left: 20px;
            float: left;
            width: 50%;
            font-size: 12px;
            color: #fff;
            display: flex;
            align-items: center;
            em {
              width: 12px;
              height: 6px;
              background: #90e5fa;
              border-radius: 6px;
            }
            span {
              margin: 0 17px 0 7px;
              color: #95ebff;
            }
            b {
              font-size: 16px;
            }
            &.status1 {
              em {
                background: #f4ee60;
              }
              span {
                color: #fff45c;
              }
            }
            &.status2 {
              em {
                background: #14a5d4;
              }
              span {
                color: #13a8d6;
              }
            }
            &.status3 {
              em {
                background: #cd603e;
              }
              span {
                color: #d55f38;
              }
            }
            &.status4 {
              em {
                background: #2c68b6;
              }
              span {
                color: #275ba4;
              }
            }
            &.status5 {
              em {
                background: #f34f53;
              }
              span {
                color: #fe4d4f;
              }
            }
          }
        }
      }
      &:nth-child(1) {
        .garden,
        .garden-line {
          animation-delay: 1s !important;
        }
      }
      &:nth-child(2) {
        .garden,
        .garden-line {
          animation-delay: 2s !important;
        }
      }
      &:nth-child(3) {
        .garden,
        .garden-line {
          animation-delay: 3s !important;
        }
      }
    }
  }
  &.green-construction-right {
    ul {
      li {
        background: none;
      }
    }
    .box .chart {
      width: 132px;
      height: 132px;
    }
  }
}
// 实时环境监控
.environmental {
  display: flex;
  align-items: center;
  .environmental-left {
    width: 240px;
    ul {
      li {
        margin: 20px auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 1;
        width: 102px;
        height: 102px;
        .garden {
          position: absolute;
          z-index: -1;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
        b {
          font-size: 22px;
          font-weight: bold;
          color: #80f2ff;
        }
        span {
          font-size: 12px;
          color: #b4e7ea;
        }
      }
    }
  }
  .environmental-center {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    flex: 1;
    .garden,
    .garden-line {
      width: 255px;
      height: 255px;
      position: absolute;
      z-index: -1;
      top: 50%;
      left: 50%;
      margin-top: -127.5px;
      margin-left: -127.5px;
    }
    .garden {
      animation: rotateScaleAnimation 5s infinite;
    }
    p {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #b4e7ea;
      b {
        font-size: 48px;
        font-weight: bold;
        color: #80f2ff;
        line-height: 1.2;
      }
    }
  }
  .environmental-right {
    margin-left: 69px;
    width: 340px;
    ul {
      &:after {
        .clear;
      }
      li {
        padding: 35px 0;
        width: 50%;
        float: left;
        .box {
          display: flex;
          .environmental-icon {
            margin-right: 20px;
            width: 36px;
            height: 36px;
          }
          .desc {
            display: flex;
            flex-direction: column;
            .name {
              font-size: 16px;
              color: #fff;
            }
            b {
              font-size: 20px;
              font-weight: normal;
              color: #89beff;
              .unit {
                font-size: 11px;
                color: #fff;
                opacity: 0.5;
              }
            }
          }
        }
      }
    }
  }
}
.environmental-status {
  margin: 0 20px 40px;
  ul {
    display: flex;
    align-items: center;
    li {
      flex: 1;
      font-size: 14px;
      .status-num {
        display: flex;
        justify-content: space-between;
        color: #5fb9f4;
        font-size: 20px;
        b {
          flex: 1;
          text-align: right;
          &.first-num {
            text-align: left;
          }
        }
      }
      .status-line {
        margin: 8px 0;
        height: 6px;
      }
      .name {
        display: block;
        text-align: center;
      }
    }
  }
}
// top10
.green-construction-top10 {
  margin-top: 20px;
  ul {
    li {
      margin-bottom: 12px;
      display: flex;
      .top-num {
        width: 50px;
        font-size: 20px;
        color: #6494c5;
        font-weight: bold;
        text-align: center;
      }
      .desc {
        flex: 1;
        .title {
          color: #72d2ec;
          opacity: 0.75;
          font-size: 12px;
        }
        .progress {
          /deep/.el-progress-bar {
            padding-right: 0;
            .el-progress-bar__outer {
              background: none;
              .el-progress-bar__inner {
                background: -webkit-linear-gradient(left, rgba(78, 172, 240, 0) 1%, rgba(78, 172, 240, 0.6));
                background: -webkit-gradient(
                  linear,
                  left left,
                  left right,
                  color-stop(1%, rgba(78, 172, 240, 0)),
                  to(rgba(78, 172, 240, 0.6))
                );
                background: -o-linear-gradient(left, rgba(78, 172, 240, 0) 1%, rgba(78, 172, 240, 0.6) 100%);
                background: linear-gradient(90deg, rgba(78, 172, 240, 0) 1%, rgba(78, 172, 240, 0.6));
                filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="rgba(78,172,240, 0)",endColorstr="rgba(78,172,240, 0.6)",GradientType=0);
              }
            }
          }
          /deep/.el-progress__text {
            display: none;
          }
        }
      }
    }
  }
}
</style>
