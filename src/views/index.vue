<template>
  <div class="home-main">
    <aside class="m-h">
      <Block title="项目资料" subTitle="project information">
        <span slot="btn" class="goDetails" @click="toDetail('project')">more <i class="el-icon-caret-right"/></span>
        <div class="project-data">
          <h3>项目名称 在施</h3>
          <p>{{ projectData.name }}</p>
          <div class="border"></div>
          <h3>项目地址</h3>
          <p>{{ `${renderAddress(projectData.address)}${projectData.detailAddress}` }}</p>
          <el-carousel class="carousel" height="65px" arrow="always" trigger="click" :autoplay="false" :loop="false">
            <el-carousel-item>
              <ul>
                <li>
                  <h4>项目类型</h4>
                  <div>
                    <span class="number">{{ getType(projectData.type) }}</span>
                  </div>
                </li>
                <li>
                  <h4>建筑面积</h4>
                  <div>
                    <span class="number">{{ projectData.buildingArea }}</span>
                  </div>
                </li>
                <li>
                  <h4>建筑层数</h4>
                  <div>
                    <span class="number">{{ projectData.buildingFloorNum }}</span>
                    层
                  </div>
                </li>
              </ul>
            </el-carousel-item>
            <el-carousel-item>
              <ul>
                <li>
                  <h4>建筑高度</h4>
                  <div>
                    <span class="number">{{ projectData.buildingHeight }}</span>
                  </div>
                </li>
                <li>
                  <h4>规模性质</h4>
                  <div>
                    <span class="number">{{ projectData.constructionCosts }}</span>
                  </div>
                </li>
                <li>
                  <h4>抗震等级</h4>
                  <div>
                    <span class="number">{{ projectData.seismicLevel }}</span
                    >级
                  </div>
                </li>
              </ul>
            </el-carousel-item>
            <el-carousel-item>
              <ul>
                <li>
                  <h4>结构形式</h4>
                  <div>
                    <span class="number">{{ projectData.structuralStyle }}</span>
                  </div>
                </li>
                <li>
                  <h4>工程造价</h4>
                  <div>
                    <span class="number">{{ projectData.constructionCosts }}</span>
                  </div>
                </li>
              </ul>
            </el-carousel-item>
          </el-carousel>
        </div>
      </Block>
      <Block title="成本管理" subTitle="cost management">
        <span slot="btn" class="goDetails" @click="toDetail('cost')">more <i class="el-icon-caret-right"/></span>
        <div class="cost-management">
          <v-chart :options="profitOptions" style="width: 100%;height: 210px;"></v-chart>
          <div class="button-group tac" style="margin-bottom: 15px;">
            <button class="button" style="margin: 0 5px;" @click="() => (materialType = 1)">材料</button>
            <button class="button" style="margin: 0 5px;" @click="() => (materialType = 2)">机械</button>
          </div>
          <div class="inTheNextMonth">
            <el-table :data="inTheNextMonth" class="transparent" size="mini">
              <el-table-column
                align="center"
                prop="materialName"
                label="下月进场"
                width="65px"
                class-name="name"
              ></el-table-column>
              <el-table-column align="center" prop="amount" width="120px">
                <template v-slot="{ row }">
                  <div class="progress">
                    <p :style="{ width: row.progress + '%' }"></p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="数量"
                width="65px"
                :formatter="row => row.materialAmount"
              ></el-table-column>
              <!--              :formatter="row => _.get(_.find(materialType, { value: row.materialSource }), 'label')"-->
              <el-table-column
                align="center"
                label="来源"
                width="65px"
                :formatter="
                  row => {
                    return _.get(_.find(materList, { value: row.materialSource }), 'label')
                  }
                "
              ></el-table-column>
            </el-table>
          </div>
        </div>
      </Block>
    </aside>
    <aside class="m-h">
      <Block title="进度视图" sub-title="Progress view" class="progress-view">
        <span slot="btn" class="goDetails" @click="toDetail('progress')">more <i class="el-icon-caret-right"/></span>
        <h3>
          <span>任务总数</span> <span class="yellow">{{ progressData.taskTotal }}</span>
        </h3>
        <v-chart style="width: 100%;height: 170px;" :options="progressChartOptions"></v-chart>
        <ul>
          <li>
            <h4>完成任务</h4>
            <div>
              <span class="number">{{ progressData.taskOverNum }}</span>
            </div>
          </li>
          <li>
            <h4>延期任务</h4>
            <div>
              <span class="number">{{ progressData.taskDelayNum }}</span>
            </div>
          </li>
          <li>
            <h4>完成度</h4>
            <div>
              <span class="number">{{ progressData.taskOverRate }}</span>
            </div>
          </li>
          <li>
            <h4>延期率</h4>
            <div>
              <span class="number">{{ progressData.taskDelayRate }}</span>
            </div>
          </li>
        </ul>
      </Block>
      <Block title="变更对比" sub-title="Model version">
        <span slot="btn" class="goDetails" @click="toDetail('change')">more <i class="el-icon-caret-right"/></span>
        <p style="text-align: center;">
          工程签证数量 <span class="yellow">{{ changeData.visaNum }}</span>
        </p>
        <ul class="change-compare-info" style="margin: 20px 0 30px;">
          <li>
            <h6>变更金额</h6>
            <p>
              <span class="arrow" :style="{ color: changeData.changeMoney > 0 ? '#D61258' : '#10D833' }">{{
                changeData.changeMoney >= 0 ? '🠕' : '🠗'
              }}</span>
              <span class="number warning yellow">{{ (changeData.changeMoney / 10000).toFixed(2) }}</span>
              <span class="unit">万</span>
            </p>
          </li>
          <li>
            <h6>变更工期</h6>
            <p>
              <span class="arrow" :style="{ color: changeData.changeDuration > 0 ? '#D61258' : '#10D833' }">{{
                changeData.changeDuration >= 0 ? '🠕' : '🠗'
              }}</span>
              <span class="number warning yellow">{{ changeData.changeDuration }}</span>
              <span class="unit">天</span>
            </p>
          </li>
        </ul>
      </Block>
      <BlockTabs :list="tabs" :activeKey="activeKey" @change="changeTab">
        <span slot="btn" class="goDetails" @click="toDetail('problem')">more <i class="el-icon-caret-right"/></span>
        <div v-if="activeKey === 1">
          <highcharts id="quality" :options="qualityChartOptions" />
        </div>
        <div v-if="activeKey === 2">
          <highcharts id="safe" :options="safeChartOptions" />
        </div>
        <div v-if="activeKey === 3">
          <highcharts id="culture" :options="cultureChartOptions" />
        </div>
      </BlockTabs>
    </aside>
  </div>
