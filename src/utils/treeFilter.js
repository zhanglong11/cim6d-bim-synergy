/*
@任务名称: 2623/BIM协同-进度视图前端绑定
@开发人员: 董渊海
@创建日期: 2020-03-17
@任务类型: 复制代码
*/
import toTree from '@/utils/toTree'
import toFlat from '@/utils/toFlat'
import _ from 'lodash'

export default function(flatList, fn) {
  const treeData = toTree(flatList)
  const flatData = toFlat(treeData)
  const dict = _.keyBy(flatData, 'id')
  const allowItemList = flatData.filter(e => fn(e))
  const result = _.chain(allowItemList)
    .map(e => e.ancestorIds)
    .flatten()
    .union()
    .map(id => dict[id])
    .concat(allowItemList)
    .compact()
    .unionBy('id')
    .value()
  return toTree(result)
}
