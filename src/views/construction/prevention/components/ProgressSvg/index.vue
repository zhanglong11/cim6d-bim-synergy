<template>
  <div class="wrap">
    <svg :style="{ width, height: width }" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <linearGradient :id="id" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" :stop-color="startColor" />
          <stop offset="100%" :stop-color="endColor" />
        </linearGradient>
      </defs>
      <circle
        :cx="width / 2"
        :cy="width / 2"
        :r="r"
        fill="none"
        :stroke="'url(#' + id + ')'"
        :stroke-dashoffset="mounted ? ((100 - progress) / 100) * perimeter : perimeter"
        :stroke-dasharray="4"
        :stroke-width="circleWidth"
      ></circle>
    </svg>
    <div class="content">
      <p>
        {{ title }}
      </p>
      <p>
        <span class="num">{{ num }}</span>
        <span class="unit">{{ unit }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressCircle',
  props: {
    progress: {
      type: Number,
      default: 40
    },
    width: {
      type: Number,
      default: 140
    },
    backCircleWidth: {
      type: Number,
      default: 6
    },
    circleWidth: {
      type: Number,
      default: 10
    },
    startColor: {
      type: String,
      default: 'transparent'
    },
    endColor: {
      type: String,
      default: 'transparent'
    },
    title: {
      type: String
    },
    num: {
      type: Number
    },
    unit: {
      type: String
    }
  },
  data() {
    return {
      id: Math.random().toString(),
      mounted: false
    }
  },
  computed: {
    r() {
      return (this.width - this.circleWidth) / 2
    },
    perimeter() {
      return 2 * Math.PI * this.r
    }
  },
  mounted() {
    setTimeout(() => (this.mounted = true), 1)
  }
}
</script>

<style scoped lang="less">
.wrap {
  position: relative;
  .content {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    transform: scale(0.7);
    top: 0;
    left: 0;
    flex-direction: column;
    justify-content: center;
    > p {
      text-align: center;
      font-size: 20px;
      .num {
        font-size: 40px;
      }
      .unit {
        margin-left: 10px;
      }
    }
  }
}
svg {
  margin: 0 auto;
  circle {
    transition: stroke-dashoffset 0.6s;
  }
}
</style>
