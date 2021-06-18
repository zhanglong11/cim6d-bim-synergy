<template>
  <div v-if="type === 'previewImage'" class="img-list attachment-dialog">
    <el-image
      v-for="e in list"
      :key="e.id"
      :style="{ width: imgWidth }"
      :src="e.fileUrl + '?x-oss-process=style/w140_h140'"
      :preview-src-list="previewSrcList"
    />
  </div>
  <div v-else>
    <slot>
      <a v-if="ids" type="text" @click="visible = true">{{ ids.split(',').length }}个附件</a>
      <template v-else>
        <a v-if="manage" type="text" @click="visible = manage">{{ manage ? '上传' : '暂无附件' }}</a>
        <span>暂无附件</span>
      </template>
    </slot>
    <el-dialog title="查看附件" :visible.sync="visible">
      <div v-if="manage" class="tooltips">
        <div>
          <Upload :accept="accept" multiple isOnlyButton btnText="上传" @input="val => add(val)"></Upload>
        </div>
      </div>
      <vxe-table v-if="list.length" :data="list" max-height="400">
        <vxe-table-column title="文件名">
          <template v-slot="{ row }">
            <Preview :file="row">{{ row.fileName }}</Preview>
          </template>
        </vxe-table-column>
        <vxe-table-column
          width="120px"
          title="大小"
          field="fileSize"
          :formatter="({ cellValue }) => fileSize(cellValue)"
        ></vxe-table-column>
        <vxe-table-column width="140px" title="上传时间" field="createTime"></vxe-table-column>
        <vxe-table-column title="上传人" width="120px" field="creatorName"></vxe-table-column>
        <vxe-table-column title="操作" width="120px">
          <template v-slot="{ row, rowIndex }">
            <Download :file="row">
              <el-button icon="el-icon-download" type="primary"></el-button>
            </Download>
            <el-button
              v-if="manage"
              icon="el-icon-delete"
              type="danger"
              sizi="mini"
              @click="remove(rowIndex)"
            ></el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/file'
import fileSize from 'filesize'
export default {
  name: 'AttachmentDialog',
  props: {
    ids: {
      type: String,
      default: null
    },
    manage: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String
    },
    type: {
      type: String,
      default: ''
    },
    imgWidth: {
      type: String,
      default: '140px'
    }
  },
  data() {
    return {
      visible: false,
      list: []
      // previewSrcList: [] //预览图片列表
    }
  },
  computed: {
    previewSrcList() {
      return _.map(this.list, e => e.fileUrl + '?x-oss-process=style/w140_h140')
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.refresh()
      }
    },
    ids: {
      immediate: true,
      handler() {
        if (this.type === 'previewImage') {
          this.refresh()
        } else {
          this.visible && this.refresh()
        }
      }
    }
  },
  methods: {
    fileSize,
    refresh() {
      if (this.ids) {
        api.getFileList(this.ids.split(',')).then(res => (this.list = res.data))
      } else {
        this.list = []
      }
    },
    add(val) {
      if (this.ids) {
        val = _.union(this.ids.split(',').concat(val.split(','))).join(',')
      }
      this.$emit('update:ids', val)
    },
    remove(rowIndex) {
      let data = this.ids.split(',')
      data.splice(rowIndex, 1)
      this.$emit('update:ids', data.join(','))
    }
  }
}
</script>

<style scoped lang="less">
.img-list {
  margin: 0 -10px;
  .el-image {
    margin: 10px;
  }
}
</style>
<style>
.img-list.attachment-dialog .el-icon-circle-close {
  color: red;
}
</style>
