<template>
  <div class="echarts-map">
    <span class="back el-icon-back" @click="initMap()" v-show="!isChina">返回</span>
    <v-chart autoresize ref="map" @click="handleSelected" class="map" :options="options" v-if="isRead"></v-chart>
  </div>
</template>

<script>
import echarts from 'echarts'
import chinaData from './china-geojson/china'
import chinaMapOutline from './china-geojson/china-map-outline.json'
export default {
  name: 'Map',
  props: {
    // 全国数据
    chinaData: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 省份数据
    provinceData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      options: {},
      isChina: true,
      isRead: false,
      provinceList: []
    }
  },
  watch: {
    chinaData() {
      this.getChinaProject()
    },
    provinceData(array) {
      this.options.series[0].data = _.cloneDeep(array)
      this.options.series[1].data = array
      array.forEach(async item => {
        item.value = [item.longitude, item.latitude]
      })
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    // 初始化地图
    initMap() {
      echarts.registerMap('china', chinaData)
      echarts.registerMap('chinaMapOutline', chinaMapOutline)
      this.isRead = false
      this.options = {
        title: {
          show: false
        },
        tooltip: {
          show: true,
          formatter: e => {
            let datas = e.data
            if (datas) {
              return `${datas.name}<br/>共 <b style="color: #f90;">${datas.value}</b> 个`
            } else {
              return
            }
          }
        },
        geo: {
          map: 'china',
          zlevel: 2,
          show: false,
          type: 'map',
          silent: true,
          label: {
            normal: {
              show: false,
              textStyle: {
                color: '#fff'
              }
            },
            emphasis: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          itemStyle: {
            normal: {
              areaColor: 'rgba(0,255,255,.02)',
              borderColor: '#00ffff',
              borderWidth: 1.5,
              shadowColor: '#00ffff',
              shadowOffsetX: 0,
              shadowOffsetY: 4,
              shadowBlur: 10
            },
            emphasis: {
              areaColor: 'transparent', //悬浮背景
              textStyle: {
                color: '#fff'
              }
            }
          }
        },
        series: [
          {
            id: 'map',
            type: 'map',
            map: 'china',
            name: '111',
            lineStyle: {
              width: 0.2,
              opacity: 0.05
            },
            label: { show: false },
            itemStyle: {
              areaColor: '#042d6d66',
              borderWidth: 1,
              borderColor: '#00ffff'
            },
            emphasis: {
              label: { show: false },
              itemStyle: {
                areaColor: '#24bfd8',
                show: true,
                label: { show: false }
              }
            },
            data: []
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            symbol: 'image:///img/map-point.png',
            symbolSize: 30,
            zLever: 2,
            silent: true,
            tooltip: {
              show: true,
              formatter: e => {
                let datas = e.data
                if (datas) {
                  return `<b>${datas.projectName}</b>`
                } else {
                  return
                }
              }
            },
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            data: []
          }
        ]
      }
      this.getChinaProject()
    },
    // 获取全国项目
    getChinaProject() {
      this.options.series[0].data = this.chinaData
      let effectScatterData = _.cloneDeep(this.chinaData)
      effectScatterData.forEach(async e => {
        const location = _.find(chinaData.features, f => f.properties.name === e.name).properties.cp
        e.value = location
      })
      this.options.series[1].data = effectScatterData
      this.options.series[1].silent = true
      this.isRead = true
      this.isChina = true
    },
    // 获取省份项目
    getProvinceProject(name) {
      this.options.series[1].silent = false
      this.$emit('getProvince', name)
    },
    // 选择城市
    handleSelected(data) {
      // 无数据禁止点击
      if (!data.data) {
        return
      }
      //保存选择省份，获取省份疫情
      if (data.data.type === 'province') {
        this.$store.commit('setLocation', { location: data.data.name })
      }
      // 判断是否是市锚点点击事件
      if (data.data.type !== 'province') {
        this.clickElement(data.data)
        return
      }
      this.isChina = false
      const id = _.find(chinaData.features, e => e.properties.name === data.name).properties.id
      if (!id) {
        return
      }
      this.load(id, data.name)
    },
    // 点击锚点
    clickElement(obj) {
      this.$emit('onChange', obj)
    },
    // 加载城市地图
    load(id, name) {
      import('./china-geojson/geometryProvince/' + id + '.json').then(res => {
        echarts.registerMap(id, res.default)
        this.options.series[0].map = id
        this.options.geo.map = id
        this.options.series[0].data = []
        this.options.series[1].data = []
        this.getProvinceProject(name)
      })
    }
  }
}
</script>

<style scoped lang="less">
// 放大
@keyframes scaleChinaAnimation {
  0% {
    transform: scale(3);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.echarts-map {
  width: 100%;
  height: 80%;
  position: relative;
  .map {
    width: 100%;
    height: 100%;
    animation: scaleChinaAnimation 2s;
  }
  .back {
    position: absolute;
    cursor: pointer;
    z-index: 2;
    top: 50px;
    left: 50%;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.7);
    transition: all 0.4s;
    &:hover {
      color: #fff;
    }
  }
}
</style>
