<!--  -->
<template>
  <div class="share-poster" v-if="showshareposter" @click="closeSharePoster">
    <div class="poster-content">
      <div class="poster-text">长按保存到相册</div>
      <div class="close-poster" @click="closeSharePoster">
        <img src="@/assets/images/poster-close.png" alt="" />
      </div>
      <div class="poster-img">
        <img :src="posterImage" alt="" />
      </div>
    </div>
    <!-- 合并海报 -->
    <div class="carate-poster">
      <div class="hideCanvas">
        <canvas ref="mycanvas"></canvas>
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
  props: {
    showshareposter: Boolean,
    posterDatas: Object,
  },
  data() {
    //这里存放数据
    return {
      posterImage: "",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    showshareposter() {
      if (this.showshareposter == true) {
        this.$nextTick(() => {
          this.savePoster();
        });
      }
    },
  },
  //方法集合
  methods: {
    closeSharePoster() {
      this.$emit("closeSharePoster");
    },
    savePoster() {
      var canvas = this.$refs.mycanvas;
      console.log(canvas);
      var ctx = canvas.getContext("2d");
      console.log(window.screen);
      console.log(ctx);
      let W = window.screen.availWidth;
      let H = window.screen.availHeight;
      let devicePixelRatio = window.devicePixelRatio || 1;

      let backingPixelRatio = ctx.webkitBackingStorePixelRatio || 1;
      let ratio = devicePixelRatio / backingPixelRatio; //比例

      canvas.width = W * ratio;
      canvas.height = H * ratio;
      canvas.style.width = W * ratio + "px";
      canvas.style.height = W * ratio + "px";
      ctx.scale(ratio, ratio);
      var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      console.log(imgData.data);
      // 翻转颜色
      for (var i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i] = 255;
        imgData.data[i + 1] = 255;
        imgData.data[i + 2] = 255;
        imgData.data[i + 3] = 255;
      }
      ctx.putImageData(imgData, 0, 0);

      // 生成图片
      var img = new Image(); //定义一个图片对象
      console.log(img);
      img.src = this.posterDatas.image;
      img.onload = function () {
        ctx.drawImage(img, 0, 0, W / 2, W / 2);
      };

      // 生成文本
      ctx.font = "20px Arial"; //字体大小
      ctx.fillStyle = "#333333";
      ctx.textAlign = "center";
      ctx.fillText(this.posterDatas.title, W / 2, W + 30);

      // 生成价格
      ctx.font = "20px Arial"; //字体大小
      ctx.fillStyle = "#333333";
      ctx.textAlign = "center";
      ctx.fillText("￥" + this.posterDatas.price, W / 2, W + 100);

      // 生成二维码图片
      var img2 = new Image();
      img2.src = this.posterDatas.code;
      img2.onload = function () {
        ctx.drawImage(img2, 100, W + 160, W / 3, W / 3);
      };

      //生成logo图片
      var logo = new Image();
      logo.src = this.posterDatas.logo;
      logo.onload = function () {
        ctx.drawImage(logo, 0, 0, 100, 50);
      };

      // 定时器模拟异步
      setTimeout(() => {
        this.posterImage = canvas.toDataURL();
      }, 500);
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
.share-poster {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  .carate-poster {
    position: fixed;
    top: 0;
    left: 0;
    .hideCanvas {
      display: none;
    }
  }
  .poster-content {
    width: 70%;
    height: 70%;
    background: #fff;
    margin-left: 15%;
    margin-top: 20%;
    position: relative;
    .poster-text {
      width: 100%;
      height: 4.4rem;
      line-height: 4.4rem;
      text-align: center;
      color: #fff;
      position: absolute;
      left: 0;
      bottom: -4.4rem;
    }
    .close-poster {
      position: absolute;
      top: -3rem;
      right: 2rem;
      img {
        height: 3rem;
      }
    }
    .poster-img {
      width: 100%;
      img {
        width: 100%;
      }
    }
  }
}
</style>