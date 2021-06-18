/*
 * @Description:
 * @Version:
 * @Autor:
 * @Date: 2020-03-12 14:05:20
 * @LastEditTime: 2020-03-12 14:05:30
 */
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  companyId: state => state.user.companyId
}
export default getters
