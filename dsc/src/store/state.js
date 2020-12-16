//主要存数据

const state = {
    num: 1,
    categoryLeftDatas: [],
    categoryRightDatas: [],
    ad: "",
    cat_id: "",
    showLoading: false,
    categoryListDatas: [],
    toggleStyle: false,
    nomore: false,
    detailDatas: [],
    posterDatas: {},
    //购物车
    cartDatas: localStorage["carts"] ? JSON.parse(localStorage["carts"]) : [],
    // 全选
    selectAll: localStorage["selectAll"] ? JSON.parse(localStorage["selectAll"]) : false,
    searchkeywords: localStorage["keywords"] ? JSON.parse(localStorage["keywords"]) : [],
    userInfo: localStorage["userInfo"]? JSON.parse(localStorage["userInfo"]):{},
}


export default state