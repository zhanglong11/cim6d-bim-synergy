<template>
  <span>
    <a v-if="type !== 'other'" :class="{ disabled: type === 'other' || !fileId }" @click="visible = true">
      <slot>预览</slot>
    </a>
    <el-tooltip v-else class="item" effect="dark" content="暂不支持预览" placement="right">
      <a :class="{ disabled: type === 'other' || !fileId || !fileName }">
        <slot>预览</slot>
      </a>
    </el-tooltip>
    <el-dialog
      v-if="fileId"
      title="预览"
      append-to-body
      width="1000px"
      destroy-on-close
      :visible="visible"
      @close="visible = false"
    >
      <img v-if="type === 'img'" class="preview-image" :src="fileUrl" alt="" />
      <video v-if="type === 'video'" autoplay class="preview-video" width="100%" controls :src="fileUrl" alt="" />
      <iframe v-if="type === 'office' || type === 'pdfTxt'" ref="iframe" width="100%" style="height: 60vh;" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">确定</el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script>
const imgReg = /(.*)\.(jpg|png|jepg|gif|webp|jpeg)$/
const videoReg = /(.*)\.(mp4|mkv|ogg|webm)$/
const officeReg = /(.*)\.(doc|xls|xlsx|docx|ppt|pptx)$/
const pdfTxtReg = /(.*)\.(pdf|txt)$/
import Api from '@/api/file'
import { filePreviewUrl } from '@/utils/axios'
export default {
  name: 'PreviewByFileId',
  props: {
    fileId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      visible: false,
      fileUrl: '',
      fileName: ''
    }
  },
  computed: {
    type() {
      if (!this.fileName) return 'other'
      if (imgReg.test(this.fileName.toLowerCase())) {
        return 'img'
      } else if (videoReg.test(this.fileName.toLowerCase())) {
        return 'video'
      } else if (officeReg.test(this.fileName.toLowerCase())) {
        return 'office'
      } else if (pdfTxtReg.test(this.fileName.toLowerCase())) {
        return 'pdfTxt'
      } else {
        return 'other'
      }
    }
  },
  watch: {
    visible(val) {
      if (val && this.type === 'pdfTxt') {
        Api.downloadFileById(this.fileId).then(res => {
          let blobUrl = window.URL.createObjectURL(res.data)
          this.$refs.iframe.src = blobUrl
          this.$refs.iframe.onload = () => {
            window.URL.revokeObjectURL(blobUrl)
          }
        })
      } else if (val && this.type === 'office') {
        setTimeout(() => {
          this.$refs.iframe.src = `${filePreviewUrl}/noToken/file/commonFile/onlinePreview/${this.fileId}`
        }, 100)
      }
    }
  },
  created() {
    Api.getFileList([this.fileId]).then(res => {
      this.fileUrl = res.data[0].fileUrl
      this.fileName = res.data[0].fileName
    })
  }
}
</script>

<style scoped lang="less">
.preview-image {
  display: block;
  margin: 0 auto;
  max-width: 100%;
}
a {
  font-size: 14px;
}
.disabled {
  color: #333;
  cursor: not-allowed;
}
/deep/ .el-dialog__header {
  border-bottom: 1px #eeeeee solid;
}
</style>
