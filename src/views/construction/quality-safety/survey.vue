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
              <div class="chart-con chart-1" @click="changeTab('accept')">
                <span class="title">质量验收</span>
                <EchartPie
                  :dataList="qualityChartList"
                  :color="qualityChartColor"
                  isHollow
                  :isLegend="false"
                  container="qualityChart"
                />
              </div>
              <div>
                <ul>
                  <li v-for="(item, i) in qualityChartList" :key="i" style="width:100%">
                    <p style="text-align: center">
                      <i class="label" :style="`background: ${qualityChartColor[i]}`"></i>
                      {{ item.name }}
                    </p>
                    <p style="text-align: center">
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
              <div class="chart-con chart-2" @click="changeTab('question')">
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
            <ul v-if="tabKey === 'accept'">
              <li v-for="(item, i) in safeCountList" :key="i">
                <p class="name">
                  <b>{{ item.name }}</b>
                </p>
                <p>
                  <span>不通过</span>
                  <b>{{ item.count }}</b>
                </p>
              </li>
            </ul>
            <ul v-if="tabKey === 'question'">
              <li v-for="(item, i) in qualityLevelList" :key="i">
                <p :class="`level text-color${i + 1}`">
                  <b>
                    <img :src="require(`../images/survey/icon${i + 1}.png`)" />
                    {{ _.get(_.find(qualityLevelList, { value: 4 - i }), 'label') }}
                  </b>
                </p>
                <p class="name">
                  <b :class="`text-color${i + 1}`">
                    {{ _.get(_.find(qualityLevelList, { value: 4 - i }), 'title') }} （占比：{{
                      ((qualityTableData[item.field] / qualityTotal) * 100) | toFixed4(2)
                    }}
                    %）
                  </b>
                </p>
                <p class="desc">
                  <span>数量</span>
                  <b class="text-color1">{{ qualityTableData[item.field] }}</b>
                </p>
                <p class="status">
                  <span>未解决</span>
                  <b class="text-color4">{{ qualityTableData[item.filedSolve] }}</b>
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
          </el-row>
        </el-col>
        <el-col :span="14">
          <div class="table-list" style="margin-top: 60px;">
            <ul>
              <li v-for="(item, i) in qualityLevelList" :key="i">
                <p :class="`level text-color${i + 1}`">
                  <b>
                    <img :src="require(`../images/survey/icon${i + 1}.png`)" />
                    {{ _.get(_.find(qualityLevelList, { value: 4 - i }), 'label') }}
                  </b>
                </p>
                <p class="name">
                  <b :class="`text-color${i + 1}`">
                    {{ _.get(_.find(qualityLevelList, { value: 4 - i }), 'title') }} （占比：{{
                      ((safeTableData[item.field] / safeTotal) * 100) | toFixed4(2)
                    }}
                    %）
                  </b>
                </p>
                <p class="desc">
                  <span>数量</span>
                  <b class="text-color1">{{ safeTableData[item.field] }}</b>
                </p>
                <p class="status">
                  <span>未解决</span>
                  <b class="text-color4">{{ safeTableData[item.filedSolve] }}</b>
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
import api from '@/api/quality'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    EchartPie
  },
  data() {
    //这里存放数据
    return {
      tabKey: 'question',
      qualityChartColor: ['#67e0e3', '#e69460'],
      qualityChartList: [],
      qualityQuestionChartList: [],
      qualityTableTotal: 50, // 质量问题table汇总
      qualityTableList: [], // 质量问题table数据
      qualityLevelList: [
        { value: 4, label: '等级四', title: '重大隐患', field: 'great', filedSolve: 'greatTODO' },
        { value: 3, label: '等级三', title: '严重隐患', field: 'severity', filedSolve: 'severityTODO' },
        { value: 2, label: '等级二', title: '较大隐患', field: 'larger', filedSolve: 'largerTODO' },
        { value: 1, label: '等级一', title: '一般隐患', field: 'general', filedSolve: 'generalTODO' }
      ],
      qualityTableData: {
        general: 0,
        larger: 0,
        severity: 0,
        great: 0,
        generalTODO: 0,
        largerTODO: 0,
        severityTODO: 0,
        greatTODO: 0
      },
      qualityTotal: 0,
      safeTableData: {
        general: 0,
        larger: 0,
        severity: 0,
        great: 0,
        generalTODO: 0,
        largerTODO: 0,
        severityTODO: 0,
        greatTODO: 0
      },
      safeTotal: 0,
      safeCountList: [
        { name: '单位工程', count: 0 },
        { name: '分部工程', count: 0 },
        { name: '分项工程', count: 0 },
        { name: '检验批工程', count: 0 },
        { name: '隐蔽工程', count: 0 }
      ],
      securityChartColor: ['#009ec8', '#00db58', '#bfbe00'],
      securityChartList: [],
      securityCivilizationChartColor: ['#eb6f49', '#009ec8', '#00db58', '#bfbe00'],
      securityCivilizationChartList: [],
      safeList: [],
      safeLevelList: [
        { value: 4, label: '等级四', title: '重大隐患', desc: '极其危险，必须高度关注，重点防范' },
        { value: 3, label: '等级三', title: '严重隐患', desc: '高度危险，应采取严密防控措施' },
        { value: 2, label: '等级二', title: '较大隐患', desc: '显著危险，应采取有效防控措施' },
        { value: 1, label: '等级一', title: '一般隐患', desc: '稀有风险，必须注意严格按章操作' }
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
    this.getQuality()
    this.getSafe()
  },
  //方法集合
  methods: {
    async getSafe() {
      const safeChart = await qualityApi.checkCount({ planTypes: [2, 3] })
      const safeData = safeChart.data
      this.securityChartList = [
        { value: safeData.totalResolved, name: '已解决' },
        { value: safeData.totalTODO, name: '未解决' }
      ]

      this.safeTableData = safeData
      this.safeTotal = safeData.general + safeData.great + safeData.larger + safeData.severity
      console.log(this.safeTotal)
      const countRes = await qualityApi.count()
      const countData = countRes.data
      this.safeCountList = [
        { name: '单位工程', count: countData.unitUnPass },
        { name: '分部工程', count: countData.branchUnPass },
        { name: '分项工程', count: countData.subUnPass },
        { name: '检验批工程', count: countData.inspectionUnPass },
        { name: '隐蔽工程', count: countData.concealUnPass }
      ]
    },
    // 查询质量问题
    async getQuality() {
      const qualityChartRes = await qualityApi.getQualityChartNew()

      const qualityChartData = qualityChartRes.data
      this.qualityChartList = [{ value: qualityChartData.totalUnPass, name: '质量验收不通过' }]

      const qualityQuestionRes = await qualityApi.checkCount({ planTypes: [1] })
      const qualityQuestionData = qualityQuestionRes.data

      this.qualityQuestionChartList = [
        { value: qualityQuestionData.totalResolved, name: '已解决' },
        { value: qualityQuestionData.totalTODO, name: '未解决' }
      ]

      const res = await api.checkCount({ planTypes: [1] })
      this.qualityTableData = res.data
      this.qualityTotal =
        this.qualityTableData.general +
        this.qualityTableData.great +
        this.qualityTableData.larger +
        this.qualityTableData.severity
    },

    changeTab(key) {
      this.tabKey = key
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
