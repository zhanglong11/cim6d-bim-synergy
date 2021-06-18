<template>
  <div class="video base-wrap">
    <div class="left">
      <div class="video-type">
        <div class="type-header">
          <span class="title">监控视频</span>
        </div>
        <ul class="type-body">
          <li
            v-for="(item, i) in videoList"
            :key="i"
            :class="{ active: playingList.slice(0, mode).includes(item) }"
            @click="playVideo(item)"
          >
            <p class="title">{{ item.deviceName }}</p>
            <!--            <p class="focus">-->
            <!--              <img :src="item.capturePicture" />-->
            <!--            </p>-->
          </li>
        </ul>
      </div>
    </div>
    <div class="right">
      <!-- 单视频播放模式 start -->
      <div style="margin-bottom: 15px;display: flex;justify-content: space-between;">
        <div>
          <el-radio-group v-model="mode">
            <el-radio-button :label="1">单个</el-radio-button>
            <el-radio-button :label="2">二宫格</el-radio-button>
            <el-radio-button :label="4">四宫格</el-radio-button>
            <!--          <el-radio-button :label="6">六宫格</el-radio-button>
            <el-radio-button :label="9">九宫格</el-radio-button>
            <el-radio-button :label="12">十二宫格</el-radio-button>-->
          </el-radio-group>
          <el-button
            style="margin-left: 15px;"
            type="primary"
            @click="() => $fullscreen.toggle($el.querySelector('.video-list'))"
            >全屏</el-button
          >
        </div>
        <div>
          <el-radio-group v-model="videoType">
            <el-radio-button label="HLS">线路一</el-radio-button>
            <el-radio-button label="WS_FLV">线路二</el-radio-button>
            <el-radio-button label="FLV">线路三</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="model-container">
        <span class="model-line top-left-line"></span>
        <span class="model-line top-right-line"></span>
        <span class="model-line bottom-left-line"></span>
        <span class="model-line bottom-right-line"></span>
        <el-row type="flex" class="video-list">
          <template>
            <el-col
              v-for="(item, index) in playingList.slice(0, mode)"
              :key="item.id + '-' + index"
              class="video-wrap"
              :span="computedVideoSpan"
            >
              <Video v-if="_.get(item, 'videoUrl')" :url="item.videoUrl[videoType]" />
              <div v-else class="empty">
                <div>
                  <img src="@/assets/images/offline.png" alt="" />
                  <p>离线中</p>
                </div>
              </div>
              <p v-if="item" class="name">{{ item.deviceName }}</p>
            </el-col>
            <template v-if="mode - playingList.length > 0">
              <el-col
                v-for="index in mode - playingList.length"
                :key="'empty-' + index"
                class="video-wrap"
                :span="computedVideoSpan"
              >
                <div class="empty">
                  <p>无</p>
                </div>
              </el-col>
            </template>
          </template>
        </el-row>
      </div>
      <!-- 单视频播放模式 end -->
    </div>
  </div>
</template>

