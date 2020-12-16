// import state from "./state";
import { MessageBox } from "mint-ui"

import state from "./state";

//定义修改state状态数据方法
const mutations = {
    changeNum(state) {
        console.log(state);
        state.num++
    },
    changeCategoryLeft(state, data) {
        state.categoryLeftDatas = data
    },
    changeCategoryRight(state, data) {
        state.categoryRightDatas = data
    },
    changeAd(state, data) {
        state.ad = data
    },
    changeShowLoading(state, data) {
        state.showLoading = data
    },
    changeId(state, data) {
        state.cat_id = data
    },
    changCategoryList(state, data) {
        if (data.length > 0) {
            state.nomore = false
            state.categoryListDatas = state.categoryListDatas.concat(data)
        } else {
            state.nomore = true
        }
    },
    changeToggleStyle(state, data) {
        state.toggleStyle = data
    },
    changDetail(state, data) {
        state.detailDatas = data
    },
    changePosterData(state, data) {
        state.posterDatas = data
    },
    setCartDatas(state, data) {
        if (data) {
            state.cartDatas.push(data)
        }
        localStorage.setItem("carts", JSON.stringify(state.cartDatas))
    },
    changeSelect(state, data) {
        let selectStatus = state.cartDatas.every(item => {
            return item.isSelect == true
        })
        state.selectAll = selectStatus
        state.cartDatas[data.index] = data.cartData
        localStorage.setItem("carts", JSON.stringify(state.cartDatas))
        localStorage.setItem("selectAll", state.selectAll)
    },
    // 全选
    changeSelectAll(state) {
        state.selectAll = !state.selectAll
        state.cartDatas.forEach((item) => {
            item.isSelect = state.selectAll
        })
        localStorage.setItem("carts", JSON.stringify(state.cartDatas))
        localStorage.setItem("selectAll", state.selectAll)
    },
    // 购物车数量
    addCart(state, index) {
        state.cartDatas[index].value++;
        localStorage.setItem("carts", JSON.stringify(state.cartDatas))
    },
    jianCart(index) {
        if (state.cartDatas[index].value == 1) {
            state.cartDatas[index].value = 1
        } else {
            state.cartDatas[index].value--;
            localStorage.setItem("carts", JSON.stringify(state.cartDatas))
        }
    },
    deleCart(state, index) {
        MessageBox.confirm('确定执行此操作?').then(() => {
            state.cartDatas.splice(index, 1)
            localStorage.setItem("carts", JSON.stringify(state.cartDatas))
        }, () => {
            console.log("点击了取消按钮");
        });
    },
    //搜索关键字
    searchKeywords(state, data) {
        if (data) {
            state.searchkeywords.unshift(data)
            localStorage.setItem("keywords", JSON.stringify(state.searchkeywords))
        }
    },
    deleKeywords(state) {
        state.searchkeywords = []
        localStorage.setItem("keywords", JSON.stringify(state.searchkeywords))
    },
    setUserInfo(state, data) {
        state.userInfo = data
        localStorage.setItem("userInfo", JSON.stringify(state.userInfo))
    }

}

export default mutations