<!--  -->
<template>
  <div class="CategoryHeader">
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
            <input type="search" @click="gotoSearch" v-model="keywords" placeholder="搜索商品" />
            <i class="iconfont icon-sousuo1"></i>
          </div>
          <a
            href="JavaScript:;"
            :class="this.$store.state.toggleStyle?'iconfont icon-leimupinleifenleileibie2':'iconfont icon-leimupinleifenleileibie'"
            v-if="showhide"
            @click="toggle"
          ></a>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: ["showhide","keywords"],
  data() {
    //这里存放数据
    return {
      // showhide:null,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    gotoSearch() {
      this.$router.push("/search");
    },
    toggle() {
      console.log(this.$store.state.toggleStyle);
      this.$store.commit("changeToggleStyle", !this.$store.state.toggleStyle);
    },
  },
};
</script>
<style lang="less">
.CategoryHeader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 5rem;
  z-index: 1;
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
}
</style>