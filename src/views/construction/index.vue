<template>
  <div class="home-main base-wrap">
    <!-- 项目资料 start -->
    <div class="left">
      <div class="main-title">
        <span class="name">项目资料</span>
        <span class="sub">Project Information</span>
      </div>
      <div class="project-info">
        <ul>
          <li>
            <div class="sub-title">
              <span class="name">项目名称</span>
              <span class="status">在施</span>
            </div>
            <p class="desc active">{{ projectDetails.name }}</p>
          </li>
          <li>
            <div class="sub-title">
              <span class="name">项目地址</span>
            </div>
            <p class="desc">
              {{ projectDetails.province }}-{{ projectDetails.city }}-{{ projectDetails.county }}
              {{ projectDetails.detailAddress }}
            </p>
          </li>
          <li>
            <div class="sub-title">
              <span class="name">项目负责人</span>
            </div>
            <p class="desc">{{ projectDetails.principalName }}</p>
          </li>
          <li>
            <div class="sub-title">
              <span class="name">联系方式</span>
            </div>
            <p class="desc">{{ projectDetails.telephone }}</p>
          </li>
          <li>
            <div class="sub-title">
              <span class="name">工程造价</span>
            </div>
            <p class="desc active">{{ projectDetails.constructionCosts | formatMoney }} 万元</p>
          </li>
          <li>
            <div class="sub-title">
              <span class="name">建筑面积</span>
            </div>
            <p class="desc">{{ projectDetails.buildingArea }} 平方米</p>
          </li>
          <li>
            <div class="sub-title">
              <span class="name">抗震等级</span>
            </div>
            <p class="desc">{{ projectDetails.seismicLevel }} 级</p>
          </li>
          <li>
            <div class="sub-title">
              <span class="name">合同开工日期</span>
            </div>
            <p class="desc">{{ projectDetails.startTime | formatData }}</p>
          </li>
          <li>
            <div class="sub-title">
              <span class="name">合同竣工日期</span>
            </div>
            <p class="desc">{{ projectDetails.endTime | formatData }}</p>
          </li>
          <template v-for="participant in participantList">
            <li v-if="_.size(participant.children)" :key="participant.id">
              <div class="sub-title">
                <span class="name">{{ participant.participantTypeName }}</span>
              </div>
              <p class="desc" v-for="company in participant.children" :key="company.id">
                {{ company.participantCompanyName }}
              </p>
            </li>
          </template>
        </ul>
        <div class="build-bg" v-if="projectDetails.propagandaFileUrl">
          <div class="mask"></div>
          <img :src="projectDetails.propagandaFileUrl" class="build-img" />
        </div>
      </div>
    </div>
    <!-- 项目资料 end -->
    <div class="center">
      <div class="home-btns">
        <span class="btn" :class="{ active: modelTabIndex === 0 }" @click="clickModel(0)">全景图</span>
        <span class="btn" :class="{ active: modelTabIndex === 1 }" @click="clickModel(1)">形象墙</span>
        <span class="btn" :class="{ active: modelTabIndex === 2 }" @click="clickModel(2)">2D平面</span>
        <span class="btn" :class="{ active: modelTabIndex === 3 }" @click="clickModel(3)">BIM模型</span>
      </div>
      <div class="main-title no-line">
        <span class="name">模型展示</span>
        <span class="sub">Model Display</span>
      </div>
      <div class="model-container">
        <span class="model-line top-left-line"></span>
        <span class="model-line top-right-line"></span>
        <span class="model-line bottom-left-line"></span>
        <span class="model-line bottom-right-line"></span>
        <!-- 全景图 start -->
        <div id="modelContainer" v-show="modelTabIndex === 0"></div>
        <!-- 全景图 end -->
        <div class="model-con" v-show="modelTabIndex !== 0">
          <!-- 形象墙 start -->
          <template v-if="modelTabIndex === 1">
            <Slick ref="imageWallRef" :options="imageWallOption">
              <div v-for="(item, i) in imageWallList" :key="i" class="image-wall-list"><img :src="item.fileUrl" /></div>
            </Slick>
          </template>
          <!-- 形象墙 end -->
          <!-- 2D平面 start -->
          <template v-if="modelTabIndex === 2">
            <div class="plan-img">
              <img :src="planImage" class="plan-big" v-if="planImage" />
              <ul>
                <li
                  v-for="(item, i) in planList"
                  :key="i"
                  :class="{ active: item.fileUrl === planImage }"
                  @click="clickPlan(item.fileUrl)"
                >
                  {{ item.fileName }}
                </li>
              </ul>
            </div>
          </template>
          <!-- 2D平面 end -->
          <!-- BIM模型 start -->
          <template v-if="modelTabIndex === 3">
            <Bim class="bim"></Bim>
          </template>
          <!-- BIM模型 end -->
        </div>
      </div>
    </div>
    <div class="right">
      <!-- 进度视图 start -->
      <div class="main-title">
        <span class="name">进度视图</span>
        <span class="sub">Progress View</span>
      </div>
      <div class="progress-view">
        <p class="progress-total">
          <span class="name">任务总数</span><span class="number">{{ progressData.taskTotal }}</span>
        </p>
        <el-progress :stroke-width="22" :percentage="progressPercentage" />
        <v-chart style="width: 100%;height: 170px;" :options="progressChartOptions"></v-chart>
        <ul class="progress-complete">
          <li>
            <h4>完成任务</h4>
            <span class="number">{{ progressData.taskOverNum }}</span>
          </li>
          <li>
            <h4>延期任务</h4>
            <span class="number">{{ progressData.taskDelayNum }}</span>
          </li>
          <li>
            <h4>完成度</h4>
            <span class="number">{{ progressData.taskOverRate }}</span>
          </li>
          <li>
            <h4>延期率</h4>
            <span class="number">{{ progressData.taskDelayRate }}</span>
          </li>
        </ul>
      </div>
      <!-- 进度视图 end -->

      <!-- 今日环境指标 start -->
      <div class="main-title">
        <span class="name">今日环境指标</span>
        <span class="sub">Today's Environmental Indicators</span>
      </div>
      <div class="environmental">
        <ul>
          <li>
            <div class="box">
              <img src="./images/environmental-1-1.png" class="img-l" />
              <img src="./images/environmental-1-2.png" class="img-r" />
              <p>
                <span>PM2.5</span>
                <b style="color: #22c493;">{{ projectWeather.pm25 }}</b>
              </p>
            </div>
          </li>
          <li>
            <div class="box">
              <img src="./images/environmental-2-1.png" class="img-l" />
              <img src="./images/environmental-2-2.png" class="img-r" />
              <p>
                <span>PM10</span>
                <b style="color: #0092e0;">{{ projectWeather.pm10 }}</b>
              </p>
            </div>
          </li>
          <li>
            <div class="box">
              <img src="./images/environmental-3-1.png" class="img-l" />
              <img src="./images/environmental-3-2.png" class="img-r" />
              <p>
                <span>AQI</span>
                <b style="color: #dfc896;">{{ projectWeather.aqi }}</b>
              </p>
            </div>
          </li>
          <li>
            <div class="box">
              <img src="./images/environmental-4-1.png" class="img-l" />
              <img src="./images/environmental-4-2.png" class="img-r" />
              <p>
                <span>温度</span>
                <b style="color: #52cb64;">{{ projectWeather.temperature }}</b>
              </p>
            </div>
          </li>
          <li>
            <div class="box">
              <img src="./images/environmental-5-1.png" class="img-l" />
              <img src="./images/environmental-5-2.png" class="img-r" />
              <p>
                <span>风力</span>
                <b style="color: #1eb7e1;">{{ projectWeather.windPower }}</b>
              </p>
            </div>
          </li>
          <li>
            <div class="box">
              <img src="./images/environmental-6-1.png" class="img-l" />
              <img src="./images/environmental-6-2.png" class="img-r" />
              <p>
                <span>噪音</span>
                <b style="color: #7994e3;">135</b>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <!-- 今日环境指标 end -->

      <!-- 质量视图 start -->
      <div class="main-title">
        <p class="tabs">
          <span class="name" :class="{ active: tabIndex === 0 }" @click="tabIndex = 0">质量视图</span>
          <span class="name" :class="{ active: tabIndex === 1 }" @click="tabIndex = 1">安全视图</span>
        </p>
        <span class="sub">ModelVersion</span>
      </div>
      <HchartPie3D container="quality" :dataList="qualityChartOptions.series[0].data" v-if="tabIndex === 0" />
      <HchartPie3D container="safe" :dataList="safeChartOptions.series[0].data" v-if="tabIndex === 1" />
      <!-- 质量视图 end -->
    </div>
  </div>
