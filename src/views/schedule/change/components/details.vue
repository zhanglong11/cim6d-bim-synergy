<!--
 * @Description: 签证详情
 * @Version: 
 * @Autor: 
 * @Date: 2020-02-26 13:53:57
 * @LastEditTime: 2020-02-26 14:06:32

@任务名称: 2623/BIM协同-进度视图前端绑定
@开发人员: 董渊海
@修改日期: 2020-03-18
@任务类型: 修改代码，签证详情字段对接，模拟附件文件显示与下载(进度：40%)，修改比例(60%)

@任务名称: 2623/BIM协同-进度视图前端绑定
@开发人员: 董渊海
@修改日期: 2020-03-19
@任务类型: 修改代码，对接附件文件下载接口，模拟附件文件显示与下载(进度：100%)，修改比例(45%)

@任务名称: 2623/BIM协同-进度视图前端绑定
@开发人员: 董渊海
@修改日期: 2020-03-31
@任务类型: 修改代码，添加原合同工期、增减工期、现工期信息展示，修改比例(8%)
 -->
<template>
  <div>
    <Block title="签证详情" sub-title="cost">
      <span slot="btn" @click="goBack"><i class="el-icon-back"></i>返回</span>
      <ul v-if="visaInfo.id">
        <li class="li-flex">
          <div>
            <p class="title">签证名称</p>
            <p class="desc key-pont">{{visaInfo.accessName}}</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">签证编号</p>
            <p class="desc key-pont">{{visaInfo.accessNumber}}</p>
          </div>
        </li>
        <li class="li-flex">
          <div>
            <p class="title">变更部位</p>
            <p class="desc ">{{visaInfo.place}}</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">日期</p>
            <p class="desc ">{{visaInfo.accessDate}}</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">签证原因</p>
            <p class="desc ">{{visaInfo.accessReason}}</p>
          </div>
        </li>
        <li class="li-flex">
          <div>
            <p class="title">创建人</p>
            <p class="desc">{{visaInfo.creatorName}}</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">创建日期</p>
            <p class="desc ">{{visaInfo.createTime}}</p>
          </div>
        </li>
        <li>
          <p class="title">内容摘要</p>
          <p class="desc ">{{visaInfo.content}}</p>
        </li>
        <li>
          <p class="title">备注</p>
          <p class="desc ">{{visaInfo.remark}}</p>
        </li>
        <li>
          <p class="title">现场签证单文件</p>
          <!--<p class="desc ">{{visaInfo.stieAccessFileIds}}</p>-->
          <p class="desc " v-for="(item, index) in sFileList" :key="index"><span style="cursor: pointer" @click="() => {handleDownload(item)}">{{item.name}}</span></p>
        </li>
        <li>
          <p class="title">其他文件</p>
          <!--<p class="desc ">{{visaInfo.otherFileIds}}</p>-->
          <p class="desc " v-for="(item, index) in oFileList" :key="index"><span style="cursor: pointer" @click="() => {handleDownload(item)}">{{item.name}}</span></p>
        </li>
        <li>
          <div style="display: flex;">
            <div style="flex: 1;">
              <div style="font-size: 18px; color: #356294;">原合同工期</div>
              <div style="color: #85add2;"><span style="color: #dcc51d; font-size: 16px;">{{visaInfo.beforeDuration}}</span>天</div>
            </div>
            <div style="flex: 1;">
              <div style="font-size: 18px; color: #356294;">增减工期</div>
              <div style="color: #85add2;"><span style="color: #dcc51d; font-size: 16px;">{{visaInfo.changeDuration}}</span>天</div>
            </div>
            <div style="flex: 1;">
              <div style="font-size: 18px; color: #356294;">现工期</div>
              <div style="color: #85add2;"><span style="color: #dcc51d; font-size: 16px;">{{visaInfo.afterDuration}}</span>天</div>
            </div>
          </div>
        </li>
      </ul>
      <div v-else style="color: #606266; text-align: center; line-height: 100px; font-size: 13px;">暂无数据</div>
    </Block>
  </div>
</template>

<script>
import FileApi from '@/api/file'
export default {
  props: {
    visa: Object
  },
  data() {
    return {
      visaInfo: {},
      sFileList: [],
      oFileList: []
    }
  },
  created() {
    setTimeout(() => {
      //console.log(this.visa)
      this.visaInfo = this.visa
      if (this.visaInfo.stieAccessFileIds) {
        FileApi.getFileList(this.visaInfo.stieAccessFileIds.split(',')).then(res => {
          //console.log(res)
          if (res.data && res.data.length) {
            let sFileList = []
            for (let i = 0; i < res.data.length; i++) {
              sFileList.push({
                id: res.data[i].id,
                name: res.data[i].fileName,
                url: res.data[i].fileUrl
              })
            }
            this.sFileList = sFileList
          }
        })
      }
      if (this.visaInfo.otherFileIds) {
        FileApi.getFileList(this.visaInfo.otherFileIds.split(',')).then(res => {
          //console.log(res)
          if (res.data && res.data.length) {
            let oFileList = []
            for (let i = 0; i < res.data.length; i++) {
              oFileList.push({
                id: res.data[i].id,
                name: res.data[i].fileName,
                url: res.data[i].fileUrl
              })
            }
            this.oFileList = oFileList
          }
        })
      }

      //当现场签证单文件和其他文件都不存在时，临时模拟显示与下载
      if (!this.visaInfo.stieAccessFileIds && !this.visaInfo.otherFileIds ) {
        FileApi.getFileList(["4c5a02a50263437cbb2f801b01222788"]).then(res => {
          //console.log(res)
          if (res.data && res.data.length) {
            let sFileList = []
            for (let i = 0; i < res.data.length; i++) {
              sFileList.push({
                id: res.data[i].id,
                name: res.data[i].fileName,
                url: res.data[i].fileUrl
              })
            }
            this.sFileList = sFileList
          }
        })
      }
    }, 100)
  },
  methods: {
    goBack() {
      this.$emit('goBack')
    },
    handleDownload(item) {
      /*const a = document.createElement('a')
      a.href = item.url
      a.download = item.name
      a.click()*/
      FileApi.downloadFileById(item.id).then(res => {
        //console.log(res)
        let blobUrl = window.URL.createObjectURL(res.data)
        const aElement = document.createElement('a')
        aElement.href = blobUrl
        aElement.download = item.name
        aElement.click()
        window.URL.revokeObjectURL(blobUrl)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.add {
  padding-left: 9px;
  color: red;
}
.reduce {
  padding-left: 9px;
  color: green;
}
ul {
  font-size: 13px;
  background-color: #030e25;
  li {
    padding: 14px 16px;
    border-bottom: 1px dashed #3f4654;

    .title {
      color: #356294;
      padding-bottom: 10px;
    }
    .desc {
      color: #85add2;
      &.key-pont {
        color: #dcc51d;
      }
    }
  }
  .li-flex {
    display: flex;
    justify-content: space-between;
    div {
      flex: 1;
    }
    .center {
      border-left: 1px solid #3f4654;
      border-right: 1px solid #3f4654;
      padding: 0 10px;
    }
    .b-l {
      border-left: 1px solid #3f4654;
    }
  }
}
</style>
