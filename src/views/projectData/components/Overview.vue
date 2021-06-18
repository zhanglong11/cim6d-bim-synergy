<!--
 * @Description: 项目概况
 * @Version:
 * @Autor:
 * @Date: 2020-02-24 11:16:14
 * @LastEditTime: 2020-02-24 12:05:04
 -->

<!--
 * @Description: 项目概况数据绑定
 * @Version:zhanglong11
 * @Autor:
 * @Date: 2020-03-13 15:13:08
 -->

<!--
* @任务编号:项目类型转换
* @开发人员:张龙
* @日期:2020-03-19
* @任务类型: 修改代码
 -->

<template>
  <div>
    <ul>
      <li>
        <p class="title">项目名称</p>
        <p class="desc key-pont">{{ projectData.name }}</p>
      </li>
      <li>
        <p class="title">项目地址</p>
        <p class="desc">{{ `${renderAddress(projectData.address)}${projectData.detailAddress}` }}</p>
      </li>
      <li class="flex">
        <div>
          <p class="title">项目类型</p>
          <p class="desc key-pont">{{ getType(projectData.type) }}</p>
        </div>
        <div class="center">
          <p class="title">建筑面积</p>
          <p class="desc key-pont">{{ projectData.buildingArea }}</p>
        </div>
        <div class="p-l-10">
          <p class="title">建筑层数</p>
          <p class="desc key-pont">{{ projectData.buildingFloorNum }}</p>
        </div>
      </li>
      <li class="flex">
        <div>
          <p class="title">建筑高度</p>
          <p class="desc key-pont">{{ projectData.buildingHeight }}</p>
        </div>
        <div class="center">
          <p class="title">规模性质</p>
          <p class="desc key-pont">{{ projectData.scale }}</p>
        </div>

        <div class="p-l-10">
          <p class="title">抗震等级</p>
          <p class="desc key-pont">{{ projectData.seismicLevel }}</p>
        </div>
      </li>
      <li class="flex">
        <div>
          <p class="title">结构形式</p>
          <p class="desc key-pont">{{ projectData.structuralStyle }}</p>
        </div>
        <div class="p-l-10 b-l">
          <p class="title">工程造价</p>
          <p class="desc key-pont">{{ projectData.constructionCosts }}</p>
        </div>
      </li>
      <li class="flex">
        <div>
          <p class="title">项目经理</p>
          <p class="desc">{{ projectData.principalName }}</p>
        </div>
        <div class="p-l-10 b-l">
          <p class="title">联系方式</p>
          <p class="desc">{{ projectData.telephone }}</p>
        </div>
      </li>
      <li>
        <p class="title">项目建设起止年限</p>
        <p class="desc">{{ projectData.startTime }} - {{ projectData.endTime }}</p>
      </li>
      <li>
        <p class="title">建设单位</p>
        <p class="desc">{{ projectData.constructionUnit }}</p>
      </li>
      <li>
        <p class="title">施工单位</p>
        <p class="desc">{{ projectData.constructionOrganization }}</p>
      </li>
      <li>
        <p class="title">监理单位</p>
        <p class="desc">{{ projectData.supervisingUnit }}</p>
      </li>
      <li>
        <p class="title">勘察单位</p>
        <p class="desc">{{ projectData.mainContractor }}</p>
      </li>
      <li>
        <p class="title">设计单位</p>
        <p class="desc">{{ projectData.designOrganization }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/api/homeApi'
import mapList from '@/lib/addressList'
export default {
  name: 'Overview',
  data() {
    return {
      projectData: {},
      projectType: [
        { label: '智能传感', value: 'iot' },
        { label: '施工', value: 'construction' },
        { label: '运维', value: 'operation' },
        { label: '设计协同', value: 'design' },
        { label: '煤矿', value: 'mine' }
      ]
    }
  },
  created() {
    this.refresh()
  },
  methods: {
    async refresh() {
      let projectDataRes = await api.project()
      this.projectData = { ...projectDataRes.data.extInfo, ...projectDataRes.data.baseInfo }
    },
    getType(type) {
      let list = this.projectType.filter(t => t.value === type)
      return list.length ? list[0].label : '-'
    },
    //获取项目地址
    renderAddress(code) {
      let str = '-'
      if (code) {
        str = ''
        let addressArray = code.split('_')
        for (let i = 0; i < addressArray.length; i++) {
          str = str + ',' + this.getAddressNode(mapList, addressArray[i])
        }
        str = str.substr(1)
      }
      return str
    },
    getAddressNode(pca, value) {
      for (let i = 0; i < pca.length; i++) {
        if (pca[i].value === value) {
          return pca[i].label
        } else if (pca[i].children) {
          let result = this.getAddressNode(pca[i].children, value)
          if (result) {
            return result
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.p-l-10 {
  padding-left: 10px;
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
  .flex {
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