</template>

<script>
/*
     任务名称：task#2885 【智慧施工2.0-前端】首页切图及功能开发
     开发人员：耿为刚
     日期：2020-04-07
     任务类型：全新代码
   */
import Bim from '@/views/bimView/index'
import Slick from 'vue-slick'
import 'slick-carousel/slick/slick.css'
import HchartPie3D from '@/views/construction/components/hchart-pie-3d'
import api from '@/api/homeApi'
import { homeApi } from './api/home-api'
const gaugeChartObj = {
  type: 'gauge',
  title: {
    show: true,
    offsetCenter: [0, '95%'],
    color: '#c0defe',
    fontSize: 15,
    borderRadius: 21,
    padding: 5
  },
  detail: {
    offsetCenter: [0, '60%'],
    textStyle: {
      fontSize: 18,
      color: '#2ed2d9',
      fontWeight: 'bold'
    },
    formatter: '{value}%'
  },
  min: 0,
  max: 100,
  axisLine: {
    lineStyle: {
      color: [
        [80 / 100, '#18b7ec'],
        [1, '#0d3964']
      ],
      width: 10
    }
  },
  axisLabel: {
    show: true,
    color: '#2ed2d9',
    distance: 0,
    textStyle: {
      fontSize: 9
    },
    formatter: function(v) {
      if ([0, 20, 40, 60, 80, 100].includes(v)) {
        return v
      } else {
        return ''
      }
    }
  },
  axisTick: {
    splitNumber: 5,
    length: 15,
    lineStyle: {
      color: '#18b7ec'
    }
  },
  splitLine: {
    length: 18,
    lineStyle: {
      color: '#18b7ec'
    }
  },
  pointer: {
    length: 50,
    width: 3
  }
}
export default {
  //import引入的组件需要注入到对象中才能使用
  name: 'home',
  components: {
    Slick,
    Bim,
    HchartPie3D
  },
  data() {
    //这里存放数据
    return {
      projectDetails: {
        baseInfo: {},
        extInfo: {}
      }, // 项目详情
      progressData: {},
      progressChartOptions: {
        series: [
          _.merge({}, gaugeChartObj, {
            center: ['25%', '50%'],
            name: '本月进度',
            data: [{ name: '本月进度', value: 0 }]
          }),
          _.merge({}, gaugeChartObj, {
            center: ['75%', '50%'],
            name: '年计划进度',
            data: [{ name: '年计划进度', value: 30 }]
          })
        ]
      },
      progressPercentage: 0,
      modelTabIndex: 0,
      panorama: {},
      imageWallOption: {
        slidesToShow: 1,
        autoplay: true,
        dots: true,
        arrows: false
      },
      // 形象墙
      //imageWallList: [],
      planIndex: 0,
      // 2D平面图
      planImage: '',
      planList: [],
      tabIndex: 0,
      // 质量视图
      qualityChartOptions: {
        chart: {
          type: 'pie',
          options3d: {
            enabled: false,
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
            data: []
          }
        ]
      },
      // 安全视图
      safeChartOptions: {
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
            name: '安全',
            data: []
          }
        ]
      },
      /**
       * 参项单位列表
       */
      participantList: []
    }
  },
  computed: {
    // 项目id
    projectId() {
      return this.$store.state.project.projectId
    },
    // 项目天气资料
    projectWeather() {
      return this.$store.state.project.projectWeather
    },
    participantTypeList() {
      this.$getArgList('construction_participantType')
    },
    //建设单位
    constructionParticipant() {
      let list = this.$getArgList('construction_participantType')
      return (
        _.find(this.projectDetails.participantDTOList, { type: _.find(list, { label: '建设单位' })?.value })
          ?.participateCompanyName || '-'
      )
    },
    //监理单位
    supervisionParticipant() {
      let list = this.$getArgList('construction_participantType')
      return (
        _.find(this.projectDetails.participantDTOList, { type: _.find(list, { label: '监理单位' })?.value })
          ?.participateCompanyName || '-'
      )
    },
    //施工单位
    buildingParticipant() {
      let list = this.$getArgList('construction_participantType')
      return (
        _.find(this.projectDetails.participantDTOList, { type: _.find(list, { label: '施工单位' })?.value })
          ?.participateCompanyName || '-'
      )
    },
    //设计单位
    designParticipant() {
      let list = this.$getArgList('construction_participantType')
      return (
        _.find(this.projectDetails.participantDTOList, { type: _.find(list, { label: '设计单位' })?.value })
          ?.participateCompanyName || '-'
      )
    },
    //形象墙
    imageWallList() {
      return _.filter(this.projectDetails.imageList, { imageType: 3 }) || []
    }
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.init()
  },
  //方法集合
  methods: {
    // 初始化
    init() {
      this.getProgressData()
      this.getQualityData()
      this.getSafeData()
      this.getProject()
      //this.getProjectPlanImage()
      //this.getProjectProgressImage()
      this.onresize()
    },
    // 监听窗口改变
    onresize() {
      this.$nextTick(() => {
        if (this.$parent.onresize) {
          this.$parent.onresize()
        }
      })
    },
    /*// 查询项目2D平面图
    async getProjectPlanImage() {
      const result = await homeApi.getProjectPlanImage(this.projectId)
      let datas = result.data || []
      this.planList = datas
      if (datas.length > 0) {
        this.planImage = datas[0].fileUrl
      }
    },*/
    // 切换平面图
    clickPlan(img) {
      this.planImage = img
    },
    /* // 查询项目形象进度图
    async getProjectProgressImage() {
      const result = await homeApi.getProjectProgressImage(this.projectId)
      let datas = result.data || []
      this.imageWallList = datas
    },*/
    // 查询项目详情
    async getProject() {
      if (!this.projectId) {
        return
      }
      const result = await homeApi.getProject(this.projectId)
      const datas = result.data
      datas.baseInfo = datas.baseInfo || {}
      datas.extInfo = datas.extInfo || {}
      this.projectDetails = datas
      let baseInfo = datas.baseInfo || {}
      let extInfo = datas.extInfo || {}
      this.projectDetails = {
        ...datas,
        ...baseInfo,
        ...extInfo
      }
      //2d平面图
      this.planList = _.filter(this.projectDetails.imageList, { imageType: 4 }) || []
      this.planImage = this.planList[0]?.fileUrl
      this.initPanorama()
      this.getParticipant()
    },
    /**
     * 获取参项单位
     */
    getParticipant() {
      this.axios.system.post('project/participant/tree', { projectId: this.projectId }).then(res => {
        this.participantList = res.data || []
      })
    },

    // 初始化全景图
    initPanorama() {
      this.$nextTick(() => {
        const modelContainer = document.getElementById('modelContainer')
        let panorama = _.find(this.projectDetails.imageList, { imageType: 2 })?.fileUrl
        this.panorama = new PhotoSphereViewer({
          // Path to the panorama
          panorama: panorama || require('./images/tmp/sun.jpg'),
          // Container
          container: modelContainer,
          time_anim: 2000,
          // Display the navigation bar
          navbar: true,
          // Resize the panorama
          size: {
            width: '100%',
            height: '100%'
          }
        })
      })
    },
    // 初始化轮播图
    initSlick() {
      this.$nextTick(() => {
        this.$refs.imageWallRef.reSlick()
      })
    },
    // 模型展示tab切换
    clickModel(i) {
      this.modelTabIndex = i
      if (i === 1) {
        this.initSlick()
      }
    },
    //进度视图
    async getProgressData() {
      const gaugeChartObj = {
        type: 'gauge',
        title: {
          show: true,
          offsetCenter: [0, '95%'],
          color: '#c0defe',
          fontSize: 12,
          borderRadius: 21,
          padding: 5
        },
        detail: {
          offsetCenter: [0, '60%'],
          textStyle: {
            fontSize: 14,
            color: '#2ed2d9',
            fontWeight: 'bold'
          },
          formatter: '{value}%'
        },
        min: 0,
        max: 100,
        axisLine: {
          lineStyle: {
            color: [
              [80 / 100, '#18b7ec'],
              [1, '#0d3964']
            ],
            width: 10
          }
        },
        axisLabel: {
          show: true,
          color: '#2ed2d9',
          distance: 0,
          textStyle: {
            fontSize: 9
          },
          formatter: function(v) {
            if ([0, 20, 40, 60, 80, 100].includes(v)) {
              return v
            } else {
              return ''
            }
          }
        },
        axisTick: {
          splitNumber: 5,
          length: 15,
          lineStyle: {
            color: '#18b7ec'
          }
        },
        splitLine: {
          length: 18,
          lineStyle: {
            color: '#18b7ec'
          }
        },
        pointer: {
          length: 50,
          width: 3
        }
      }
      let progressRes = await api.progress()
      let taskOverRate = progressRes.data.taskOverRate
      this.progressData = progressRes.data
      this.progressPercentage = taskOverRate ? parseInt(taskOverRate.split('%')[0]) : 0
      this.progressChartOptions.series = [
        _.merge({}, gaugeChartObj, {
          center: ['25%', '50%'],
          name: '本月进度',
          data: [{ name: '本月进度', value: (progressRes.data.curMonthProgress * 100).toFixed(2) }]
        }),
        _.merge({}, gaugeChartObj, {
          center: ['75%', '50%'],
          name: '年计划进度',
          data: [{ name: '年计划进度', value: (progressRes.data.yearPlanProgress * 100).toFixed(2) }]
        })
      ]
    },
    //质量视图
    async getQualityData() {
      let res = await api.checkCount({ planTypes: [1] })
      this.qualityChartOptions.series[0].data = [
        {
          name: '一般问题',
          y: res.data.general,
          color: '#36aeda'
        },
        {
          name: '较大问题',
          y: res.data.larger,
          color: '#22c1aa'
        },

        {
          name: '重大问题',
          y: res.data.great,
          sliced: true,
          selected: true,
          color: '#1e82e0'
        },
        {
          name: '特大问题',
          y: res.data.severity,
          color: '#ccc650'
        }
      ]
    },
    //安全视图
    async getSafeData() {
      let res = await api.checkCount({ planTypes: [2] })
      this.safeChartOptions.series[0].data = [
        {
          name: '一般隐患',
          y: res.data.general,
          color: '#36aeda'
        },
        {
          name: '较大隐患',
          y: res.data.larger,
          color: '#22c1aa'
        },
        {
          name: '重大隐患',
          y: res.data.great,
          sliced: true,
          selected: true,
          color: '#1e82e0'
        },
        {
          name: '严重隐患',
          y: res.data.severity,
          color: '#ccc650'
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../styles/common.less');
//@import url(); 引入公共css类

.home-main {
  .left {
    width: 388px;
  }
  .center {
    margin: 0 20px;
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
.project-info {
  height: 920px;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.2);
  ul {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    li {
      padding: 15px 15px 8px;
      font-size: 14px;
      position: relative;
      &:after {
        content: '';
        width: 100%;
        height: 1px;
        position: absolute;
        bottom: 0;
        left: 0;
        background: url('./images/d-line.png') left no-repeat;
        animation: scaleAnimation 4s infinite;
      }
      @delay: 200ms;
      &:nth-child(1):after {
        animation-delay: 1 * @delay;
      }
      &:nth-child(2):after {
        animation-delay: 2 * @delay;
      }
      &:nth-child(3):after {
        animation-delay: 3 * @delay;
      }
      &:nth-child(4):after {
        animation-delay: 4 * @delay;
      }
      &:nth-child(5):after {
        animation-delay: 5 * @delay;
      }
      &:nth-child(6):after {
        animation-delay: 6 * @delay;
      }
      &:nth-child(7):after {
        animation-delay: 7 * @delay;
      }
      &:nth-child(8):after {
        animation-delay: 8 * @delay;
      }
      &:nth-child(9):after {
        animation-delay: 9 * @delay;
      }
      &:nth-child(10):after {
        animation-delay: 10 * @delay;
      }
      &:nth-child(11):after {
        animation-delay: 11 * @delay;
      }
      &:nth-child(12):after {
        animation-delay: 12 * @delay;
      }
      .sub-title {
        margin-bottom: 5px;
        padding-left: 18px;
        background: url('./images/sub-title.png') left center no-repeat;
        display: flex;
        align-items: center;
        height: 26px;
        .name {
          color: @primary-color;
          font-weight: bold;
        }
        .status {
          margin-left: 10px;
          padding: 2px 5px;
          font-size: 12px;
          color: #fff;
          background: #043056;
          border-radius: 3px;
        }
      }
      .desc {
        padding-left: 18px;
        line-height: 2.5;
        &.active {
          color: @warning-color;
        }
      }
      &:last-child {
        border: 0;
      }
    }
  }

  .build-bg {
    margin-top: 30px;
    padding: 10px 25px;
    background: url('./images/build.png') top center no-repeat;
    width: 100%;
    height: 187px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    &:before {
      content: '';
      position: absolute;
      top: -15px;
      left: 0;
      border-top: 1px #5e5e5e dashed;
      width: 100%;
      height: 1px;
    }
    .mask {
      width: 339px;
      height: 176px;
      position: absolute;
      overflow: hidden;
      &:before {
        content: '';
        animation: moveDownAnimation 4s linear infinite;
        z-index: 3;
        position: absolute;
        left: 0;
        top: 0;
        height: 30px;
        width: 100%;
        background: rgba(37, 100, 146, 0);
        background: -webkit-linear-gradient(top, rgba(37, 100, 146, 0) 1%, rgba(37, 100, 146, 0.6));
        background: -webkit-gradient(
          linear,
          left top,
          left bottom,
          color-stop(1%, rgba(37, 100, 146, 0)),
          to(rgba(37, 100, 146, 0.6))
        );
        background: -o-linear-gradient(top, rgba(37, 100, 146, 0) 1%, rgba(37, 100, 146, 0.6) 100%);
        background: linear-gradient(180deg, rgba(37, 100, 146, 0) 1%, rgba(37, 100, 146, 0.6));
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="rgba(37, 100, 146, 0)",endColorstr="rgba(37, 100, 146, 0.6)",GradientType=0);
      }
    }
    .build-img {
      width: 100%;
      height: 100%;
    }
  }
}
.home-btns {
  position: absolute;
  top: 30px;
  right: 0;
  z-index: 3;
  .btn {
    margin-right: 17px;
    background: url('./images/btn.png') no-repeat;
    width: 115px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.4s;
    &:hover,
    &.active {
      background-image: url('./images/btn-hover.png');
      color: #fff;
    }
    &.active {
      animation: fadeAnimation 4s infinite;
    }
  }
}
.model-container {
  padding: 20px;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
  .model-line {
    position: absolute;
    background: url('./images/model-line.png');
    width: 152px;
    height: 143px;
    z-index: -1;
    &.top-left-line {
      top: 0;
      left: 0;
    }
    &.top-right-line {
      top: 0;
      right: 0;
      transform: rotate(90deg);
    }
    &.bottom-right-line {
      bottom: 0;
      right: 0;
      transform: rotate(180deg);
    }
    &.bottom-left-line {
      bottom: 0;
      left: 0;
      transform: rotate(-90deg);
    }
  }
  #modelContainer,
  .model-con {
    width: 100%;
    height: 100%;
    // border: 1px #44626c solid;
    border: 1px rgba(0, 0, 0, 0.8) solid;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
    background: #fff;
    img {
      outline: none;
    }
  }
  .model-con {
    width: 1018px;
  }
}
/deep/.bim {
  height: 100%;
}
// 形象墙
.image-wall-list {
  img {
    height: 778px;
  }
}
// 2D平面图
.plan-img {
  display: flex;
  .plan-big {
    width: 700px;
    height: 778px;
    transition: all 0.4s;
  }
  ul {
    margin: 20px;
    flex: 1;
    li {
      margin-bottom: 10px;
      background: #142948;
      cursor: pointer;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.4s;
      &.active {
        background: #194c69;
      }
    }
  }
}
// 进度视图
.progress-view {
  margin-bottom: 50px;
  color: @sub-color;
  font-size: 14px;
  .number {
    color: @warning-color;
    font-size: 16px;
  }
  .progress-total {
    margin: 10px 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    .name {
      margin-right: 10px;
    }
  }
  .progress-complete {
    display: flex;
    li {
      flex: 1;
      position: relative;
      height: 42px;
      display: inline-block;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      &:after {
        content: '';
        background: url('./images/line.png');
        width: 1px;
        height: 42px;
        position: absolute;
        top: 0;
        right: 0;
      }
      &:last-child:after {
        display: none;
      }
    }
  }
}
/deep/.el-progress {
  display: flex;
  align-items: center;
  .el-progress-bar {
    flex: 1;
  }
}
/deep/.el-progress__text {
  display: inline-flex;
  flex-direction: column;
  &:before {
    margin-bottom: 5px;
    content: '总完成度';
    font-size: 12px;
    color: #bfdeff;
    opacity: 0.7;
  }
  font-size: 20px;
  color: #64e0ff;
}
/deep/.el-progress-bar__outer {
  border-radius: 0;
  background: none;
  border: 1px #475d68 solid;
  position: relative;
  overflow: inherit;
  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 7px;
    left: 0;
    bottom: -7px;
    background: url('./images/progress-line.png');
  }
}
/deep/.el-progress-bar__inner {
  background: url('./images/progress.png') no-repeat;
  border-radius: 0;
  left: 2px;
  top: 2px;
  height: 15px;
  .el-progress-bar__innerText {
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;
    color: #fff;
    font-size: 12px;
    margin: 0 5px;
  }
}
// 环境指标
.environmental {
  margin-bottom: 25px;
  &:after {
    content: '';
    clear: both;
    display: table;
  }
  ul {
    li {
      padding: 15px 0;
      float: left;
      width: 50%;
      display: inline-flex;
      justify-content: center;
      .box {
        padding-top: 6px;
        padding-left: 48px;
        position: relative;
        .img-l {
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;
          animation-name: rotateAnimation;
          animation-duration: 4s;
          animation-delay: 1s;
          animation-iteration-count: infinite;
        }
        p {
          position: absolute;
          left: 75px;
          top: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 61px;
          font-size: 12px;
          color: #b0b4b7;
        }
      }
      &:nth-child(2) {
        .box .img-l {
          animation-delay: 2s;
        }
      }
      &:nth-child(3) {
        .box .img-l {
          animation-delay: 3s;
        }
      }
      &:nth-child(4) {
        .box .img-l {
          animation-delay: 4s;
        }
      }
      &:nth-child(5) {
        .box .img-l {
          animation-delay: 5s;
        }
      }
      &:nth-child(6) {
        .box .img-l {
          animation-delay: 6s;
        }
      }
    }
  }
}
/deep/.slick-dots {
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  bottom: 20px;
  width: 100%;
  li {
    margin: 0 5px;
    width: 10px;
    height: 3px;
    background: rgba(255, 255, 255, 0.2);
    transition: all 0.4s;
    cursor: pointer;
    button {
      display: none;
    }
    &.slick-active {
      width: 20px;
      background: rgba(255, 255, 255, 1);
    }
  }
}
</style>
