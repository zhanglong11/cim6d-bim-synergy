<template>
  <div class="information base-wrap">
    <div class="left">
      <!-- 大事记 start -->
      <div class="main-title">
        <span class="name">大事记</span>
        <span class="sub">Memorabilia</span>
      </div>
      <div class="information-list">
        <ul>
          <li v-for="(item, i) in greatEventData" :key="i">
            <span class="status">大事记</span>
            <div class="list-con">
              <p class="title" @click="showInfo(item, 'event')" v-text="item.title"></p>
              <p class="time" v-text="item.occurTime"></p>
              <p class="desc">{{ item.content }}</p>
            </div>
          </li>
        </ul>
      </div>
      <!-- 大事记 end -->
    </div>
    <div class="right">
      <!-- 信息详情-模态框 start -->
      <div class="information-info" :class="{ open: infoOpen }">
        <div class="info-header">
          <span class="status">{{ getType(infoDetails.cateogry) }}</span>
          <p class="title" v-text="infoDetails.title"></p>
          <span class="info-close el-icon-close" @click="infoOpen = false"></span>
        </div>
        <div class="source">
          <span class="name">发布人：{{ infoDetails.receiverName }}</span>
          <span class="time" v-text="infoDetails.createTime"></span>
        </div>
        <div class="info-body">
          <div v-html="infoDetails.content"></div>
          <div class="file-list">
            <span class="label">附件</span>
            <FileList :ids="infoDetails.contentFileIds" />
          </div>
        </div>
      </div>
      <!-- 信息详情-模态框 end -->
      <!-- 今日公告 start -->
      <div class="main-title3">
        <span class="name">今日公告</span>
      </div>
      <div class="notice-total">
        <span class="status">
          <img src="../images/notice.png" />
        </span>
        <p class="desc">今有{{ noticeList.length }}条公告</p>
      </div>
      <div class="information-list notice-list">
        <ul>
          <li v-for="(item, i) in noticeList" :key="i">
            <span class="status">{{ getType(item.cateogry) }}</span>
            <div class="list-con">
              <p class="title" @click="showInfo(item)" v-text="item.title"></p>
              <p class="time" v-text="item.createTime"></p>
              <p class="desc" v-html="item.content"></p>
            </div>
          </li>
        </ul>
      </div>
      <!-- 今日公告 end -->

      <!-- 公告发布统计  start -->
      <div class="main-title">
        <span class="name">公告发布统计 </span>
        <span class="sub">Announcement Statistics</span>
      </div>
      <ChartLine container="announcementStatistics" :options="announcementStatistics" :height="380" />
      <!-- 公告发布统计  end -->
    </div>
  </div>
</template>

<script>
/*
   任务名称：task#2891 【智慧施工2.0-前端】信息管理模块切图及功能开发
   开发人员：耿为刚
   日期：2020-04-13
   任务类型：全新代码
 */
