<template>
  <div class="labour-services base-wrap">
    <div class="left">
      <!-- 今日进退场统计 start -->
      <div class="main-title">
        <span class="name">今日进退场统计</span>
        <span class="sub">Today's Entry And Exit Statistics</span>
      </div>
      <ChartBar container="entryStatistics" :options="chartBarOptions" y-name="" style="margin-bottom: 40px;" />
      <!-- 今日进退场统计 end -->

      <!-- 今日人员到场率 start -->
      <div class="main-title">
        <span class="name">今日人员到场率</span>
        <span class="sub">Today's Attendance</span>
      </div>
      <div class="attendance">
        <img src="../images/labour-services/ring1.png" class="garden" />
        <el-progress
          type="circle"
          :stroke-width="12"
          color="#6cd6f1"
          :percentage="todayAttendanceRate || 0"
          :show-text="false"
          class="percentage"
        ></el-progress>
        <p class="number">
          <b>{{ todayAttendanceRate || 0 }}</b
          >%
        </p>
        <span class="desc">到场率</span>
      </div>
      <!-- 今日人员到场率 end -->
    </div>
    <div class="center">
      <!-- 现场人员信息表 start -->
      <div class="main-title">
        <span class="name">现场人员信息表</span>
        <span class="sub">On-site Personnel Information</span>
      </div>
      <el-table :data="informationList" height="290" stripe class="information-table">
        <el-table-column prop="name" label="姓名" align="center" />
        <el-table-column prop="groupName" label="班组" align="center" />
        <el-table-column
          prop="workType"
          label="工种"
          align="center"
          :formatter="(row, column, cellValue) => $getLabelFromArg('workType', cellValue)"
        />
        <el-table-column prop="labourCompanyName" label="所属公司" align="center" />
        <el-table-column prop="mobile" label="联系方式" align="center" />
        <el-table-column prop="clockinTime" label="打卡时间" align="center" />
      </el-table>
      <!--      现场人员信息表 end-->
      <el-row :gutter="45">
        <el-col :span="12">
          <div class="main-title">
            <span class="name">工种统计</span>
            <span class="sub">Job Statistics</span>
          </div>
          <ChartBar container="jobStatistics" :options="jobChartOptions" y-name="" />
        </el-col>
        <el-col :span="12">
          <div class="main-title">
            <span class="name">省份统计</span>
            <span class="sub">Province Statistics</span>
          </div>
          <ChartBar container="provinceStatistics" :options="provinceChartOptions" y-name="" />
        </el-col>
      </el-row>
    </div>
    <div class="right">
      <!-- 男女占比 start -->
      <div class="main-title">
        <span class="name">男女占比</span>
        <span class="sub">Proportion Of Men And Women</span>
      </div>
      <div class="proportion-men">
        <ul>
          <li>
            <img src="../images/labour-services/girl.png" class="proportion-img" />
            <div class="desc">
              <p class="title">女生人数</p>
              <p class="number">
                <b>{{ personData.femaleCount }}</b>
                <span>新增{{ personData.addFemaleCount }}人</span>
              </p>
            </div>
          </li>
          <li>
            <img src="../images/labour-services/man.png" class="proportion-img" />
            <div class="desc">
              <p class="title">男生人数</p>
              <p class="number man">
                <b>{{ personData.maleCount }}</b>
                <span>新增{{ personData.addMaleCount }}人</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <HchartPie3D container="proportionMenAndWomen" :dataList="proportionMenAndWomen" />
      <!-- 男女占比 end -->
      <!-- 安全培训 start -->
      <div class="main-title">
        <span class="name">安全培训</span>
        <span class="sub">Safety Training</span>
      </div>
      <ChartSafetyTraining container="safetyTraining" :options="safeChartOptions" />
      <!-- 安全培训 end -->
    </div>
  </div>
</template>

<script>
/*
   任务名称：task#2888 【智慧施工2.0-前端】劳务管理模块切图及功能开发
   开发人员：耿为刚
   日期：2020-04-11
   任务类型：全新代码
 */
