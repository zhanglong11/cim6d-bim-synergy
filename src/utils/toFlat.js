/**
 *
 * @param {Array} treeList
 * @param {String} [parentKey]
 * @param {String} [key]
 * @returns {Array}
 */

/*
@任务名称: 2623/BIM协同-进度视图前端绑定
@开发人员: 董渊海
@创建日期: 2020-03-17
@任务类型: 复制修改代码，22行添加默认值0
*/
export default function(treeList, parentKey = 'pid', key = 'id') {
  treeList = _.cloneDeep(treeList)
  const result = []
  c(treeList)
  function c(list, parent) {
    _.forEach(list, (item, index) => {
      item[parentKey] = null
      result.push(_.assign(item, { [parentKey]: _.get(parent, key, 0) }))
      if (item.children) c(item.children, item)
    })
  }
  result.forEach(e => _.unset(e, 'children'))
  return result
}
