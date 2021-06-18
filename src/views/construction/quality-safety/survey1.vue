<template>
  <div class="surver-wrap base-wrap">
    <div class="surver-main">
      <!-- 质量问题 start -->
      <div class="main-title2">
        <span class="name">质量问题</span>
      </div>
      <el-row>
        <el-col :span="10">
          <el-row>
            <!-- 质量验收 start -->
            <el-col :span="12">
              <div class="chart-con chart-1">
                <span class="title">质量验收</span>
                <EchartPie
                  :dataList="qualityChartList"
                  :color="qualityChartColor"
                  isHollow
                  :isLegend="false"
                  container="qualityChart"
                />
              </div>
              <div class="chart-label">
                <ul>
                  <li v-for="(item, i) in qualityChartList" :key="i">
                    <p>
                      <i class="label" :style="`background: ${qualityChartColor[i]}`"></i>
                      {{ item.name }}
                    </p>
                    <p>
                      <b :style="`color: ${qualityChartColor[i]}`">{{ item.value }}</b
                      >个
                    </p>
                  </li>
                </ul>
              </div>
            </el-col>
            <!-- 质量验收 end -->
            <!-- 质量问题 start -->
            <el-col :span="12">
              <div class="chart-con chart-2">
                <span class="title">质量问题</span>
                <EchartPie
                  :dataList="qualityQuestionChartList"
                  :color="qualityChartColor"
                  isHollow
                  :isLegend="false"
                  container="qualityQuestionChart"
                />
              </div>
              <div class="chart-label">
                <ul>
                  <li v-for="(item, i) in qualityQuestionChartList" :key="i">
                    <p>
                      <i class="label" :style="`background: ${qualityChartColor[i]}`"></i>
                      {{ item.name }}
                    </p>
                    <p>
                      <b :style="`color: ${qualityChartColor[i]}`">{{ item.value }}</b
                      >个
                    </p>
                  </li>
                </ul>
              </div>
            </el-col>
            <!-- 质量问题 end -->
          </el-row>
        </el-col>
        <el-col :span="14">
          <div class="table-list">
            <ul>
              <li v-for="(item, i) in qualityTableList" :key="i">
                <p :class="`level text-color${i + 1}`">
                  <b
                    ><img :src="require(`../images/survey/icon${i + 1}.png`)" />{{
                      _.find(qualityLevelList, { value: item.problemGrade }).label
                    }}</b
                  >
                </p>
                <p class="name">
                  <b :class="`text-color${i + 1}`"
                    >{{ _.find(qualityLevelList, { value: item.problemGrade }).title }}（占比：{{
                      _.ceil((item.problemGradeCount * 100) / _.sumBy(qualityTableList, 'problemGradeCount'), 1)
                    }}%）</b
                  >
                </p>
                <p class="desc">
                  <span>存在问题</span>
                  <b class="text-color1">{{ item.problemGradeCount }}</b>
                </p>
                <p class="status">
                  <span>已整改</span>
                  <b class="text-color4">{{ item.problemGradeRectificationCount }}</b>
                </p>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
      <!-- 质量问题 end -->
      <!-- 安全问题 start -->
      <div class="main-title2">
        <span class="name">安全问题</span>
      </div>
      <el-row>
        <el-col :span="10">
          <el-row>
            <!-- 安全问题 start -->
            <el-col :span="12">
              <div class="chart-pie-con chart-3">
                <span class="title">安全问题</span>
                <EchartPie
                  :dataList="securityChartList"
                  :color="securityChartColor"
                  :isLegend="false"
                  container="securityChart"
                />
              </div>
              <div class="chart-label">
                <ul>
                  <li v-for="(item, i) in securityChartList" :key="i">
                    <p>
                      <i class="label" :style="`background: ${securityChartColor[i]}`"></i>
                      {{ item.name }}
                    </p>
                    <p>
                      <b :style="`color: ${securityChartColor[i]}`">{{ item.value }}</b
                      >个
                    </p>
                  </li>
                </ul>
              </div>
            </el-col>
            <!-- 安全问题 end -->
            <!-- 安全文明问题 start -->
            <el-col :span="12">
              <div class="chart-pie-con chart-4">
                <span class="title">安全文明问题</span>
                <EchartPie
                  :dataList="securityCivilizationChartList"
                  :color="securityCivilizationChartColor"
                  :isLegend="false"
                  container="securityCivilizationChart"
                />
              </div>
              <div class="chart-label">
                <ul>
                  <li v-for="(item, i) in securityCivilizationChartList" :key="i">
                    <p>
                      <i class="label" :style="`background: ${securityCivilizationChartColor[i]}`"></i>
                      {{ item.name }}
                    </p>
                    <p>
                      <b :style="`color: ${securityCivilizationChartColor[i]}`">{{ item.value }}</b
                      >个
                    </p>
                  </li>
                </ul>
              </div>
            </el-col>
            <!-- 安全文明问题 end -->
          </el-row>
        </el-col>
        <el-col :span="14">
          <div class="table-list" style="margin-top: 60px;">
            <ul>
              <li v-for="item in safeList" :key="item.id">
                <p :class="`level text-color${5 - item.levels}`">
                  <b
                    ><img v-if="item.levels" :src="require(`../images/survey/icon${5 - item.levels}.png`)" />
                    {{ _.get(_.find(safeLevelList, { value: item.levels }), 'label') }}
                  </b>
                </p>
                <p class="name">
                  <b :class="`text-color${5 - item.levels}`">
                    {{ _.get(_.find(safeLevelList, { value: item.levels }), 'title') }}
                  </b>
                  <span>{{ _.get(_.find(safeLevelList, { value: item.levels }), 'desc') }}</span>
                </p>
                <p class="desc">
                  <span>事故数</span>
                  <b class="text-color1">{{ item.totalCount }}</b>
                </p>
                <p class="status">
                  <span>已整改</span>
                  <b class="text-color4">{{ item.rectifyCount }}</b>
                </p>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
      <!-- 安全问题 end -->
    </div>
  </div>
