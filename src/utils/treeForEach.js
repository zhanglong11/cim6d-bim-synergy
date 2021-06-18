/**
 *
 * @param {Array} treeList 树形列表
 * @param {Function} fn  处理函数
 * @param {String} [childrenKey='children'] 子级key
 * @returns {Array}
 */

//
// * @Description: 树数据转换
// * @Version:zhanglong11
// * @Autor:
// * @Date: 2020-03-13 11:16:14

export default function(treeList, fn, childrenKey = 'children') {
  c(treeList)
  function c(list, parent) {
    _.forEach(list, (item, index) => {
      if (_.isFunction(fn)) {
        fn(item, parent, index)
      }
      if (item[childrenKey]) c(item[childrenKey], item)
    })
  }
  return treeList
}
