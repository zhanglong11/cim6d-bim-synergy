<template>
  <div class="world-map" :class="{ isGlobal: tabIndex === 1 }">
    <div :id="container" :class="containerClass" style="height: 800px;" v-show="tabIndex === 1"></div>
    <div class="project-business base-wrap" v-if="tabIndex === 2">
      <div class="left">
        <img src="./construction/images/map/left.png" />
        <div class="main-title">
          <span class="name">近期中标项目</span>
        </div>
        <div class="project-list">
          <ul>
            <li v-for="(item, index) in projectList" :key="item.id">
              <span class="top-list">{{ index + 1 }}</span>
              <div class="project-content">
                <p class="title" v-text="item.name" @click="selectProject(item)"></p>
                <p class="desc">
                  <span>{{ 9642 * (index + 1) }}万</span>
                  <span>{{ item.createTime | formatData }}</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
        <!-- <div class="main-title">
          <span class="name">企业经营状况</span>
        </div>
        <p>目标<span>2.420亿</span></p>
        <div>
          <EchartPie
            :dataList="managementChartList"
            :color="managementChartColor"
            isHollow
            :isLegend="false"
            container="qualityChart"
          ></EchartPie>
        </div>
        <div class="main-title">
          <span class="name">产值统计</span>
        </div>
        <ChartBar container="putputStatistics" :options="chartBarOptions" /> -->
      </div>
      <div class="right">
        <img src="./construction/images/map/right.png" />
      </div>
      <EchartsMap
        ref="echartsMapRef"
        v-if="tabIndex === 2"
        :chinaData="chinaData"
        :provinceData="provinceData"
        @getProvince="getProvince"
        @onChange="selectProject"
      />
    </div>
    <div class="world-footer">
      <p :class="{ active: tabIndex === 0 }" @click="clickTab(1)">
        <img src="./construction/images/map/close.png" />
        Close
      </p>
      <p :class="{ active: tabIndex === 1 }" @click="clickTab(1)">
        <img src="./construction/images/map/earth.png" />
        Earth
      </p>
      <p :class="{ active: tabIndex === 2 }" @click="clickTab(2)">
        <img src="./construction/images/map/china.png" />
        China
      </p>
    </div>
  </div>
</template>

