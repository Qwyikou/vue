<!--  -->
<template>
  <div class="index-page" v-infinite-scroll="loadMore">
    <Loading v-if="isShowLoading" />
    <div class="index-header" :style="colorObj"></div>
    <div class="index-swiper" v-if="showSwiper">
      <!-- changeColor 指的是swiper组件$emit广播出来的时间 -->
      <!-- getColor index组件中的方法 -->
      <Swiper @changeColor="getColor" />
    </div>
    <div style="width:100%; height:8.8rem; position:fixed; top:0; left:0;  background:red; z-index=999" v-if="!showSwiper"></div>
    <div>
      <QuickNav />
    </div>
    <div>
      <HomeNews />
    </div>
    <!-- <div>
      <HomeStudy />
    </div> -->
    <div>
      <ul class="tabs">
        <li
          v-for="(tabsData, index) in tabsDatas"
          :key="index"
          @click="changeTab(index, tabsData.url, tabsData.type)"
        >
          <h3>{{ tabsData.title }}</h3>
          <h6 :class="{ active: activeIndex == index }">{{ tabsData.tips }}</h6>
        </li>
      </ul>
      <List :listdatas="listdatas" />
    </div>
    <div style="height: 5rem"></div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Swiper from "@/components/Swiper";
import QuickNav from "../components/QuickNav";
import HomeNews from "../components/HomeNews";
// import HomeStudy from "../components/HomeStudy";
import List from "@/components/List";
// import ajax from "@/api/ajax";
// import Axios from "axios";
import { getHomeList } from "@/api/api";

import Loading from "@/components/Loading";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Swiper,
    QuickNav,
    HomeNews,
    List,
    Loading,
    // HomeStudy,
  },
  data() {
    //这里存放数据
    return {
      activeIndex: 0,
      showSwiper: true,
      tabsDatas: [
        {
          id: 1,
          title: "精选",
          tips: "为你推荐",
          type: "is_best",
          url: "/goods/type_list",
        },
        {
          id: 2,
          title: "社区",
          tips: "新奇好物",
          type: "",
          url: "/discover/find_list",
        },
        {
          id: 3,
          title: "新品",
          tips: "潮流上新",
          type: "is_new",
          url: "/goods/type_list",
        },
        {
          id: 4,
          title: "热卖",
          tips: "火热爆款",
          type: "is_hot",
          url: "/goods/type_list",
        },
      ],
      colorObj: {
        background: "#E43124",
      },
      colorArr: [
        {
          background: "#E43124",
        },
        {
          background: "#404eff",
        },
        {
          background: "rgb(2,131,121)",
        },
      ],
      listdatas: [],
      page: 1,
      size: 10,
      type: "is_best",
      isShowLoading: false,
      url: "/goods/type_list",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getColor(index) {
      //   console.log(index);index 子组件中广播出来的数据
      this.colorObj = this.colorArr[index];
    },
    async getBestDatas(url, page, size, type) {
      // Axios.get("/api/goods/type_list?page=1&size=10&type=is_best").then(
      //   (res) => {
      //     console.log(res.data.data);
      //     this.listdatas = res.data.data;
      //   }
      // );
      // ajax("/api/goods/type_list", {
      //   page: 1,
      //   size: 10,
      //   type: "is_best",
      // }).then((res) => {
      //   console.log(res.data);
      //   this.listdatas = res.data
      // });
      this.isShowLoading = true;
      let result = await getHomeList(url, {
        page: page,
        size: size,
        type: type,
      });
      if (result.data) {
        this.isShowLoading = false;
        // console.log(result.data);
        this.listdatas = this.listdatas.concat(result.data);
      } else if (result.data == "undefined") {
        alert("网络错误");
      }
    },
    changeTab(index, url, type) {
      this.page = 1;
      this.listdatas = [];
      this.activeIndex = index;
      this.url = url;
      this.type = type;
      // console.log(url);
      this.getBestDatas(url, this.page, this.size, type);
    },
    loadMore() {
      console.log("-----------12345");
      this.getBestDatas(this.url, this.page, this.size, this.type);
      this.page++;
    },
    scrollPage() {
      if (document.documentElement.scrollTop > 90) {
        this.showSwiper = false;
      }else{
        this.showSwiper = true
      }
    },
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getBestDatas(this.url, this.page, this.size, this.type);
    window.addEventListener("scroll", this.scrollPage, false);
  },
};
</script>
<style lang="less">
.index-page {
  .index-header {
    background-color: red;
    height: 14.8rem;
    border-bottom-right-radius: 2rem;
    border-bottom-left-radius: 2rem;
    transition: all 0.3s;
  }
  .index-swiper {
    position: relative;
    top: -5rem;
  }
  .tabs {
    width: 100%;
    height: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    li {
      flex: 1;
      text-align: center;
      border-right: 1px solid #efefef;
      &:last-child {
        border-right: 0px solid #efefef;
      }
      h3 {
        font-size: 1.4rem;
        color: #666;
        margin-bottom: 3px;
      }
      h6 {
        font-size: 1.2rem;
        color: #999;
        font-weight: normal;
        width: 80%;
        margin-left: 10%;
      }
      .active {
        border-radius: 1rem;
        background: red;
      }
    }
  }
}
</style>