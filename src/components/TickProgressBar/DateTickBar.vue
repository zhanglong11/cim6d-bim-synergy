<template>
  <div>
    <div>
      <BarControls
        v-if="showControls"
        @backwardToStart="handleBackToStart"
        @stepBack="handleStepBack"
        @backwardPlay="handleBackwardPlay"
        @pause="handlePause"
        @forwardPlay="handleForwardPlay"
        @stepForward="handleStepForward"
        @forwardToEnd="handleForwardToEnd"
        @playSpeedChange="handlePlaySpeedChange"
      >
        <slot></slot>
      </BarControls>
    </div>
    <div class="border">
      <canvas ref="canvas" :height="48" :width="width"></canvas>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import BarControls from './BarControls'
import ScaleBarRenderer from './scale-bar/mainRenderer'

export default {
  name: 'DateTickBar',
  components: { BarControls },
  props: {
    // 是否显示工具栏
    showControls: {
      type: Boolean,
      default: false
    },
    start: {
      type: String,
      required: true
    },
    end: {
      type: String,
      required: true
    },
    interval: {
      type: Number,
      default: 1500
    },
    tickChange: Function,
    scaleUnit: {
      type: String,
      default: 'month'
    },
    width: {
      type: [String, Number],
      required: false,
      default: 0
    }
  },
  data() {
    // bug#1692 点击其他模块没反应 没有正确书写data 申豪强 2020-04-16
    return {
      isPlaying: false,
      backwardsPlaying: false,
      playingSpeed: 1,
      playingTimer: null
    }
  },
  watch: {
    start(newValue) {
      console.log(newValue)
      this.calcTicks(newValue, this.end)
    },
    end(newValue) {
      this.calcTicks(this.start, newValue)
    },
    width() {
      const canvas = this.$refs.canvas
      console.log(canvas.getContext('2d'))
      if (this.barRenderer) {
        this.barRenderer.context = canvas.getContext('2d')
        this.barRenderer.render()
      }
    },
    scaleUnit() {
      this.initBar()
      this.calcTicks(this.start, this.end)
    }
  },
  created() {
    /**
     任务名称：2739/进度模拟播放器刻度关联
     开发人员：崔洛宜
     日期：2020-3-26
     任务类型：进度模拟播放器刻度关联
     **/
    /*const canvas = this.$refs.canvas
    this.resetCanvasSize()
    console.log(this.$refs.canvas.width)

    this.$nextTick(() => {
      this._renderContext = canvas.getContext('2d')
      /!**@member {ScaleBarRenderer} barRenderer*!/
      this.barRenderer = new ScaleBarRenderer(this._renderContext)
      this.barRenderer.setTicksAddtionMethod((x, amount) => {
        return x.clone().add(amount, 'days')
      })
      this.barRenderer.setTickStringifyMethod(x => x.format('MM月DD日'))
      this.barRenderer.onTickChange = (idx, val) => {
        this.$emit('tickChange', idx, val.format('YYYY-MM-DD'))
      }

      this.calcTicks(this.start, this.end)
      this.barRenderer.render()
    })*/
    this.$nextTick(() => {
      this.initBar()
    })
  },
  /*mounted() {
    this.width = window.innerWidth - 650
  },*/
  methods: {
    getTime(n, targetDate) {
      let now = new Date(targetDate)
      let year = now.getFullYear()
      //因为月份是从0开始的,所以获取这个月的月份数要加1才行
      let month = now.getMonth() + 1
      let date = now.getDate()
      let day = now.getDay()
      console.log(date)
      //判断是否为周日,如果不是的话,就让今天的day-1(例如星期二就是2-1)
      if (day !== 0) {
        n = n + (day - 1)
      } else {
        n = n + day
      }
      if (day) {
        //这个判断是为了解决跨年的问题
        if (month > 1) {
          // month = month
        }
        //这个判断是为了解决跨年的问题,月份是从0开始的
        else {
          year = year - 1
          month = 12
        }
      }
      now.setDate(now.getDate() - n)
      year = now.getFullYear()
      month = now.getMonth() + 1
      date = now.getDate()
      console.log(n)
      let s = year + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date)
      return s
    },
    /**
     任务名称：2739/进度模拟播放器刻度关联
     开发人员：崔洛宜
     日期：2020-3-26
     任务类型：进度模拟播放器刻度关联
     **/
    initBar() {
      const canvas = this.$refs.canvas
      this.resetCanvasSize()
      this._renderContext = canvas.getContext('2d')
      /**@member {ScaleBarRenderer} barRenderer*/
      /**
       任务名称：BUG#1339/进度模拟播放器初始化问题
       开发人员：崔洛宜
       日期：2020-3-27
       任务类型：进度模拟播放器初始化问题
       **/
      if (!this.barRenderer) {
        this.barRenderer = new ScaleBarRenderer(this._renderContext)
      }
      switch (this.scaleUnit) {
        case 'month':
          this.barRenderer.setTicksAddtionMethod((x, amount) => {
            return x.clone().add(amount, 'months')
          })
          this.barRenderer.setTickStringifyMethod(x => x.format('YYYY年MM月'))
          this.barRenderer.onTickChange = (idx, val) => {
            this.$emit('tickChange', idx, val.format('YYYY-MM-DD'))
          }
          break
        case 'week':
          this.barRenderer.setTicksAddtionMethod((x, amount) => {
            return x.clone().add(amount, 'week')
          })
          this.barRenderer.setTickStringifyMethod(x => x.format('MM月DD日'))
          this.barRenderer.onTickChange = (idx, val) => {
            this.$emit('tickChange', idx, val.format('YYYY-MM-DD'))
          }
          break
        case 'day':
          this.barRenderer.setTicksAddtionMethod((x, amount) => {
            return x.clone().add(amount, 'days')
          })
          this.barRenderer.setTickStringifyMethod(x => x.format('MM月DD日'))
          this.barRenderer.onTickChange = (idx, val) => {
            this.$emit('tickChange', idx, val.format('YYYY-MM-DD'))
          }
          break
        default:
          return false
      }
      /*this.barRenderer.setTickStringifyMethod(x => x.format('MM月DD日'))
      this.barRenderer.onTickChange = (idx, val) => {
        this.$emit('tickChange', idx, val.format('YYYY-MM-DD'))
      }*/

      this.calcTicks(this.start, this.end)
      this.barRenderer.render()
    },
    handleBackToStart() {
      this.barRenderer.curTickIndex = 0
      this.barRenderer.adjustCursorToCenter()
      clearInterval(this.playingTimer)
      this.playingTimer = null
    },
    handleStepBack() {
      this.barRenderer.moveCursorN(-this.playingSpeed)
      this.barRenderer.adjustCursorToCenterByStep()
      if (this.isPlaying) {
        this.generatePlayingInterval()
      }
    },
    handleBackwardPlay() {
      this.isPlaying = true
      this.backwardsPlaying = true
      if (this.barRenderer.curTickIndex > 0) {
        this.barRenderer.moveCursorN(-this.playingSpeed)
        if (!this.checkPlayIsOver()) this.generatePlayingInterval()
      }
    },
    handlePause() {
      this.isPlaying = false
      if (this.playingTimer) clearInterval(this.playingTimer)
    },
    handleForwardPlay() {
      this.isPlaying = true
      this.backwardsPlaying = false
      if (this.barRenderer.curTickIndex < this.barRenderer.getTicksCount() - 1) {
        this.barRenderer.moveCursorN(this.playingSpeed)
        if (!this.checkPlayIsOver()) this.generatePlayingInterval()
      }
    },
    handleStepForward() {
      this.barRenderer.moveCursorN(this.playingSpeed)
      this.barRenderer.adjustCursorToCenterByStep()
      if (this.isPlaying) {
        this.generatePlayingInterval()
      }
    },
    handleForwardToEnd() {
      this.barRenderer.curTickIndex = this.barRenderer.getTicksCount() - 1
      this.barRenderer.adjustCursorToCenter()
      clearInterval(this.playingTimer)
      this.playingTimer = null
    },
    handlePlaySpeedChange(speed) {
      this.playingSpeed = speed
    },
    resetCanvasSize() {
      /**@type {HTMLCanvasElement} */
      const canvas = this.$refs.canvas
      console.log(canvas.parentElement.getBoundingClientRect())
      this.width = canvas.parentElement.getBoundingClientRect().width
      if (this.barRenderer) this.barRenderer.render()
    },
    /**
     任务名称：2739/进度模拟播放器刻度关联
     开发人员：崔洛宜
     日期：2020-3-26
     任务类型：进度模拟播放器刻度关联
     **/
    calcTicks(start, end) {
      let startDate = moment(start, 'YYYY-MM-DD HH:00:00')
      const endDate = moment(end, 'YYYY-MM-DD HH:00:00')
      let curTickIndex = 0
      let tickCounts
      switch (this.scaleUnit) {
        case 'month':
          tickCounts = moment.duration(endDate.diff(startDate)).asMonths() + 1
          curTickIndex = 0
          break
        //  修复模拟数据固定为日的问题，时间轴按照后台数据传 申豪强 2020-04-20
        case 'week':
          if (this.scaleUnit === 'week') {
            if (moment(start).day() !== 0) {
              startDate = moment(this.getTime(1, start), 'YYYY-MM-DD HH:00:00')
              curTickIndex = 1
            } else {
              curTickIndex = 0
            }
          }
          tickCounts = moment.duration(endDate.diff(startDate)).asWeeks() + 1
          break
        case 'day':
          tickCounts = moment.duration(endDate.diff(startDate)).asDays() + 1
          curTickIndex = 0
          break
        default:
          return false
      }
      this.barRenderer.setTicksInitialValue(startDate.clone())

      this.barRenderer.setTicksCount(tickCounts)
      this.barRenderer.curTickIndex = curTickIndex
      this.barRenderer.render()
    },
    checkPlayIsOver() {
      if (!this.isPlaying) {
        return false
      }
      if (this.backwardsPlaying && this.barRenderer.curTickIndex == 0) {
        console.log('over')
        clearInterval(this.playingTimer)
        this.playingTimer = null
        this.isPlaying = false
        this.$emit('backwardsPlayingOver')
        return true
      } else if (this.barRenderer.curTickIndex == this.barRenderer.getTicksCount() - 1) {
        console.log('over')
        clearInterval(this.playingTimer)
        this.playingTimer = null
        this.isPlaying = false
        this.$emit('forwardsPlayingOver')
        return true
      }
      return false
    },
    generatePlayingInterval() {
      if (this.playingTimer) clearInterval(this.playingTimer)

      this.playingTimer = setInterval(() => {
        if (this.backwardsPlaying) {
          this.barRenderer.moveCursorN(-this.playingSpeed)
        } else {
          this.barRenderer.moveCursorN(this.playingSpeed)
        }
        this.barRenderer.adjustCursorToCenterByStep()
        if (this.checkPlayIsOver()) {
          clearInterval(this.playingTimer)
          this.playingTimer = null
        }
      }, this.interval)
    }
  }
}
</script>
<style lang="less" scoped>
.border {
  // box-shadow: inset 0 0px 14px #47b9df;
}
</style>