import ChartLine from '../components/chart-line'
import { systemApi } from '../api/system-api'
export default {
  //import引入的组件需要注入到对象中才能使用
  name: 'home',
  components: {
    ChartLine
  },
  data() {
    //这里存放数据
    return {
      greatEventData: [], // 大事记列表
      noticeList: [], // 公告列表
      infoOpen: false, // 显示信息详情模态框
      infoDetails: {}, // 信息详情
      // 公告类型
      noticeType: {
        'announcement-1': '重要公告',
        'announcement-2': '法定公告',
        'announcement-3': '专业公告'
      },
      announcementStatistics: {
        legend: {
          show: true,
          top: 10,
          right: 0,
          textStyle: {
            color: '#fff'
          }
        },
        color: ['#529ace', '#5ce44a', '#4ae4c5', '#e4b74a'],
        xAxis: [
          {
            data: ['04/23', '04/24', '04/25', '04/26', '04/27', '04/28', '04/29']
          }
        ],
        yAxis: [
          {
            name: '',
            axisLabel: {
              color: 'rgba(151,197,255,0.7)',
              fontSize: 14
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(255,255,255,0.3)'
              }
            }
          }
        ],
        series: [
          {
            name: '系统',
            type: 'line',
            data: [5, 4, 6, 7, 3, 2, 10]
          },
          {
            name: '会议',
            type: 'line',
            data: [1, 3, 5, 10, 0, 0, 5]
          },
          {
            name: '审批',
            type: 'line',
            data: [18, 10, 22, 6, 14, 5, 18]
          },
          {
            name: '任务',
            type: 'line',
            data: [2, 1, 3, 5, 10, 0, 4]
          }
        ]
      }
    }
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // 查询大事记数据
    this.queryListEvent()
    // 查询公告数据
    //this.queryList(2)
    this.getNoticeList()
  },
  computed: {
    // 项目id
    projectId() {
      return this.$store.state.project.projectId
    }
  },
  //方法集合
  methods: {
    // 查看详情
    showInfo(item, type) {
      this.infoOpen = true
      console.log('查看详情', item)
      this.infoDetails = Object.assign({}, item, { receiverName: '' })
      if (type !== 'event') {
        this.getUserInfo(item.receiverId)
      } else {
        this.infoDetails.createTime = item.occurTime
        this.infoDetails.receiverName = item.creatorName
      }
    },
    // 查询大事记数据
    async queryListEvent() {
      let params = {
        page: 1,
        rows: 4,
        projectId: this.projectId
      }
      const result = await systemApi.queryListEvent(params)
      const datas = result.data
      const list = datas.records
      list.map(item => {
        item.title = item.title.replace(/<.*?>/g, '')
        item.content = item.content.replace(/<.*?>/g, '')
      })
      this.greatEventData = list
    },
    async getNoticeList() {
      const result = await systemApi.queryNoticeList({ projectId: this.projectId })
      const datas = result.data
      const list = datas.records
      list.map(item => {
        item.title = item.title.replace(/<.*?>/g, '')
        item.content = item.content.replace(/<.*?>/g, '').replace(/↵|\n/g, '<br>')
      })
      this.noticeList = list
    },
    // 查询消息列表
    async queryList(classification, number = 4) {
      const params = {
        classification,
        type: '',
        keyWords: '',
        page: 1,
        rows: number
      }
      const result = await systemApi.queryListMessage(params)
      const datas = result.data
      const list = datas.records
      // 公告 classification 1 消息 2公告 3大事记
      if (classification === 2) {
        this.noticeList = list
      }
      // 大事记
      if (classification === 3) {
        this.greatEventData = list
      }
    },
    // 获取类型
    getType(type) {
      if (!type) {
        return '大事记'
      }
      return this.noticeType[type]
    },
    // 查询用户详情
    async getUserInfo(id) {
      if (!id) {
        return
      }
      const result = await systemApi.getUserInfo(id)
      const datas = result.data
      this.infoDetails.receiverName = datas.realName
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../../styles/common.less');
//@import url(); 引入公共css类
.information {
  .left {
    width: 450px;
  }
  .right {
    margin-left: 50px;
    padding-left: 35px;
    flex: 1;
    position: relative;
  }
}
.information-list {
  .status {
    margin-top: 4px;
    margin-right: 20px;
    min-width: 46px;
    height: 24px;
    font-size: 14px;
    color: #7ed0ef;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #032743;
    border-radius: 3px;
  }
  ul {
    li {
      padding: 20px 0;
      display: flex;
      position: relative;
      &:after {
        content: '';
        width: 100%;
        height: 1px;
        background-image: url('../images/d-line.png');
        background-repeat: no-repeat;
        animation: scaleAnimation 4s infinite;
        position: absolute;
        bottom: 0;
        left: 0;
      }
      @delay: 200ms;
      &:nth-child(1):after {
        animation-delay: 1 * @delay;
      }
      &:nth-child(2):after {
        animation-delay: 2 * @delay;
      }
      &:nth-child(3):after {
        animation-delay: 3 * @delay;
      }
      &:nth-child(4):after {
        animation-delay: 4 * @delay;
      }
      &:nth-child(5):after {
        animation-delay: 5 * @delay;
      }
      &:nth-child(6):after {
        animation-delay: 6 * @delay;
      }
      &:nth-child(7):after {
        animation-delay: 7 * @delay;
      }
      &:nth-child(8):after {
        animation-delay: 8 * @delay;
      }
      &:nth-child(9):after {
        animation-delay: 9 * @delay;
      }
      &:nth-child(10):after {
        animation-delay: 10 * @delay;
      }
      &:nth-child(11):after {
        animation-delay: 11 * @delay;
      }
      &:nth-child(12):after {
        animation-delay: 12 * @delay;
      }
      .list-con {
        flex: 1;
        font-size: 14px;
        .title {
          font-size: 18px;
          color: #fff;
          cursor: pointer;
          transition: all 0.3s;
          &:hover {
            color: #55cad4;
          }
        }
        .time {
          margin: 10px 0 15px;
          color: #55cad4;
        }
        .desc {
          color: #486f97;
        }
      }
    }
  }
  &.notice-list {
    margin-bottom: 70px;
    max-height: 40vh;
    overflow-x: hidden;
    overflow-y: auto;
    ul {
      li {
        padding-left: 50px;
        &:after {
          background-image: url('../images/d-line2.png');
        }
        .status {
          margin-top: 8px;
        }
        .list-con {
          .title,
          .time {
            margin-right: 15px;
            display: inline-block;
          }
        }
      }
    }
  }
}
.notice-total {
  margin-left: 50px;
  display: flex;
  align-items: center;
  .status {
    margin-right: 8px;
    min-width: 34px;
    height: 25px;
    background: #032a41;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    font-size: 14px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .desc {
    border-radius: 3px;
    width: 170px;
    height: 25px;
    background: #032a41;
    color: #08b6d9;
    font-size: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}
.information-info {
  padding: 35px 45px;
  position: absolute;
  z-index: 2;
  background: #031127;
  border: 1px #162032 solid;
  width: 100%;
  height: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  transform: scale(0);
  transition: all 0.4s;
  opacity: 0;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  &.open {
    transform: scale(1);
    opacity: 1;
    height: 870px;
  }
  .info-header {
    display: flex;
    align-items: center;
    justify-content: center;
    .status {
      .information-list .status;
      margin-top: 0;
    }
    .title {
      font-size: 20px;
      color: #7fdcff;
    }
    .info-close {
      padding: 4px;
      position: absolute;
      top: 38px;
      right: 45px;
      background: #072134;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        color: #fff;
        transform: scale(1.2) rotate(360deg);
      }
    }
  }
  .source {
    padding: 40px 45px 15px;
    display: flex;
    align-items: flex-end;
    position: relative;
    &:before {
      content: '';
      width: 100%;
      height: 1px;
      background: url('../images/d-line2.png') no-repeat;
      position: absolute;
      bottom: 0;
      left: 0;
      animation: scaleAnimation 5s infinite;
    }
    .name {
      margin-right: 20px;
      color: #fff;
      font-size: 16px;
    }
    .time {
      font-size: 14px;
      color: #55cad4;
    }
  }
  .info-body {
    margin-top: 15px;
    padding: 0 45px;
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    font-size: 14px;
    color: #ababab;
    line-height: 2.5;
  }
}
.file-list {
  margin-top: 15px;
  .label {
    font-size: 16px;
    color: #fff;
  }
}
</style>
