/*
 * @Author: 耿为刚 创建
 * @Date: 2020-20
 * @Last Modified by: gengweigang
 * @Desc 全局过滤器
 */

// 时间截取年月日
export const formatData = str => {
  if (!str) {
    return ''
  }
  return str.substring(0, 10)
}

// 格式化金额
export const formatMoney = (number, n = 2) => {
  if (!number) {
    return 0
  }
  n = n > 0 && n <= 20 ? n : 2
  number = parseFloat((number + '').replace(/[^\d.-]/g, '')).toFixed(n) + ''
  var l = number
      .split('.')[0]
      .split('')
      .reverse(),
    r = number.split('.')[1]
  let t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? ',' : '')
  }
  return (
    t
      .split('')
      .reverse()
      .join('') +
    '.' +
    r
  )
}