<script>
import Api from './api'
export default {
  //import引入的组件需要注入到对象中才能使用
  name: 'videoPlayer',
  components: {},
  data() {
    //这里存放数据
    return {
      videoList: [],
      videoType: 'HLS',
      // 实际并不止是在播放的视频，比如从九宫格，切换为四宫格，这个数组里的视频并不会减少，播放的时候会取前四个
      playingList: [],
      queryForm: {
        page: 1,
        rows: 1000,
        projectId: localStorage.getItem('projectId')
      },
      // 1,2,4,6,9,12
      mode: 4,
      // 最后一个被替换视频的位置，切换宫格数会重置为 0
      lastReplacedIndex: 0
    }
  },
  computed: {
    computedVideoSpan() {
      return { 1: 24, 2: 12, 4: 12, 6: 8, 9: 8, 12: 6 }[this.mode]
    }
  },
  watch: {
    mode() {
      this.lastReplacedIndex = 0
      const isFull = this.mode <= this.playingList.length
      const spareVideoList = _.differenceBy(this.videoList, this.playingList, 'id')
      if (!isFull && spareVideoList.length > 0) {
        spareVideoList.slice(0, this.mode - this.playingList.length).forEach(video => {
          this.playVideo(video)
        })
      }
    }
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // this.getTypeList()
    this.refresh()
  },
  //方法集合
  methods: {
    async refresh() {
      let params = {
        projectId: localStorage.getItem('projectId'),
        page: 1,
        rows: 1000
      }
      let res = await Api.getDeviceList(params)
      let videoList = res.data.records || []
      videoList.forEach(e => {
        e.videoUrl = ''
      })
      this.videoList = videoList
      if (videoList.length && this.playingList.length === 0) {
        await this.$nextTick()
        videoList.forEach((item, index) => {
          if (index < this.mode) {
            this.playVideo(item)
          }
        })
      }
    },
    /**
     * 播放视频，自动往列表后面添加，如果列表满了，就从第一个开始轮流替换
     * @param item
     * @returns {Promise<void>}
     */
    async playVideo(item) {
      if (this.playingList.includes(item)) {
        this.playingList.splice(_.findIndex(this.playingList, item), 1)
      } else {
        if (this.playingList.length < this.mode) {
          this.playingList.push(item)
        } else {
          this.playingList.splice(this.lastReplacedIndex, 1, item)
          if (this.lastReplacedIndex < this.mode - 1) {
            this.lastReplacedIndex++
          } else {
            this.lastReplacedIndex = 0
          }
        }
        await this.getVideoUrl(item)
      }
    },
    async getVideoUrl(item) {
      const res = await Api.getVideoUrl({ factoryNum: item.factoryNum, deviceNum: item.deviceNum })
      item.videoUrl = res.data
    },
    async touch() {
      if (!this.playingList.length) return false
      this.playingList.slice(0, this.mode).forEach(e => {
        Api.touch({ factoryNum: e.factoryNum, deviceNum: e.deviceNum })
      })
    },
    clearTouch() {
      clearInterval(this.timer)
      this.timer = null
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../../styles/common.less');
//@import url(); 引入公共css类
.video {
  display: flex;
  .left {
    margin: 0 30px 0 20px;
    width: 218px;
  }
  .right {
    flex: 1;
  }
}
.video-type {
  .type-header {
    margin-bottom: 10px;
    padding: 0 8px;
    display: flex;
    align-items: center;
    height: 26px;
    font-size: 16px;
    color: #fff;
    background: #0b1e3a;
    .title {
      flex: 1;
    }
    .list-type {
      display: inline-flex;
      align-items: center;
      .list-type-icon {
        margin-left: 5px;
        width: 26px;
        height: 26px;
        cursor: pointer;
        transition: all 0.4s;
        &.icon-one {
          background: url('../images/video/icon2.png');
          &.active,
          &:hover {
            background: url('../images/video/icon2-1.png');
          }
        }
        &.icon-list {
          background: url('../images/video/icon3.png');
          &.active,
          &:hover {
            background: url('../images/video/icon3-1.png');
          }
        }
      }
    }
  }
  .type-body {
    height: 920px;
    overflow-y: auto;
    padding-top: 15px;
    background: #0e1931;
    li {
      margin-bottom: 15px;
      padding: 0 15px 16px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s;
      .title {
        margin-bottom: 12px;
        padding-left: 20px;
        background: url('../images/video/icon1.png') left center no-repeat;
        line-height: 30px;
        color: #fff;
        transition: all 0.3s;
      }
      .focus {
        width: 185px;
        height: 114px;
        overflow: hidden;
        border-radius: 4px;
        img {
          width: 100%;
          height: 100%;
          transition: all 0.4s;
          border-radius: 4px;
        }
      }
      &:hover {
        .focus {
          img {
            transform: scale(1.1);
          }
        }
      }
      &.active {
        background: #182c4f;
        .title {
          background-image: url('../images/video/icon1-1.png');
          color: #00d7ff;
        }
      }
    }
  }
}
.model-container {
  padding: 20px 15px;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
  .model-line {
    position: absolute;
    background: url('../images/model-line.png');
    width: 152px;
    height: 143px;
    z-index: -1;
    &.top-left-line {
      top: 0;
      left: 0;
    }
    &.top-right-line {
      top: 0;
      right: 0;
      transform: rotate(90deg);
    }
    &.bottom-right-line {
      bottom: 0;
      right: 0;
      transform: rotate(180deg);
    }
    &.bottom-left-line {
      bottom: 0;
      left: 0;
      transform: rotate(-90deg);
    }
  }
}
.video-list {
  border: 2px solid #5a90bd;
  flex-wrap: wrap;
  justify-content: stretch;
  &.fullscreen {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
}
.video-wrap {
  border: 2px solid #5a90bdcc;
  background-color: #000;
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
  /deep/ .xgplayer {
    width: 100%;
    height: 100%;
  }
  .name {
    position: absolute;
    top: 0;
    right: 10px;
    color: #eee;
    z-index: 1000;
    display: block;
    width: 100%;
    text-align: right;
    font-size: 14px;
    line-height: 28px;
  }
  .empty {
    height: 0;
    padding-top: 56.25%;
    position: relative;
    width: 100%;
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        height: 40px;
        margin-right: 15px;
      }
      position: absolute;
      width: 100%;
      text-align: center;
      color: #f00;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    > p {
      position: absolute;
      width: 100%;
      text-align: center;
      color: #eee;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
