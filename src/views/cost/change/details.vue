<!--
 * @Description: 
 * @Version: 
 * @Autor: 
 * @Date: 2020-02-25 17:26:15
 * @LastEditTime: 2020-03-02 17:50:05
 -->
<template>
  <div>
    <Block title="签证详情" sub-title="cost">
      <span slot="btn" @click="goBack"><i class="el-icon-back"></i>返回</span>
      <ul>
        <li class="li-flex">
          <div>
            <p class="title">签证名称</p>
            <p class="desc key-pont">{{ siteAccess.accessName }}</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">签证编号</p>
            <p class="desc key-pont">{{ siteAccess.accessNumber }}</p>
          </div>
        </li>
        <li class="li-flex">
          <div>
            <p class="title">变更部位</p>
            <p class="desc ">{{ siteAccess.place }}</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">日期</p>
            <p class="desc ">{{ siteAccess.accessDate }}</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">签证原因</p>
            <p class="desc ">{{ siteAccess.accessReason }}</p>
          </div>
        </li>
        <li class="li-flex">
          <div>
            <p class="title">创建人</p>
            <p class="desc">{{ siteAccess.creatorName }}</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">创建日期</p>
            <p class="desc ">{{ siteAccess.createTime }}</p>
          </div>
        </li>
        <li>
          <p class="title">内容摘要</p>
          <p class="desc ">{{ siteAccess.content }}</p>
        </li>
        <li>
          <p class="title">备注</p>
          <p class="desc ">{{ siteAccess.remark }}</p>
        </li>
        <li>
          <p class="title">现场签证单文件</p>
          <p class="desc " v-for="(item, index) in sFileList" :key="index">
            <span
              style="cursor: pointer"
              @click="
                () => {
                  handleDownload(item)
                }
              "
              >{{ item.name }}</span
            >
          </p>
        </li>
        <li>
          <p class="title">其他文件</p>
          <p class="desc " v-for="(item, index) in oFileList" :key="index">
            <span
              style="cursor: pointer"
              @click="
                () => {
                  handleDownload(item)
                }
              "
              >{{ item.name }}</span
            >
          </p>
        </li>
      </ul>
      <vxe-grid :data="tableData" :columns="columns"></vxe-grid>
    </Block>
  </div>
</template>

<script>
import Api from '@/api/cost/change'
import FileApi from '@/api/file'
export default {
  props: {
    siteAccessId: String
  },
  data() {
    return {
      sFileList: [],
      oFileList: [],
      siteAccess: {},
      tableData: [],
      columns: [
        {
          field: 'itemCode',
          title: '项目编号'
        },
        {
          field: 'itemName',
          title: '名称'
        },
        {
          title: '数量',
          slots: {
            default: ({ row }) => {
              return [
                <span>{row.afterQuantity}</span>,
                <span class={row.afterQuantity - row.beforeQuantity > 0 ? 'add' : 'reduce'}>
                  {row.afterQuantity - row.beforeQuantity > 0 ? '+' : '-'}
                  {row.afterQuantity - row.beforeQuantity}
                </span>
              ]
            }
          }
        },
        {
          title: '单价',
          slots: {
            default: ({ row }) => {
              return [
                <span>{row.afterUnitPrice}</span>,
                <span class={row.afterUnitPrice - row.beforeUnitPrice > 0 ? 'add' : 'reduce'}>
                  {row.afterUnitPrice - row.beforeUnitPrice > 0 ? '+' : '-'}
                  {row.afterUnitPrice - row.beforeUnitPrice}
                </span>
              ]
            }
          }
        },
        {
          title: '合价',
          slots: {
            default: ({ row }) => {
              return [
                <span>{row.afterMoney}</span>,
                <span class={row.afterMoney - row.beforeMoney > 0 ? 'add' : 'reduce'}>
                  {row.afterMoney - row.beforeMoney > 0 ? '+' : '-'}
                  {row.afterMoney - row.beforeMoney}
                </span>
              ]
            }
          }
        }
      ]
    }
  },
  created() {
    this.getContractSiteAccess(this.siteAccessId || '91434a55de7540bfa1460b50644f9082')
    this.getContractSiteAccessDetailList(this.siteAccessId || '91434a55de7540bfa1460b50644f9082')
  },
  methods: {
    async getContractSiteAccess(id) {
      let res = await Api.getContractSiteAccess(id)
      this.siteAccess = res.data
      if (this.siteAccess.stieAccessFileIds) {
        FileApi.getFileList(this.siteAccess.stieAccessFileIds.split(',')).then(res => {
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
      if (this.siteAccess.otherFileIds) {
        FileApi.getFileList(this.siteAccess.otherFileIds.split(',')).then(res => {
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
    },
    async getContractSiteAccessDetailList(id) {
      let res = await Api.getContractSiteAccessDetailList({
        siteAccessId: id
      })
      this.tableData = res.data.records
    },
    goBack() {
      this.$emit('goBack')
    },
    handleDownload(item) {
      FileApi.downloadFileById(item.id).then(res => {
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
