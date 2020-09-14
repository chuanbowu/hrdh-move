/* 工具接口为了方便构建全局state自定义方法 */
const getters = {
  keywords: state => state.route.keywords,
  detail: state => state.route.detail,
  typeList: state => state.route.typeList
}
export default getters
