<!--  -->
<template>
  <div class="search-header">
    <section class="secrch">
      <form action="">
        <div class="search-wrap">
          <div class="back">
            <a
              href="javascript:;"
              class="iconfont icon-jiantou3"
              onclick="window.history.back()"
            ></a>
          </div>
          <div class="input-text">
            <input type="search" v-model="keywords" placeholder="搜索商品" />
            <i class="iconfont icon-sousuo1" @click="searchKeywords"></i>
          </div>
        </div>
      </form>
    </section>
    <div class="search-content">
      <div class="search-wrap">
        <div class="search-wrap-title">
          <div class="title">最近搜索</div>
          <div class="iconfont icon-shanchu1" @click="deleKeywords"></div>
        </div>
        <ul>
          <li v-if="keywordsDatas == 0">暂无</li>
          <li v-for="(keywordsData, index) in keywordsDatas" :key="index">
            <router-link :to="'/searchlist?keywords=' + keywordsData">{{
              keywordsData
            }}</router-link>
          </li>
        </ul>
      </div>
      <div class="search-wrap">
        <div class="search-wrap-title">
          <div class="title">热门搜索</div>
          <div class="iconfont icon-shanchu1"></div>
        </div>
        <ul>
          <li>手机</li>
          <li>手机</li>
          <li>手机</li>
          <li>手机</li>
        </ul>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Footer from "@/components/Footer.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Footer,
  },
  data() {
    //这里存放数据
    return {
      keywords: "",
    };
  },
  //监听属性 类似于data概念
  computed: {
    keywordsDatas() {
      return this.$store.state.searchkeywords;
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    searchKeywords() {
      if (this.keywords) {
        this.$store.commit("searchKeywords", this.keywords);
        this.$router.push("/searchlist?keywords=" + this.keywords);
      }
    },
    deleKeywords() {
      localStorage.removeItem("keywords");
      this.$store.commit("deleKeywords");
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less">
.search-header {
  section {
    width: 100%;
    text-align: center;
    background-color: #fff;
    border-bottom: 1px solid #f1f1f1;
    padding: 0.8rem 0;
    .search-wrap {
      width: 95%;
      padding: 0 1rem;
      position: relative;
      height: 3rem;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      a {
        font-size: 2rem;
      }
      .back {
        position: relative;
        height: 3rem;
        line-height: 3rem;
        text-align: left;
      }
      .input-text {
        border: 1px solid #333;
        border-radius: 1.5rem;
        margin: 0 1rem;
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        padding-right: 1rem;
        input {
          margin-left: 1rem;
          height: 3rem;
          line-height: 3rem;
          padding: 0 0 0 1.2rem;
          border: 0;
          width: 98%;
          color: #666;
          font-size: 1.5rem;
          color: #333;
        }
        i {
          margin-left: 0.5rem;
        }
      }
    }
  }
  .search-content {
    width: 100%;
    .search-wrap-title {
      display: flex;
      height: 4.4rem;
      justify-content: space-between;
      align-items: center;
      margin: 2rem 1rem;
      font-size: 1.4rem;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 20%;
        height: 3rem;
        text-align: center;
        line-height: 3rem;
        margin: 1% 2.5%;
        border: 1px solid #efefef;
        box-sizing: border-box;
      }
    }
  }
}
</style>