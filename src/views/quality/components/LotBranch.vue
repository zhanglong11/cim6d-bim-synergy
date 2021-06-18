<!--
 * @Description: 分部验收缩略图
 * @Version:
 * @Autor:
 * @Date: 2020-03-02 15:59:29
 * @LastEditTime: 2020-03-02 16:12:57
 -->

<!--
* @任务编号:2620||质量-详情接口对接报错，后端正在解决
* @开发人员:张龙
* @日期:2020-03-17
* @任务类型: 修改代码
-->
<!--
* @任务编号:2620||质量-详情接口对接
* @开发人员:张龙
* @日期:2020-03-20
* @任务类型: 新代码
-->
<template>
  <div>
    <Block :title="orderInfo.acceptanceName" class="details" sub-title="cost">
      <span slot="btn" class="goDetails" @click="watchDetails">查看详情 <i class="el-icon-caret-right"/></span>
      <!-- 圆环示意图 -->
      <MyEchart :total="total" :unqualified="unqualified" />
      <!--      单位工程-->
      <ul v-if="type === 1">
        <li class="li-flex">
          <div>
            <p class="title">验收类型</p>
            <p class="desc key-pont" :title="_.get(_.find(typeList, { value: type }), 'label')">
              {{ _.get(_.find(typeList, { value: type }), 'label') }}
            </p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">验收日期</p>
            <p class="desc key-pont">{{ orderInfo.acceptanceDate }}</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">验收编号</p>
            <p class="desc key-pont">{{ orderInfo.acceptanceApplyNumber }}</p>
          </div>
        </li>
        <li class="li-flex">
          <div class="p-l-10 b-l">
            <p class="title">验收人</p>
            <p class="desc">{{ orderInfo.acceptanceManName }}</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">单位名称</p>
            <p class="desc">{{ orderInfo.engineeringName }}</p>
          </div>
          <div>
            <p class="title">单位编号</p>
            <p class="desc">{{ orderInfo.engineeringNumber }}</p>
          </div>
        </li>
        <li class="li-flex">
          <div class="p-l-10 b-l">
            <p class="title">开工日期</p>
            <p class="desc">{{ orderInfo.startWorkDate }}</p>
          </div>
          <div>
            <p class="title">完工日期</p>
            <p class="desc">{{ orderInfo.finishWorkDate }}</p>
          </div>
        </li>
        <li>
          <p class="title">备注</p>
          <p class="desc ">{{ orderInfo.remark }}</p>
        </li>
        <li>
          <p class="title">附件</p>
          <p class="desc "><FileList :ids="orderInfo.fileIds" /></p>
        </li>
      </ul>

      <!--      分项工程-->
      <ul v-if="type === 4">
        <li class="li-flex">
          <div>
            <p class="title">验收类型</p>
            <p class="desc key-pont" :title="_.get(_.find(typeList, { value: type }), 'label')">
              {{ _.get(_.find(typeList, { value: type }), 'label') }}
            </p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">验收日期</p>
            <p class="desc key-pont">{{ orderInfo.acceptanceDate }}</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">验收编号</p>
            <p class="desc key-pont">{{ orderInfo.acceptanceApplyNumber }}</p>
          </div>
        </li>
        <li class="li-flex">
          <div>
            <p class="title">分项编号</p>
            <p class="desc">{{ orderInfo.engineeringNumber }}</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">分项名称</p>
            <p class="desc">{{ orderInfo.engineeringName }}</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">验收人</p>
            <p class="desc">{{ orderInfo.acceptanceManName }}</p>
          </div>
        </li>
        <li class="li-flex">
          <div class="p-l-10 b-l">
            <p class="title">检验批数量</p>
            <p class="desc">{{ orderInfo.targetList ? orderInfo.targetList.length : 0 }}</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">说明</p>
            <p class="desc">{{ orderInfo.itemExplain }}</p>
          </div>
        </li>
        <li>
          <p class="title">备注</p>
          <p class="desc ">{{ orderInfo.remark }}</p>
        </li>
        <li>
          <p class="title">附件</p>
          <p class="desc "><FileList :ids="orderInfo.fileIds" /></p>
        </li>
      </ul>

      <!--      分部工程-->
      <ul v-if="type === 2 || type === 3">
        <li class="li-flex">
          <div>
            <p class="title">验收类型</p>
            <p class="desc key-pont" :title="_.get(_.find(typeList, { value: type }), 'label')">
              {{ _.get(_.find(typeList, { value: type }), 'label') }}
            </p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">验收日期</p>
            <p class="desc key-pont">{{ orderInfo.acceptanceDate }}</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">验收编号</p>
            <p class="desc key-pont">{{ orderInfo.acceptanceApplyNumber }}</p>
          </div>
        </li>
        <li class="li-flex">
          <div>
            <p class="title">分部编号</p>
            <p class="desc">{{ orderInfo.engineeringNumber }}</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">分部名称</p>
            <p class="desc">{{ orderInfo.engineeringName }}</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">分项数量</p>
            <p class="desc">{{ orderInfo.targetList ? orderInfo.targetList.length : 0 }}</p>
          </div>
        </li>
        <li class="li-flex">
          <div class="p-l-10 b-l">
            <p class="title">验收人</p>
            <p class="desc">{{ orderInfo.acceptanceManName }}</p>
          </div>
        </li>
        <li>
          <p class="title">备注</p>
          <p class="desc ">{{ orderInfo.remark }}</p>
        </li>
        <li>
          <p class="title">附件</p>
          <p class="desc "><FileList :ids="orderInfo.fileIds" /></p>
        </li>
      </ul>

      <!--      隐蔽工程-->
      <ul v-if="type === 6">
        <li class="li-flex">
          <div>
            <p class="title">验收类型</p>
            <p class="desc key-pont">{{ orderInfo.name }}</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">验收人</p>
            <p class="desc key-pont">{{ orderInfo.name }}</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">验收日期</p>
            <p class="desc key-pont">{{ orderInfo.name }}</p>
          </div>
        </li>
        <li class="li-flex">
          <div>
            <p class="title">隐蔽项目</p>
            <p class="desc key-pont">{{ orderInfo.name }}</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">隐蔽部位</p>
            <p class="desc key-pont">{{ orderInfo.name }}</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">隐蔽内容</p>
            <p class="desc key-pont">{{ orderInfo.name }}</p>
          </div>
        </li>
      </ul>
    </Block>
  </div>
</template>

<script>
import MyEchart from './Echarts'
import api from '@/api/quality'
export default {
  components: { MyEchart },
  name: 'LotBranch',
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
      typeList: [
        { label: '单位工程', value: 1 },
        { label: '分部工程', value: 2 },
        { label: '子分部工程', value: 3 },
        { label: '分项工程', value: 4 },
        { label: '检验批', value: 5 }
      ],
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

<style lang="scss" scoped></style>
