<template>
  <div class="video-container-wrap">
    <div class="video-container"></div>
    <div :id="id" class="video"></div>
  </div>
</template>

<script>
export default {
  name: 'Video',
  props: {
    url: {
      required: true
    }
  },
  data() {
    return {
      id: 'video-' + _.uniqueId()
    }
  },
  watch: {
    url() {
      this.player.destroy()
      this.player = new WasmPlayer(null, this.id, null, {
        cbUserPtr: this,
        Height: true,
        HideKbs: true
      })
      this.player.play(this.url, 1)
    }
  },
  mounted() {
    // 实例化播放器
    this.player = new WasmPlayer(null, this.id, null, {
      cbUserPtr: this,
      Height: true,
      HideKbs: true
    })
    // 调用播放
    this.player.play(this.url, 1)
  }
}
</script>

<style lang="less">
a[title='青犀视频'] {
  display: none !important;
}
.video-container-wrap {
  position: relative;
  width: 100%;
  .video-container {
    width: 100%;
    padding-top: 56.25%;
    position: relative;
  }
  .video {
    position: absolute !important;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