</template>

<script>
import { LinearGradient } from 'echarts/lib/util/graphic'
import api from '@/api/homeApi'
import mapList from '@/lib/addressList'
export default {
  name: 'index',
  data() {
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
    return {
      materList: [
        { value: 1, label: '采购' },
        { value: 2, label: '租赁' },
        { value: 3, label: '自购+租赁' },
        { value: 4, label: '甲供' }
      ],
      projectData: {},
      progressData: {},
      changeData: {},
      materialType: 1,
      activeKey: 1,
      tabs: [
        {
          title: '质量问题',
          value: 1,
          desc: ''
        },
        {
          title: '安全问题',
          desc: '',
          value: 2
        },
        {
          title: '安全文明问题',
          desc: '',
          value: 3
        }
      ],
      projectType: [
        { label: '智能传感', value: 'iot' },
        { label: '施工', value: 'construction' },
        { label: '运维', value: 'operation' },
        { label: '设计协同', value: 'design' },
        { label: '煤矿', value: 'mine' }
      ],
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
      profitOptions: {
        legend: { show: false },
        xAxis: [
          {
            type: 'value',
            gridIndex: 0,
            inverse: true,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: { show: false },
            axisLabel: { show: false }
          },
          {
            type: 'value',
            gridIndex: 1,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: { show: false },
            axisLabel: { show: false }
          }
        ],
        tooltip: {
          show: false
        },
        yAxis: [
          {
            gridIndex: 0,
            type: 'category',
            axisTick: {
              show: false
            },
            axisLine: {
              show: true
            },
            axisLabel: {
              show: true,

              rich: {
                text: {
                  color: '#4a98ec',
                  fontSize: 14
                },
                plus: {
                  color: '#1edafd',
                  fontSize: 16,
                  fontWeight: 'bold'
                },
                minus: {
                  color: '#e97d44',
                  fontSize: 16,
                  fontWeight: 'bold'
                },
                unit: {
                  color: '#516e8a',
                  fontSize: 14
                }
              }
            },
            splitLine: { show: false },
            data: [
              '{text|本月节超} {minus|-12.20} {unit|万}',
              '{text|总节超} {plus|+154.20} {unit|万}',
              '{text|本月盈亏} {minus|-154.20} {unit|万}',
              '{text|总盈亏} {plus|+154.20} {unit|万}'
            ]
          },
          {
            gridIndex: 1,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: { show: false },
            axisLabel: { show: false },
            type: 'category',
            data: ['本月节超2', '总节超2', '本月盈亏2', '总盈亏2'],
            position: 'right'
          }
        ],
        grid: [
          {
            top: 10,
            height: 200,
            right: '30%',
            width: '30%'
          },
          {
            top: 10,
            height: 200,
            left: '70%',
            width: '30%'
          }
        ],
        series: [
          // These series are in the first grid.
          {
            type: 'bar',
            name: '负',
            barWidth: 10,
            seriesLayoutBy: 'row',
            itemStyle: {
              normal: {
                barBorderRadius: 8
                // color: '#e97640'
              }
            },
            label: {
              show: true,
              position: 'top',
              distance: 10,
              color: '#476bc8',
              formatter({ dataIndex }) {
                return dataIndex === 3 ? '负' : ''
              }
            },
            data: [
              {
                name: '本月节超',
                value: -154
              },
              {
                name: '总节超',
                value: 80.4
              },
              {
                name: '本月盈亏',
                value: -65.1
              },
              {
                name: '总盈亏',
                value: 93.1
              }
            ].map(e => {
              e.itemStyle = {
                color:
                  e.value < 0
                    ? new LinearGradient(
                        0,
                        0,
                        1,
                        0,
                        [
                          {
                            offset: 0,
                            color: '#e8aa61'
                          },
                          {
                            offset: 1,
                            color: '#e9592d'
                          }
                        ],
                        false
                      )
                    : '#193b8b'
              }
              e.value = Math.abs(e.value)
              return e
            })
          },
          {
            type: 'bar',
            name: '正',
            barWidth: 10,
            seriesLayoutBy: 'row',
            xAxisIndex: 1,
            yAxisIndex: 1,
            label: {
              show: true,
              distance: 10,
              position: 'top',
              color: '#476bc8',
              formatter({ dataIndex }) {
                return dataIndex === 3 ? '正' : ''
              }
            },
            itemStyle: {
              normal: {
                barBorderRadius: 8,
                color: '#1abefd'
              }
            },
            data: [
              {
                name: '本月节超',
                value: 120
              },
              {
                name: '总节超',
                value: 92.1
              },
              {
                name: '本月盈亏',
                value: -85.7
              },
              {
                name: '总盈亏',
                value: 83.1
              }
            ].map(e => {
              e.itemStyle = {
                color:
                  e.value > 0
                    ? new LinearGradient(
                        0,
                        0,
                        1,
                        0,
                        [
                          {
                            offset: 0,
                            color: '#1581fc'
                          },
                          {
                            offset: 1,
                            color: '#1edbfd'
                          }
                        ],
                        false
                      )
                    : '#193b8b'
              }
              e.value = Math.abs(e.value)
              return e
            })
          }
        ]
      },
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
            data: [
              {
                name: '一般问题',
                y: 0,
                color: '#36aeda'
              },
              {
                name: '较大问题',
                y: 0,
                color: '#22c1aa'
              },
              {
                name: '重大问题',
                y: 0,
                sliced: true,
                selected: true,
                color: '#1e82e0'
              },
              {
                name: '特大问题',
                y: 0,
                color: '#ccc650'
              }
            ]
          }
        ]
      },
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
            data: [
              {
                name: '一般隐患',
                y: 0,
                color: '#36aeda'
              },
              {
                name: '较大隐患',
                y: 0,
                color: '#22c1aa'
              },
              {
                name: '重大隐患',
                y: 0,
                sliced: true,
                selected: true,
                color: '#1e82e0'
              },
              {
                name: '严重隐患',
                y: 0,
                color: '#ccc650'
              }
            ]
          }
        ]
      },
      cultureChartOptions: {
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
            name: '安全文明',
            data: [
              {
                name: '一般问题',
                y: 0,
                color: '#36aeda'
              },
              {
                name: '较大问题',
                y: 0,
                color: '#22c1aa'
              },
              {
                name: '重大问题',
                y: 0,
                sliced: true,
                selected: true,
                color: '#1e82e0'
              },
              {
                name: '特大问题',
                y: 0,
                color: '#ccc650'
              }
            ]
          }
        ]
      },
      inTheNextMonth: []
    }
  },
  watch: {
    materialType() {
      this.getMaterial()
    }
  },
  created() {
    this.refresh()
    this.getMaterial()
  },
  methods: {
    async refresh() {
      this.getProgressData()
      this.getChangeData()
      this.getProjectData()
      this.getQualityData()
      this.getSafeData()
      this.getCultureData()
      this.getCostData()
    },
    async getMaterial() {
      let res = await api.material(this.materialType)
      this.inTheNextMonth = res.data
    },
    //项目信息
    async getProjectData() {
      let projectDataRes = await api.project()
      this.projectData = { ...projectDataRes.data.extInfo, ...projectDataRes.data.baseInfo }
    },
    //进度视图
    async getProgressData() {
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
      let progressRes = await api.progress()
      this.progressData = progressRes.data
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
    //变更对比
    async getChangeData() {
      let res = await api.change()
      this.changeData = res.data
    },
    //质量视图
    async getQualityData() {
      let res = await api.quality()
      this.qualityChartOptions.series[0].data = [
        {
          name: '一般问题',
          y: res.data.generalHazard,
          color: '#36aeda'
        },
        {
          name: '较大问题',
          y: res.data.largeHazard,
          color: '#22c1aa'
        },

        {
          name: '重大问题',
          y: res.data.majorHazard,
          sliced: true,
          selected: true,
          color: '#1e82e0'
        },
        {
          name: '特大问题',
          y: res.data.seriousHazard,
          color: '#ccc650'
        }
      ]
    },
    //安全视图
    async getSafeData() {
      let res = await api.safe()
      this.safeChartOptions.series[0].data = [
        {
          name: '一般隐患',
          y: res.data.generalHazard,
          color: '#36aeda'
        },
        {
          name: '较大隐患',
          y: res.data.largeHazard,
          color: '#22c1aa'
        },
        {
          name: '重大隐患',
          y: res.data.majorHazard,
          sliced: true,
          selected: true,
          color: '#1e82e0'
        },
        {
          name: '严重隐患',
          y: res.data.seriousHazard,
          color: '#ccc650'
        }
      ]
    },
    //安全文明视图
    async getCultureData() {
      let res = await api.culture()
      this.cultureChartOptions.series[0].data = [
        {
          name: '一般隐患',
          y: res.data.generalHazard,
          color: '#36aeda'
        },
        {
          name: '较大隐患',
          y: res.data.largeHazard,
          color: '#22c1aa'
        },
        {
          name: '重大隐患',
          y: res.data.majorHazard,
          sliced: true,
          selected: true,
          color: '#1e82e0'
        },
        {
          name: '严重隐患',
          y: res.data.seriousHazard,
          color: '#ccc650'
        }
      ]
    },
    /*
     * @任务编号:2662||成本接口对接
     * @开发人员:张龙
     * @日期:2020-03-20
     * @任务类型: 全新代码
     */
    //成本视图
    async getCostData() {
      let res = await api.cost()
      let monthSection = (res.data.superSectionMonth / 10000).toFixed(2)
      let totalSection = (res.data.superSectionTotal / 10000).toFixed(2)
      let monthLoss = (res.data.profitLossMonth / 10000).toFixed(2)
      let totalLoss = (res.data.profitLossTotal / 10000).toFixed(2)
      this.profitOptions.yAxis[0].data = [
        `{text|本月节超} {minus|${monthSection}} {unit|万}`,
        `{text|总节超} {plus|${totalSection}} {unit|万}`,
        `{text|本月盈亏} {minus|${monthLoss}} {unit|万}`,
        `{text|总盈亏} {plus|${totalLoss}} {unit|万}`
      ]
      this.profitOptions.series[0].data = [
        {
          name: '本月节超',
          value: monthSection
        },
        {
          name: '总节超',
          value: totalSection
        },
        {
          name: '本月盈亏',
          value: monthLoss
        },
        {
          name: '总盈亏',
          value: totalLoss
        }
      ].map(e => {
        e.itemStyle = {
          color:
            e.value < 0
              ? new LinearGradient(
                  0,
                  0,
                  1,
                  0,
                  [
                    {
                      offset: 0,
                      color: '#e8aa61'
                    },
                    {
                      offset: 1,
                      color: '#e9592d'
                    }
                  ],
                  false
                )
              : '#193b8b'
        }
        if (e.value < 0) {
          e.value = Math.abs(e.value)
        } else {
          e.value = 0
        }
        return e
      })
      this.profitOptions.series[1].data = [
        {
          name: '本月节超',
          value: monthSection
        },
        {
          name: '总节超',
          value: totalSection
        },
        {
          name: '本月盈亏',
          value: monthLoss
        },
        {
          name: '总盈亏',
          value: totalLoss
        }
      ].map(e => {
        e.itemStyle = {
          color:
            e.value > 0
              ? new LinearGradient(
                  0,
                  0,
                  1,
                  0,
                  [
                    {
                      offset: 0,
                      color: '#1581fc'
                    },
                    {
                      offset: 1,
                      color: '#1edbfd'
                    }
                  ],
                  false
                )
              : '#193b8b'
        }
        if (e.value > 0) {
          e.value = Math.abs(e.value)
        } else {
          e.value = 0
        }
        return e
      })
    },
    changeTab(e) {
      this.activeKey = e
    },
    //页面跳转
    toDetail(key) {
      switch (true) {
        case key === 'project':
          this.$router.push({ path: '/projectData/index' })
          break
        case key === 'cost':
          this.$router.push({ path: '/cost/trending' })
          break
        case key === 'progress':
          this.$router.push({ path: '/schedule/view' })
          break
        case key === 'change':
          this.$router.push({ path: '/schedule/change' })
          break
        case key === 'problem' && this.activeKey === 1:
          this.$router.push({ path: '/quality/index' })
          break
        case key === 'problem' && this.activeKey === 2:
          this.$router.push({ path: '/safety/index' })
          break
        case key === 'problem' && this.activeKey === 3:
          this.$router.push({ path: '/safety/index', query: { curKey: 'culture' } })
          break
        default:
          break
      }
    },
    //获取项目类型
    getType(type) {
      let list = this.projectType.filter(t => t.value === type)
      return list.length ? list[0].label : '-'
    },
    //获取项目地址
    renderAddress(code) {
      let str = '-'
      if (code) {
        str = ''
        let addressArray = code.split('_')
        for (let i = 0; i < addressArray.length; i++) {
          str = str + ',' + this.getAddressNode(mapList, addressArray[i])
        }
        str = str.substr(1)
      }
      return str
    },
    getAddressNode(pca, value) {
      for (let i = 0; i < pca.length; i++) {
        if (pca[i].value === value) {
          return pca[i].label
        } else if (pca[i].children) {
          let result = this.getAddressNode(pca[i].children, value)
          if (result) {
            return result
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.carousel {
  /deep/ .el-carousel__arrow {
    color: #8ca6ae;
    width: 20px;
  }
}
.home-main {
  display: flex;
  justify-content: space-between;
  > aside {
    width: 400px;
    padding: 0 10px;
    > .block {
      margin-bottom: 30px;
      &:last-child {
        margin-top: 0;
      }
    }
    .project-data {
      padding: 0 10px;
      h3 {
        margin-top: 15px;
        color: #2568b3;
        font-size: 14px;
        font-weight: bold;
        padding-left: 20px;
        background: url('/img/h3-title.png') no-repeat;
        background-size: 12px 14px;
      }
      > p {
        padding: 12px 0 15px 20px;
        font-size: 14px;
      }
      .border {
        border-bottom: 1px dashed #666;
        height: 1px;
      }
      ul {
        background-color: #06162e;
        display: flex;
        padding: 0 20px;
        li {
          height: 65px;
          flex: 1;
          text-align: center;
          margin: 7.5px 0;
          line-height: 25px;
          position: relative;
          &:not(:last-child):after {
            position: absolute;
            top: 10px;
            right: 0;
            display: inline-block;
            content: '';
            height: 40px;
            border-right: 1px solid #777;
          }
          h4 {
            color: #2568b3;
          }
          div {
            font-size: 12px;
            .number {
              color: #f1d82f;
              font-size: 17px;
              margin-right: 3px;
            }
          }
        }
      }
    }
    .progress-view {
      h3 {
        text-align: center;
        font-size: 16px;
        line-height: 30px;
        color: #67b0fc;
        .yellow {
          font-weight: bold;
          font-size: 18px;
        }
      }
      ul {
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.3) 0%, #06162e 15%, #06162e 85%, rgba(0, 0, 0, 0.3) 100%);
        display: flex;
        li {
          height: 50px;
          flex: 1;
          text-align: center;
          margin: 7.5px 0;
          line-height: 25px;
          position: relative;
          &:not(:last-child):after {
            position: absolute;
            top: 5px;
            right: 0;
            display: inline-block;
            content: '';
            height: 40px;
            border-right: 1px solid #555;
          }
          h4 {
            color: #2568b3;
          }
          div {
            font-size: 12px;
            .number {
              color: #f1d82f;
              font-size: 17px;
              margin-right: 3px;
            }
          }
        }
      }
    }
  }
}
.change-compare-info {
  font-size: 14px;
  display: flex;
  justify-content: space-around;
  .arrow {
    font-weight: bold;
    font-size: 18px;
  }
  .number {
    margin: 0 5px;
    font-size: 18px;
  }
}
</style>
<style lang="less">
.inTheNextMonth {
  .el-table {
    color: #5497de;
    .name {
      color: #e6e6e6;
    }
    .progress {
      background-color: #134361;
      border-radius: 4px;
      > p {
        height: 8px;
        border-radius: 4px;
        background: linear-gradient(to right, #1167d9 10%, #1cd4fd 50%);
      }
    }
    .cell {
      padding: 0 8px;
    }
    .el-table__header {
      th {
        color: #94c2f3;
        font-weight: normal;
      }
    }
  }
}
</style>
