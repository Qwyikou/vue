<!--  -->
<template>
  <div class="footer-wrap">
    <ul>
      <router-link to="/home" tag="li">
        <div class="nav-img">
          <i class="iconfont icon-1" v-if="!active.includes('/home')"></i>
          <i class="iconfont icon-shouyex" v-else></i>
        </div>
        <span>首页</span>
      </router-link>
      <router-link to="/category" tag="li">
        <div class="nav-img">
          <i class="iconfont icon-leimupinleifenleileibie" v-if="active!='/category'"></i>
          <i class="iconfont icon-leimupinleifenleileibie2" v-else></i>
        </div>
        <span>分类</span>
      </router-link>
      <router-link to="/find" tag="li">
        <div class="nav-img">
          <i class="iconfont icon-dongtaiweixuanzhong" v-if="active!='/find'"></i>
          <i class="iconfont icon-dongtaixuanzhong" v-else></i>
        </div>
        <span>发现</span>
      </router-link>
      <router-link to="/cart" tag="li">
        <div class="nav-img">
          <i class="iconfont icon-gouwuche" v-if="active!='/cart'"></i>
          <i class="iconfont icon-gouwucheman" v-else></i>
        </div>
        <span>购物车</span>
      </router-link>
      <router-link to="/mine" tag="li">
        <div class="nav-img">
          <i class="iconfont icon-profile" v-if="active!='/mine'"></i>
          <i class="iconfont icon-wodedangxuan" v-else></i>
        </div>
        <span>我的</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      active: "/home",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  beforeCreate() {}, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    //   console.log(this.$route.path);
      this.active = this.$route.path
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less">
.footer-wrap {
  height: 4.9rem;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  border-top: 1px solid #efefef;
  background: #efefef;
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4.9rem;
    li {
      width: 20%;
      text-align: center;
      i {
        font-size: 2.2rem;
      }
    }
  }
}
.router-link-active{
    color: red;
}
</style>