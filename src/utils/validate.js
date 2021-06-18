/*
 * @Description:正则验证
 * @Version:
 * @Autor:
 * @Date: 2020-03-12 14:21:30
 * @LastEditTime: 2020-03-12 14:22:02
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