<script>
import Echarts from 'echarts'
import EchartsMap from '@/components/Map'
import api from '@/api/homeApi'
require('echarts-gl')
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    EchartsMap
  },
  props: {
    // 图表容器
    container: {
      type: String,
      default: 'echartBar'
    }
  },
  data() {
    //这里存放数据
    return {
      containerClass: '',
      tabIndex: 1,
      managementChartColor: ['#67e0e3', '#e69460'],
      managementChartList: [
        { value: 1.32, name: '完成度' },
        { value: 1.1, name: '剩余度' }
      ],
      chartBarOptions: {
        color: ['#ffbb69', '#95ffe9', '#83b2ff'],
        legend: ['在场', '退场', '进场'],
        xAxis: ['1', '2', '3', '4', '5', '6', '7', '8'],
        series: [
          {
            name: '在场',
            type: 'bar',
            stack: 'total',
            barWidth: 10,
            data: [50, 5, 10, 15, 30, 40, 10, 17]
          },
          {
            name: '退场',
            type: 'bar',
            stack: 'total',
            barWidth: 10,
            data: [50, 10, 20, 10, 10, 15, 30, 16]
          },
          {
            name: '进场',
            type: 'bar',
            stack: 'total',
            barWidth: 10,
            data: [50, 30, 35, 40, 30, 25, 40, 15]
          }
        ]
      },
      // 全国数据
      chinaData: [{ name: '河南省', value: 1, type: 'province' }],
      // 省份数据
      provinceData: [],
      projectList: [] // 中标项目数据
    }
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initChart()
    this.getChinaData()
    this.getProjectData()
  },
  //方法集合
  methods: {
    // 初始化
    initChart() {
      let option = {
        //backgroundColor: '#000',
        globe: {
          baseTexture: require('./construction/images/map/world.jpg'),
          displacementScale: 0.5,
          shading: 'color',
          postEffect: {
            enable: true
          },
          light: {
            main: {
              intensity: 5,
              shadow: true
            },
            ambientCubemap: {
              diffuseIntensity: 0.2
            }
          }
        }
      }
      this.$nextTick(() => {
        const myChart = Echarts.init(document.getElementById(this.container))
        myChart.setOption(option)
        setTimeout(() => {
          this.containerClass = 'world-scale'
        }, 1000)
        setTimeout(() => {
          this.clickTab(2)
        }, 3000)
      })
    },
    // 底部导航点击事件
    clickTab(e) {
      this.tabIndex = e
    },
    // 获取项目数据
    getProjectData() {
      this.axios.system.get('cim6d/system/user/project/list', {}).then(res => {
        let list = res.data || []
        list.map(item => {
          item.projectId = item.id
        })
        this.projectList = list
      })
    },
    // 获取全国数据
    getChinaData() {
      this.axios.system.post('cim6d/system/project/statistics', { flag: 1 }).then(res => {
        this.chinaData = res.data.map(e => ({ ...e, type: 'province' }))
      })
    },
    // 获取省份数据
    getProvince(name) {
      this.axios.system.post('cim6d/system/project/statistics', { flag: 2, name }).then(res => {
        this.provinceData = _.flatMap(res.data, city =>
          city.projectList.map(project => ({ ...project, name: city.name, value: city.value }))
        )
      })
    },
    // 选择项目
    async selectProject(obj) {
      const projectInfo = await this.getProjectInfo(obj.projectId)
      this.$store.commit('setProjectLocalStorage', {
        ...obj,
        ...{ projectLongitude: projectInfo?.longitude || null, projectLatitude: projectInfo?.latitude || null }
      })
      this.$store.commit('setSystemConfigStorage')
    },
    //获取项目坐标
    async getProjectInfo(id) {
      const res = await api.project(id)
      return res.data
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../styles/common.less');
// 放大
@keyframes scaleWorldAnimation {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}
//@import url(); 引入公共css类
.world-map {
  height: 100%;
  &.isGlobal {
    padding: 10%;
  }
  .world-scale {
    animation: scaleWorldAnimation 3s;
  }
  .world-footer {
    position: fixed;
    z-index: 9;
    left: 50%;
    bottom: 0;
    margin-left: -960px;
    width: 1920px;
    height: 85px;
    background: url('./construction/images/map/world-footer.png') bottom center no-repeat;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    p {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 188px;
      color: rgba(255, 255, 255, 0.3);
      border-left: 1px #0f2741 solid;
      border-right: 1px #07182f solid;
      cursor: pointer;
      transition: all 0.4s;
      img {
        width: 28px;
        height: 28px;
        opacity: 0.5;
        transition: all 0.4s;
      }
      &:first-child {
        border-left: 0;
      }
      &:last-child {
        border-right: 0;
      }
      &:hover,
      &.active {
        color: #fff;
        img {
          opacity: 1;
        }
      }
    }
  }
}
.project-business {
  position: relative;
  .left,
  .right {
    margin-top: 25px;
    position: absolute;
    z-index: 3;
    width: 378px;
    img {
      width: 100%;
      height: auto;
    }
  }
  .right {
    right: 0;
  }
}
.project-list {
  padding: 0 25px;
  ul {
    li {
      padding: 15px 0;
      border-bottom: 1px #323232 dashed;
      display: flex;
      font-size: 12px;
      .top-list {
        margin-right: 15px;
        background: url('./construction/images/map/top10.png') no-repeat;
        width: 21px;
        height: 21px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .project-content {
        flex: 1;
        .title {
          margin-bottom: 5px;
          color: #fff;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.4s;
          &:hover {
            color: @main-color;
          }
        }
        .desc {
          display: flex;
          justify-content: space-between;
          color: #666;
        }
      }
    }
  }
}
/deep/.echarts-map {
  height: 930px;
}
</style>
