const state = {
  location: localStorage.getItem('location')
}
const mutations = {
  setLocation(state, obj) {
    localStorage.setItem('location', obj.location)
    state.location = obj.location
  }
}
export default {
  state,
  mutations
}
