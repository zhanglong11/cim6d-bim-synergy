<!--
 * @Description: 检验批缩略组件
 * @Version:
 * @Autor:
 * @Date: 2020-03-02 15:04:29
 * @LastEditTime: 2020-03-03 15:58:59
 -->
<!--
* @任务编号:2620||质量-详情接口对接
* @开发人员:张龙
* @日期:2020-03-20
* @任务类型: 新代码
-->
<template>
  <div>
    <Block title="检验批验收详情" class="details" sub-title="cost">
      <span slot="btn" class="goDetails" @click="watchDetails">查看详情 <i class="el-icon-caret-right"/></span>
      <!-- 圆环示意图 -->
      <MyEchart :total="total" :unqualified="unqualified" />
      <ul>
        <li class="li-flex">
          <div>
            <p class="title">所属分部工程</p>
            <p class="desc key-pont">{{ orderInfo.engineeringName }}</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">验收日期</p>
            <p class="desc key-pont">{{ orderInfo.acceptanceDate }}</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">检验批编号</p>
            <p class="desc key-pont">{{ orderInfo.inspectionLotNumber }}</p>
          </div>
        </li>
        <li class="li-flex">
          <div>
            <p class="title">检验批名称</p>
            <p class="desc ">{{ orderInfo.inspectionLotName }}</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">检验批容量</p>
            <p class="desc ">{{ orderInfo.inspectionLotCapacity }}</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">检验批部位</p>
            <p class="desc ">{{ orderInfo.inspectionLotPoint }}</p>
          </div>
        </li>
        <li class="li-flex">
          <div>
            <p class="title">创建人</p>
            <p class="desc">{{ orderInfo.creatorName }}</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">创建日期</p>
            <p class="desc ">{{ orderInfo.createTime }}</p>
          </div>
        </li>
        <li>
          <p class="title">备注</p>
          <p class="desc ">{{ orderInfo.inspectionLotNumber }}</p>
        </li>
        <li>
          <p class="title">附件</p>
          <p class="desc "><FileList :ids="orderInfo.fileIds" /></p>
        </li>
      </ul>
    </Block>
  </div>
</template>

<script>
import api from '@/api/quality'
import MyEchart from './Echarts'
export default {
  components: {
    MyEchart
  },
  props: {
    id: {},
    type: {},
    total: {},
    unqualified: {}
  },
  watch: {
    id() {
      this.refresh()
    }
  },
  created() {
    this.refresh()
    console.log(this.total)
  },
  data() {
    return {
      orderInfo: {
        targetList: []
      }
    }
  },
  methods: {
    async refresh() {
      if (this.id) {
        const res = await api.subSection(this.id)
        this.orderInfo = res.data
      } else {
        this.orderInfo = {
          targetList: []
        }
      }
    },
    watchDetails() {
      this.$emit('goDetails')
    }
  }
}
</script>

<style lang="less" scoped></style>