</template>

<script>
/*
     任务名称：task#2889 【智慧施工2.0-前端】质量与安全模块切图及功能开发
     开发人员：耿为刚
     日期：2020-04-14
     任务类型：全新代码
   */
import EchartPie from '../components/chart-pie'
import { qualityApi } from '../api/quality-api'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    EchartPie
  },
  data() {
    //这里存放数据
    return {
      qualityChartColor: ['#67e0e3', '#e69460'],
      qualityChartList: [
        { value: 368, name: '质量验收计划' },
        { value: 126, name: '已验收' }
      ],
      qualityQuestionChartList: [
        { value: 124, name: '一次验收合格率' },
        { value: 16, name: '验收返修' }
      ],
      qualityTableTotal: 50, // 质量问题table汇总
      qualityTableList: [
        {
          urgency: '一',
          urgencyCount: 10,
          checkResultCount: 5
        }
      ], // 质量问题table数据
      qualityLevelList: [
        { value: 1, label: '等级一', title: '一般隐患' },
        { value: 2, label: '等级二', title: '较大隐患' },
        { value: 3, label: '等级三', title: '严重隐患' },
        { value: 4, label: '等级四', title: '重大隐患' }
      ],
      securityChartColor: ['#009ec8', '#00db58', '#bfbe00'],
      securityChartList: [],
      securityCivilizationChartColor: ['#eb6f49', '#009ec8', '#00db58', '#bfbe00'],
      securityCivilizationChartList: [],
      safeList: [],
      safeLevelList: [
        { value: 1, label: '等级一', title: '一般隐患', desc: '稀有风险，必须注意严格按章操作' },
        { value: 2, label: '等级二', title: '较大隐患', desc: '显著危险，应采取有效防控措施' },
        { value: 3, label: '等级三', title: '严重隐患', desc: '高度危险，应采取严密防控措施' },
        { value: 4, label: '等级四', title: '重大隐患', desc: '极其危险，必须高度关注，重点防范' }
      ]
    }
  },
  //监听属性 类似于data概念
  computed: {
    // 项目id
    projectId() {
      return this.$store.state.project.projectId
    }
  },
  //监控data中的数据变化
  watch: {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  created() {
    this.getSafe()
    this.getQuality()
  },
  //方法集合
  methods: {
    async getSafe() {
      const res = await qualityApi.getSafe()
      const safeChart = res.data.safetyQuestionItemDTO
      const cultureChart = res.data.civilizationQuestionItemDTO
      this.securityChartList = [
        //{ value: safeChart.totalCount, name: '安全问题总计' },
        { value: safeChart.rectifyCount, name: '已整改' },
        { value: safeChart.unRectifyCount, name: '未整改' }
      ]
      this.securityCivilizationChartList = [
        { value: cultureChart.severityCount, name: '重大风险' },
        { value: cultureChart.largetCount, name: '较大风险' },
        { value: cultureChart.grearCount, name: '一般风险' },
        { value: cultureChart.generalCount, name: '低风险' }
      ]
      let o = {}
      res.data.safetyQuestionLevelsItemDTOS.map(r => {
        o[r.levels] = r
      })
      this.safeList = [
        { levels: 1, totalCount: o[1]?.totalCount || 0, rectifyCount: o[1]?.rectifyCount || 0 },
        { levels: 2, totalCount: o[2]?.totalCount || 0, rectifyCount: o[2]?.rectifyCount || 0 },
        { levels: 3, totalCount: o[3]?.totalCount || 0, rectifyCount: o[3]?.rectifyCount || 0 },
        { levels: 4, totalCount: o[4]?.totalCount || 0, rectifyCount: o[4]?.rectifyCount || 0 }
      ].reverse()
    },
    // 查询质量问题
    async getQuality() {
      const list = await qualityApi.getQualityTable().then(res => res.data)
      const chartData = await qualityApi.getQualityChart().then(res => res.data)
      this.qualityTableList = list.reverse()
      this.qualityChartList = [
        { value: chartData.alreadyAcceptanceCount, name: '已验收' },
        { value: chartData.acceptanceCount - chartData.alreadyAcceptanceCount, name: '其它' }
      ]
      this.qualityQuestionChartList = [
        { value: chartData.onceAcceptanceCount, name: '一次验收合格率' },
        { value: chartData.repairAcceptanceCount, name: '验收返修' }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../../styles/common.less');
.surver-wrap {
  .surver-main {
    margin: 0 40px;
    flex: 1;
  }
}
.chart-con,
.chart-pie-con {
  position: relative;
  &:before {
    content: '';
    background: url('../images/survey/chart-line.png');
    position: absolute;
    z-index: -1;
    width: 153px;
    height: 153px;
    top: 50%;
    left: 50%;
    margin-top: -76.6px;
    margin-left: -76.6px;
    animation: rotateScaleAnimation 4s infinite;
  }
  &.chart-1:before {
    animation-delay: 1s !important;
  }
  &.chart-2:before {
    animation-delay: 2s !important;
  }
  &.chart-3:before {
    animation-delay: 3s !important;
  }
  &.chart-4:before {
    animation-delay: 4s !important;
  }
  .title {
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 0;
    margin-top: -15px;
    font-size: 16px;
    color: #fff;
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
}
.chart-pie-con {
  &:before {
    background: url('../images/survey/chart-pie-line.png');
  }
  .title {
    top: auto;
    margin-top: 0;
    bottom: 15px;
  }
}
.chart-label {
  ul {
    &:after {
      .clear;
    }
    li {
      margin-bottom: 25px;
      padding-left: 50px;
      float: left;
      width: 50%;
      p {
        display: flex;
        align-items: center;
        position: relative;
        .label {
          width: 11px;
          height: 5px;
          position: absolute;
          margin-left: -15px;
          border-radius: 4px;
        }
        b {
          margin-right: 5px;
          font-weight: normal;
        }
      }
    }
  }
}
.text-color1 {
  color: #f16028;
}
.text-color2 {
  color: #dac329;
}
.text-color3 {
  color: #2890fc;
}
.text-color4 {
  color: #52f5ff;
}
.text-color5 {
  color: #00db58;
}
.table-list {
  color: #abc8df;
  font-size: 14px;
  ul {
    li {
      margin-bottom: 20px;
      display: flex;
      p {
        margin-left: 20px;
        flex: 2;
        background: #071c38;
        border-radius: 3px;
        height: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        b {
          font-weight: normal;
        }
        &.level {
          flex: 1;
          b {
            display: flex;
            align-items: center;
            img {
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
