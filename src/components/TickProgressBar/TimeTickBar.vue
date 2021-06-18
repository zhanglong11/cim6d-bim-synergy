<template>
  <div>
    <div>
      <BarControls
        :play-speeds="[1, 2, 4, 8, 16, 32, 60]"
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
  name: 'TimeTickBar',
  components: { BarControls },
  props: {
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
    tickChange: Function
  },
  data() {
    this.isPlaying = false
    this.backwardsPlaying = false
    this.playingSpeed = 1
    this.playingTimer = null
    return {
      width: 0
    }
  },
  watch: {
    start(newValue) {
      this.calcTicks(newValue, this.end)
    },
    end(newValue) {
      this.calcTicks(this.end, newValue)
    },
    width() {
      const canvas = this.$refs.canvas
      console.log(canvas.getContext('2d'))
      if (this.barRenderer) {
        this.barRenderer.context = canvas.getContext('2d')
        this.barRenderer.render()
      }
    }
  },
  mounted() {
    const canvas = this.$refs.canvas
    this.resetCanvasSize()
    console.log(this.$refs.canvas.width)

    this.$nextTick(() => {
      this._renderContext = canvas.getContext('2d')
      /**@member {ScaleBarRenderer} barRenderer*/
      this.barRenderer = new ScaleBarRenderer(this._renderContext)
      this.barRenderer.setTicksAddtionMethod((x, amount) => {
        return x.clone().add(amount, 'seconds')
      })
      this.barRenderer.setTickStringifyMethod(x => x.format('HH:mm:ss'))
      this.barRenderer.onTickChange = (idx, val) => {
        this.$emit('tickChange', idx, val.format('HH:mm:ss'))
      }

      this.calcTicks(this.start, this.end)
      this.barRenderer.render()
    })
  },
  methods: {
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
    calcTicks(start, end) {
      const startDate = moment(start, 'HH:mm:ss')
      const endDate = moment(end, 'HH:mm:ss')
      const tickCounts = moment.duration(endDate.diff(startDate)).asSeconds() + 1
      console.log(tickCounts)
      this.barRenderer.setTicksInitialValue(startDate.clone())

      this.barRenderer.setTicksCount(tickCounts)
      this.barRenderer.curTickIndex = 0
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
  // border: 1px solid #47b9df;
  box-shadow: inset 0 0px 14px #47b9df;
}
</style>
