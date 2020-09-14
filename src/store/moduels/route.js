const routeArr = {
  state: {
    keywords: '',
    detail: {},
    typeList: []
  },
  mutations: {
    keywords: (state, data) => {
      state.keywords = data
    },
    detail: (state, data) => {
      state.detail = data
    },
    typeList: (state, data) => {
      state.typeList = data
    }
  }
}
export default routeArr
