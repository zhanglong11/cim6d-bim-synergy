<!--
 * @Description: 圆环
 * @Version:
 * @Autor:
 * @Date: 2020-03-02 15:27:12
 * @LastEditTime: 2020-03-02 15:28:39
 -->
<template>
  <div>
    <Echarts
      ref="qualityCheck"
      :height="300"
      id-select="qualityCheck"
      :mouseoverFlag="true"
      :option="option"
      @mouseover="mouseover"
    />
  </div>
</template>

<script>
export default {
  props: {
    total: {},
    unqualified: {}
  },
  data() {
    return {
      option: {
        backgroundColor: '#0C1D38',
        color: ['#33A4FA', '#E7DEB0'],
        legend: {
          show: true,
          right: '3%',
          top: '12%',
          itemWidth: 12,
          itemHeight: 12,
          orient: 'vertical',
          icon: 'circle',
          formatter: name => {
            return `${name}`
          },
          textStyle: {
            color: '#687E91'
          }
        },
        tooltip: {
          show: true,
          backgroundColor: 'rgba(3,43,80,0.7)',
          textStyle: {
            color: 'rgba(255,255,255,0.7)',
            fontSize: 16
          },
          extraCssText: 'text-align:left'
        },
        series: [
          {
            name: '',
            type: 'pie',
            hoverAnimation: false,
            radius: ['43%', '63%'],
            center: ['42%', '47%'],
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: false
              },
              // normal: {
              show: true,
              position: 'outside',
              formatter: function(params) {
                let nm = params.name,
                  per = Number(params.percent).toFixed(2)
                return [`{a|${nm}}\n`, `{b|${per}%}`]
              },
              rich: {
                a: {
                  color: '#fff',
                  fontSize: 14,
                  lineHeight: 20
                },
                b: {
                  color: 'yellow',
                  fontSize: 14,
                  foneWeight: 'bold'
                }
              }
              // }
            },
            labelLine: {
              normal: {
                show: true,
                length: 22,
                length2: 40,
                lineStyle: {
                  color: '#fff'
                }
              }
            },
            data: [
              { name: '验收项目', value: 0 },
              { name: '通过项目', value: 0 }
            ]
          },
          {
            name: '边框1',
            type: 'pie',
            hoverAnimation: false,
            radius: ['73%', '73.5%'],
            center: ['42%', '47%'],
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: '#2bb0eb',
                shadowColor: '#2bb0eb',
                borderWidth: 5,
                borderColor: 'rgba(43,176,235,0.2)',
                shadowBlur: 20,
                opacity: 0.3
              }
            },
            data: [
              {
                value: 100,
                tooltip: {
                  show: false
                }
              }
            ]
          },
          {
            name: '内框',
            type: 'pie',
            hoverAnimation: false,
            radius: ['38%', '38.5%'],
            center: ['42%', '47%'],
            label: {
              normal: {
                show: true,
                position: 'center'
                // formatter: [`{b|${e.percent + '%'}}`, `{a|${e.name}}`].join('\n'),
                // rich: {
                //   a: {
                //     color: '#C0C4CC',
                //     fontSize: 18,
                //     lineHeight: 30
                //   },
                //   b: {
                //     color: '#fff',
                //     fontSize: 20,
                //     foneWeight: 'bold',
                //     textShadowBlur: 20,
                //     textShadowColor: 'yellow'
                //   }
                // }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: '#2bb0eb',
                shadowColor: '#2bb0eb',
                borderWidth: 5,
                borderColor: 'rgba(43,176,235,0.2)'
              }
            },
            data: [
              {
                value: 100,
                tooltip: {
                  show: false
                }
              }
            ]
          }
        ]
      }
    }
  },
  watch: {
    total(v) {
      this.option.series[0].data = [
        { name: '验收项目', value: v },
        { name: '通过项目', value: this.unqualified }
      ]
    },
    unqualified(v) {
      this.option.series[0].data = [
        { name: '验收项目', value: this.total },
        { name: '通过项目', value: v }
      ]
    }
  },
  methods: {
    mouseover(e) {
      let op = this.$refs.qualityCheck.myChart.getOption()
      if (e.seriesIndex === 0) {
        let _label = {
          normal: {
            show: true,
            position: 'center',
            formatter: [`{b|${e.percent + '%'}}`, `{a|${e.name}}`].join('\n'),
            rich: {
              a: {
                color: '#C0C4CC',
                fontSize: 18,
                lineHeight: 30
              },
              b: {
                color: '#fff',
                fontSize: 20,
                foneWeight: 'bold',
                textShadowBlur: 20,
                textShadowColor: 'yellow'
              }
            }
          }
        }

        op.series[2].label = _label
        this.$refs.qualityCheck.myChart.setOption(op, true)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
