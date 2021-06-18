<!--
 * @Description: 质量验收详情
 * @Version:
 * @Autor:
 * @Date: 2020-03-02 10:14:15
 * @LastEditTime: 2020-03-02 16:02:34
 -->

<!--
* @任务编号:2620||质量-详情接口对接
* @开发人员:张龙
* @日期:2020-03-20
* @任务类型: 新代码
-->
<template>
  <div>
    <Block title="检验批验收详情" sub-title="cost">
      <span slot="btn" @click="goBack"><i class="el-icon-back"></i>返回</span>
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
      <vxe-grid :data="orderInfo.detailList" :columns="columns" />
    </Block>
  </div>
</template>

<script>
import api from '@/api/quality'
export default {
  props: { id: {} },
  data() {
    return {
      orderInfo: {},
      columns: [
        {
          type: 'seq',
          title: '序号'
        },
        {
          field: 'acceptanceItem',
          title: '验收项目'
        },
        {
          field: 'itemCategory',
          title: '项目种类',
          slots: {
            default: ({ row }) => {
              return [<span>{row.itemCategory === 1 ? '主控项目' : row.itemCategory === 2 ? '一般项目' : '-'}</span>]
            }
          }
        },
        {
          field: 'designRequirements',
          title: '设计要求及规范'
        },
        {
          field: 'sampleNum',
          title: '抽样量'
        },
        {
          field: 'examineRecord',
          title: '检查记录'
        }
      ]
    }
  },
  watch: {
    id() {
      this.refresh()
    }
  },
  created() {
    console.log(this.id)
    this.refresh()
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
    goBack() {
      this.$emit('goBack')
    }
  }
}
</script>

<style lang="less" scoped></style>
