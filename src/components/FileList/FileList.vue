<!--
 * @Description: 文件列表带下载
 * @Version:
 * @Autor:
 * @Date: 2020-02-20 15:04:15
 * @LastEditTime: 2020-02-21 11:00:58
 -->
<template>
  <div>
    <ul v-if="ids">
      <li v-for="(item, index) in list" :key="index">
        <span class="file-name">{{ item.fileName }}</span>
        <PreviewByFileId :fileId="item.id" />
        <span class="down-load" @click="downLoad(item)">下载</span>
      </li>
    </ul>
    <ul v-else>
      <li>
        无附件
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/api/file'
import PreviewByFileId from '@/components/PreviewByFileId'
export default {
  props: {
    // 文件id集合
    ids: {}
  },
  components: {
    PreviewByFileId
  },
  data() {
    return {
      list: []
    }
  },
  watch: {
    ids: {
      handler: function(n) {
        if (n) {
          this.getFileList()
        }
      },
      immediate: true
    }
  },
  methods: {
    async getFileList() {
      let arr = this.ids ? this.ids.split(',') : []
      console.log(111, arr, api)
      let res = await api.getFileList(arr)
      this.list = res.data
    },
    downLoad(item) {
      //console.log(item)
      /*const a = document.createElement('a')
      a.href = item.fileUrl
      a.download = item.fileName
      a.click()*/
      api.downloadFileById(item.id).then(res => {
        //console.log(res)
        let blobUrl = window.URL.createObjectURL(res.data)
        const aElement = document.createElement('a')
        aElement.href = blobUrl
        aElement.download = item.fileName
        aElement.click()
        window.URL.revokeObjectURL(blobUrl)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.file-name,
.down-load {
  padding: 0 10px;
  cursor: pointer;
  color: #fff;
}
.file-name {
  padding-left: 0;
  cursor: default;
  color: #ccc;
}
</style>