import ChartBar from '../components/chart-bar'
import ChartSafetyTraining from '../components/chart-safety-training'
import HchartPie3D from '../components/hchart-pie-3d'
import api from '../api/labour-api'
export default {
  //import引入的组件需要注入到对象中才能使用
  name: 'home',
  components: {
    ChartBar,
    ChartSafetyTraining,
    HchartPie3D
  },
  data() {
    //这里存放数据
    return {
      informationList: [],
      todayAttendanceRate: 0,
      personData: {
        maleCount: 0,
        addMaleCount: 0,
        femaleCount: 0,
        addFemaleCount: 0
      },
      proportionMenAndWomen: [
        {
          name: '女生',
          y: 0
        },
        {
          name: '男生',
          y: 0
        }
      ],
      chartBarOptions: {
        color: ['#ffbb69', '#95ffe9', '#83b2ff'],
        legend: ['进场', '退场'],
        xAxis: [],
        series: [
          {
            name: '进场',
            type: 'bar',
            stack: 'total',
            barWidth: 10,
            data: []
          },
          {
            name: '退场',
            type: 'bar',
            stack: 'total',
            barWidth: 10,
            data: []
          }
        ]
      },
      jobChartOptions: {
        color: ['#ffbb69', '#95ffe9', '#83b2ff'],
        legend: ['进场', '退场'],
        xAxis: [],
        series: [
          {
            name: '进场',
            type: 'bar',
            stack: 'total',
            barWidth: 10,
            data: []
          },
          {
            name: '退场',
            type: 'bar',
            stack: 'total',
            barWidth: 10,
            data: []
          }
        ]
      },
      provinceChartOptions: {
        color: ['#ffbb69', '#95ffe9', '#83b2ff'],
        legend: ['人数'],
        xAxis: [],
        series: [
          {
            name: '人数',
            type: 'bar',
            stack: 'total',
            barWidth: 10,
            data: []
          }
        ]
      },
      safeChartOptions: {
        color: ['#ffbb69', '#95ffe9', '#83b2ff'],
        legend: ['合格人数', '培训人数'],
        xAxis: [],
        series: [
          {
            name: '合格人数',
            type: 'bar',
            stack: 'total',
            barWidth: 10,
            data: []
          },
          {
            name: '培训人数',
            type: 'bar',
            stack: 'total',
            barWidth: 10,
            data: []
          }
        ]
      }
    }
  },
  computed: {
    // 项目id
    projectId() {
      return this.$store.state.project.projectId
    }
  },
  mounted() {
    this.refresh()
  },
  //方法集合
  methods: {
    // 初始化
    refresh() {
      this.getStatistics()
      this.getRage()
      this.getProvince()
      this.getSafe()
    },
    async getStatistics() {
      const res = await api.statistics({ projectId: localStorage.getItem('projectId') })
      // 现场人员信息表
      this.informationList = res.data.sitePersonnelInformationStatisticsResult || []

      //进退场统计
      this.initEnterOut(res.data.todayInOutStatisticsResult)

      //工种统计
      this.initWorkType(res.data.todayJobInOutStatisticsResult)

      //今日人员到场率
      this.todayAttendanceRate = res.data.todayAttendanceRate
    },

    initEnterOut(enterOutData) {
      const inData = _.omit(_.find(enterOutData, { inOutType: 'in' }), ['inOutType'])
      const outData = _.omit(_.find(enterOutData, { inOutType: 'out' }), ['inOutType'])
      this.chartBarOptions.xAxis = Object.keys(inData)
      this.chartBarOptions.series[0].data = Object.values(inData)
      this.chartBarOptions.series[1].data = Object.values(outData)
    },

    initWorkType(workTypeData) {
      const inData = _.omit(_.find(workTypeData, { inOutType: 'in' }), ['inOutType'])
      const outData = _.omit(_.find(workTypeData, { inOutType: 'out' }), ['inOutType'])

      this.jobChartOptions.xAxis = Object.keys(inData)
      this.jobChartOptions.series[0].data = Object.values(inData)
      this.jobChartOptions.series[1].data = Object.values(outData)
    },

    //男女比例以及到场率
    async getRage() {
      const res = await api.personRate()
      this.proportionMenAndWomen = [
        {
          name: '女生',
          y: res.data.femaleCount
        },
        {
          name: '男生',
          y: res.data.maleCount
        }
      ]
      this.personData = res.data
    },

    async getProvince() {
      const res = await api.province()
      const { provinceStatDTOList } = res.data

      const proviceList = provinceStatDTOList.map(r => r.proviceName)
      const proviceCount = provinceStatDTOList.map(r => r.personCount)
      this.provinceChartOptions.xAxis = proviceList
      this.provinceChartOptions.series[0].data = proviceCount
    },

    async getSafe() {
      const res = await api.safeTrain({ projectId: localStorage.getItem('projectId'), monthNum: 3 })
      this.safeChartOptions.series[0].data = _.map(res.data, 'qualifiedEmployeeCount')
      this.safeChartOptions.series[1].data = _.map(res.data, 'unqualifiedEmployeeCount')
      // this.safeChartOptions.series[0].data = [1, 1, 1, 1]
      // this.safeChartOptions.series[1].data = [1, 1, 1, 1]
      this.safeChartOptions.xAxis = _.map(res.data, e => e.trainingDate.slice(0, 4) + '-' + e.trainingDate.slice(4))
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../../styles/common.less');
//@import url(); 引入公共css类
.attendance {
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  width: 302px;
  height: 302px;
  .number {
    color: #b4e7ea;
    b {
      font-size: 30px;
      line-height: 1;
    }
  }
  .desc {
    font-size: 14px;
    color: #b6c4c5;
  }
  .garden {
    position: absolute;
    width: 100%;
    height: 100%;
    animation: rotateAnimation 5s infinite;
  }
  .percentage {
    width: 170px;
    height: 170px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -85px;
    margin-left: -85px;
    /deep/.el-progress-circle {
      width: 100% !important;
      height: 100% !important;
      .el-progress-circle__track {
        display: none;
      }
    }
  }
}
.labour-services {
  .left {
    width: 450px;
  }
  .center {
    margin: 0 40px;
    flex: 1;
    position: relative;
    height: 860px;
  }
  .right {
    width: 414px;
  }
}
.information-table {
  width: 100%;
  margin-top: 25px;
  margin-bottom: 64px;
}
.proportion-men {
  margin: 35px 0 0;
  ul {
    display: flex;
    align-items: center;
    li {
      flex: 1;
      display: flex;
      justify-content: center;
      .proportion-img {
        margin-right: 10px;
        width: 69px;
        height: 83px;
      }
      .desc {
        .title {
          margin-top: 5px;
          font-size: 14px;
          color: #fff;
        }
        .number {
          margin-top: 10px;
          display: inline-flex;
          align-items: flex-end;
          b {
            margin-right: 8px;
            font-size: 24px;
            font-weight: bold;
            color: #22f1cd;
            line-height: 1;
          }
          span {
            font-size: 12px;
            color: #fff;
            opacity: 0.5;
          }
          &.man {
            b {
              color: #2ebeff;
            }
          }
        }
      }
    }
  }
}
</style>
