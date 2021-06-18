<template>
  <div :class="['bar-controls']">
    <div :class="['bar-controls-wrapper']">
      <span :class="['bar-controls-button', 'toStart']" @click="$emit('backwardToStart')"></span>
      <span :class="['bar-controls-button', 'backwardStep']" @click="$emit('stepBack')"></span>
      <span :class="['bar-controls-button', 'backwardPlay']" @click="$emit('backwardPlay')"></span>
      <span :class="['bar-controls-button', 'pause']" @click="$emit('pause')"></span>
      <span :class="['bar-controls-button', 'forwardPlay']" @click="$emit('forwardPlay')"></span>
      <span :class="['bar-controls-button', 'forwardStep']" @click="$emit('stepForward')"></span>
      <span :class="['bar-controls-button', 'toEnd']" @click="$emit('forwardToEnd')"></span>
      <span :class="['bar-controls-label']">播放速度</span>
      <span>
        <el-select v-model="playSpeed" :style="{ width: '70px' }">
          <el-option v-for="speed in playSpeeds" :key="speed" :value="speed" :label="`${speed}X`"
            >{{ speed }}X</el-option
          >
        </el-select>
      </span>
    </div>
    <div :class="['bar-controls-addition']">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BarControls',
  props: {
    backToStartClick: Function,
    stepBackClick: Function,
    pauseClick: Function,
    forwardPlayClick: Function,
    stepForwardClick: Function,
    forwardToEndClick: Function,
    onPlaySpeedChange: Function,
    playSpeeds: {
      type: Array,
      default: () => [1, 2, 4, 8, 16]
    }
  },
  data() {
    return {
      playSpeed: 1
    }
  },
  watch: {
    playSpeed(newSpeed) {
      this.$emit('playSpeedChange', newSpeed)
    }
  },
  created() {
    this.$emit('playSpeedChange', this.playSpeed)
  }
}
</script>

<style lang="less" scoped>
.bar-controls {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;

  &-label {
    height: 16px;
    line-height: 16px;
    padding: 0 12px;
    font-size: 12px;
  }

  &-button {
    height: 16px;
    width: 16px;
    margin-right: 6px;
    background-size: 18px;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.7;
    display: inline-block;

    &.toStart,
    &.toEnd {
      background-image: url('./assets/toStart.svg');
    }

    &.backwardStep,
    &.forwardStep {
      background-image: url('./assets/backwardStep.svg');
    }

    &.backwardPlay,
    &.forwardPlay {
      background-image: url('./assets/playBackward.svg');
    }

    &.toEnd,
    &.forwardStep,
    &.forwardPlay {
      transform-origin: center;
      transform: rotate(180deg);
    }

    &.pause {
      background-image: url('./assets/pause.svg');
    }

    &:hover {
      cursor: pointer;
      opacity: 1;
    }
  }

  &-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 40%;
    padding: 10px 0;
  }
}
</style>
