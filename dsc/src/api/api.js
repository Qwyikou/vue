import ajax from "./ajax";

const Base_URL = "/api";
const Base_URL2 = "http://192.168.1.31:3000/adminapi";
// const Base_URL2 = "/adminapi";

// 首页列表
export const getHomeList = (url = "", params) => {
    return ajax(Base_URL + url, params)
}

// "/goods/type_list"



// 分类左侧数据
export const getCategoryLeft = () => {
    return ajax(Base_URL + "/catalog/list")
}
// 分类右侧数据
export const getCategoryRight = (cat_id) => {
    return ajax(Base_URL + "/catalog/list/" + cat_id)
}
// 分类列表
export const getCategoryList = (url, params, type) => {
    return ajax(Base_URL + url, params, type)
}
// 详情页
export const getDetail = (url, params, type) => {
    return ajax(Base_URL + url, params, type)
}
//获取手机验证码
export const getPhoneCode = (url, params, type) => {
    return ajax(Base_URL2 + url, params, type)
}
//短信登录
export const getPhoneLogin = (url, params, type) => {
    return ajax(Base_URL2 + url, params, type)
}
//账号登录
export const getLogin = (url, params, type) => {
    return ajax(Base_URL2 + url, params, type)
}


