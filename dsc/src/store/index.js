//index是上边几个内容的入口
import vue from "vue"
import vuex from "vuex" //需要下载
// 使用vuex
vue.use(vuex)

// 导入
import state from "./state.js"
import mutations from "./mutations.js"
import actions from "./actions"

// 实例话store
const store = new vuex.Store({
    state,
    mutations,
    actions,
})
export default store