<!--
 * @Description: 分部详情
 * @Version:
 * @Autor:
 * @Date: 2020-03-02 16:00:02
 * @LastEditTime: 2020-03-02 16:06:05
 -->
<!--
* @任务编号:2620||质量-详情接口对接
* @开发人员:张龙
* @日期:2020-03-20
* @任务类型: 新代码
-->
<template>
  <div>
    <!--    <Block title="分部分项验收详情" sub-title="cost">-->
    <!--      <span slot="btn" @click="goBack"><i class="el-icon-back"></i>返回</span>-->
    <!--      <ul>-->
    <!--        <li class="li-flex">-->
    <!--          <div>-->
    <!--            <p class="title">工程编码</p>-->
    <!--            <p class="desc key-pont">洛轴工程</p>-->
    <!--          </div>-->
    <!--          <div class="p-l-10 b-l">-->
    <!--            <p class="title">工程名称</p>-->
    <!--            <p class="desc key-pont">2020-02-21</p>-->
    <!--          </div>-->
    <!--          <div class="p-l-10 b-l">-->
    <!--            <p class="title">点号</p>-->
    <!--            <p class="desc key-pont">YPL100096</p>-->
    <!--          </div>-->
    <!--        </li>-->
    <!--        <li class="li-flex">-->
    <!--          <div>-->
    <!--            <p class="title">控制点</p>-->
    <!--            <p class="desc ">建筑</p>-->
    <!--          </div>-->
    <!--          <div class="p-l-10 b-l">-->
    <!--            <p class="title"></p>-->
    <!--            <p class="desc ">2012</p>-->
    <!--          </div>-->
    <!--          <div class="p-l-10 b-l">-->
    <!--            <p class="title"></p>-->
    <!--            <p class="desc ">首层钢筋</p>-->
    <!--          </div>-->
    <!--        </li>-->
    <!--        <li>-->
    <!--          <p class="title">质量目标</p>-->
    <!--          <p class="desc ">洛轴改造项目，根据设计原则进行施工</p>-->
    <!--        </li>-->
    <!--        <li>-->
    <!--          <p class="title">要求</p>-->
    <!--          <p class="desc ">洛轴改造项目，根据设计原则进行施工</p>-->
    <!--        </li>-->
    <!--      </ul>-->
    <!--    </Block>-->
    <Block :title="orderInfo.acceptanceName" class="details" sub-title="cost">
      <span slot="btn" @click="goBack"><i class="el-icon-back"></i>返回</span>
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
            <p class="desc">{{orderInfo.targetList ? orderInfo.targetList.length : 0}}</p>
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
      <vxe-grid :data="orderInfo.targetList" :columns="getColumns()" />
    </Block>
  </div>
</template>

<script>
import api from '@/api/quality'
export default {
  props: {
    id: {},
    type: {}
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
      orderInfo: { targetList: [] },
      unitColumns: [
        {
          type: 'seq',
          title: '序号'
        },
        {
          field: 'engineeringName',
          title: '项目'
        },
        {
          field: 'acceptanceNum',
          title: '数量'
        },
        {
          field: 'passNum',
          title: '合格数量'
        },
        {
          field: 'acceptanceConclusion',
          title: '验收结论'
        },
        {
          field: 'remark',
          title: '备注'
        }
      ],
      itemColumns: [
        {
          type: 'seq',
          title: '序号'
        },
        {
          field: 'inspectionLotName',
          title: '检验批名称'
        },
        {
          field: 'inspectionLotCapacity',
          title: '检验批容量'
        },
        {
          field: 'inspectionLotPoint',
          title: '检验批部位'
        },
        {
          field: 'examineResult',
          title: '检查结果',
          slots: {
            default: ({ row }) => {
              return [<span>{row.examineResult === 1 ? '合格' : row.examineResult === 2 ? '不合格' : '-'}</span>]
            }
          }
        },
        {
          field: 'remark',
          title: '备注'
        }
      ],
      partColumns: [
        {
          type: 'seq',
          title: '序号'
        },
        {
          field: 'engineeringName',
          title: '分项名称'
        },
        {
          field: 'inspectionLotCapacity',
          title: '检验批容量'
        },
        {
          field: 'examineResult',
          title: '检查结果',
          slots: {
            default: ({ row }) => {
              return [<span>{row.examineResult === 1 ? '合格' : row.examineResult === 2 ? '不合格' : '-'}</span>]
            }
          }
        },
        {
          field: 'remark',
          title: '备注'
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
    getColumns() {
      switch (true) {
        case this.type === 1:
          return this.unitColumns
        case this.type === 4:
          return this.itemColumns
        case this.type === 2 || this.type === 3:
          return this.partColumns
        default:
          return []
      }
    },
    goBack() {
      this.$emit('goBack')
    }
  }
}
</script>

<style lang="less" scoped></style>
