import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Home from '../views/Home/Home.vue';
import Cart from '../views/Cart/Cart.vue';
import Category from '../views/Category/Category.vue';
import Find from '../views/Find/Find.vue';
import Mine from '../views/Mine/Mine.vue';


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)

}

let routes = [{
    path: "/home",
    component: Home,
    children: [
        {
            path: "index",
            component: () => import('../views/Home/children/Index.vue')
        },
        {
            path: "household",
            component: () => import('../views/Home/children/Household.vue')
        },
        {
            path: "clothing",
            component: () => import('../views/Home/children/Clothing.vue')
        },
        {
            path: "shoebag",
            component: () => import('../views/Home/children/ShoeBag.vue')
        },
        {
            path: "mobilephones",
            component: () => import('../views/Home/children/MobilePhones.vue')
        },
        {
            path: "computer",
            component: () => import('../views/Home/children/Computer.vue')
        },
        {
            path: "hometextiles",
            component: () => import('../views/Home/children/HomeTextiles.vue')
        },
        {
            path: "personalmakeup",
            component: () => import('../views/Home/children/PersonalMakeup.vue')
        }, {
            path: "/home",
            redirect: "/home/index"
        }
    ]
}, {
    path: "/category",
    component: Category
}, {
    path: "/cart",
    component: Cart
}, {
    path: "/find",
    component: Find
}, {
    path: "/mine",
    component: Mine
}, {
    path: "/search",
    component: () => import('../views/Search/Search')
}, {
    path: "/vuexdemo",
    component: () => import('../views/VuexDemo/VuexDemo')
}, {
    path: "/categorylist/:cid",
    component: () => import('../views/Category/components/Categorylist')
}, {
    path: "/goodsdetail/:gid",
    component: () => import('../views/Detail/detail')
}, {
    path: "/searchlist",
    component: () => import('../views/Search/SearchList')
}, {
    path: "/login",
    component: () => import('../views/Login/Login')
}, {
    path: "/register",
    component: () => import('../views/Login/Register')
}, {
    path: "/",
    redirect: "/mine"
}]

let router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    console.log(from);
    if (to.path == "/mine" || to.path == "/login") {
        next();
        return
    }
    const token = JSON.parse(window.localStorage.getItem("userInfo")).token
    console.log(token);
    if (!token) {
        next("/login")
    }
    next()
})

export default router