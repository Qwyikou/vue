<!--  -->
<template>
  <div>
    <div class="home-news">
      <div class="title-img">
        <img :src="titleimg" alt="" />
      </div>
      <ul ref="news" :class="{ trans: flag }">
        <li v-for="(news, index) in newData" :key="index"><h3>{{ news.title }}</h3></li>
      </ul>
      <div class="arr">
        <i class="iconfont icon-jiantou2"></i>
      </div>
    </div>
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
      titleimg: require("@/assets/images/title.png"),
      newData: [
        {
          id: 1,
          title: "新闻001",
        },
        {
          id: 2,
          title: "新闻002",
        },
        {
          id: 3,
          title: "新闻003",
        },
      ],
      flag:false,
      timer:null,
      timer2:null
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    scrollNewsFn() {
      let oUl = this.$refs.news; //获取ul  dom元素
      oUl.style.top = "-5rem";
      this.flag = !this.flag;
      setTimeout(()=>{
          this.newData.push(this.newData[0]);
          this.newData.shift();
          oUl.style.top="0rem";
          this.flag = !this.flag
      },500)
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
      this.timer=setInterval(this.scrollNewsFn,2000);
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {
    clearInterval(this.timer)
  }, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less">
.home-news {
  width: 100%;
  margin: 0 10px;
  height: 5rem;
  top: -3rem;
  width: calc(100% - 20px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  overflow: hidden;
  position: relative;
  .title-img {
    width: 20%;
    height: 3rem;
    img {
      height: 3rem;
    }
  }
  .trans {
    transition: all 0.5s linear;
  }
  ul {
    position: absolute;
    left: 20%;
    height: 5rem;
    width: 70%;
    margin-left: 2rem;
    li {
      line-height: 5rem;
      height: 5rem;
      font-size: 1.4rem;
    }
  }
  .arr {
    width: 10%;
    text-align: right;
  }
}
</style>