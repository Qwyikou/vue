<!--  -->
<template>
  <div class="cart-page">
    <!-- 购物车--{{this.$store.state.num}} -->
    <div class="cart-header">
      <div class="title">购物车</div>
    </div>
    <div class="cart-wrap" v-if="cartDatas.length > 0">
      <ul>
        <li v-for="(cartData, index) in cartDatas" :key="index">
          <div class="select" @click="changeSelect(cartData, index)">
            <i class="iconfont icon-danxuankuang" v-if="!cartData.isSelect"></i>
            <i
              class="iconfont icon-danxuankuangxuanzhong"
              style="color: #f44"
              v-else
            ></i>
          </div>

          <div class="cart-content" @click="toDetail(cartData.goods_id)">
            <div class="cart-img">
              <img :src="cartData.goods_thumb" alt="" />
            </div>
            <div class="cart-text">
              <div class="cart-title">{{ cartData.goods_name }}</div>
              <div class="cart-text-wrap">
                <div class="price">{{ cartData.shop_price }}</div>
                <div class="num-wrap">
                  <div class="num">
                    <a href="javascript:;" @click="jianCart(index)">-</a>
                    <input type="text" v-model="cartData.value" />
                    <a href="javascript:;" @click="addCart(index)">+</a>
                  </div>
                  <i class="iconfont icon-shoucang1"></i>
                  <i
                    class="iconfont icon-shanchu1"
                    @click.stop="deleCart(index)"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="nocart" v-else>
      <i class="iconfont icon-gouwuche"></i>
      <div>
        购物车空空的，
        <router-link to="/home/index">去逛逛</router-link>
      </div>
    </div>

    <div class="cart-footer" v-if="cartDatas.length > 0">
      <div class="selectAll" @click="changeSelectAll">
        <i class="iconfont icon-danxuankuang" v-if="!selectAll"></i>
        <i
          class="iconfont icon-danxuankuangxuanzhong"
          style="color: #f44"
          v-else
        ></i>
        <span>全选</span>
      </div>

      <div class="totalPrice">
        <div class="price">
          合计为:
          <span>{{ total.toFixed(2) }}</span>
        </div>
        <div class="tips">(不包含运费,以节省 <span>10</span>)</div>
      </div>
      <div class="goBuy">去结算({{count}})</div>
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
    return {};
  },
  //监听属性 类似于data概念
  computed: {
    cartDatas() {
      return this.$store.state.cartDatas;
    },
    selectAll() {
      let selectStatus = this.$store.state.cartDatas.every((item) => {
        return item.isSelect == true;
      });
      return selectStatus;
    },
    total() {
      let totalPrice = 0;
      this.$store.state.cartDatas.map((item) => {
        if (item.isSelect) {
          totalPrice = item.value * item.shop_price;
        }
      });
      return totalPrice;
    },
    count(){
      let count = 0;
      this.$store.state.cartDatas.map((item) => {
        if (item.isSelect) {
          count += item.value ;
        }
      });
      return count;
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    changeSelect(cartData, index) {
      cartData.isSelect = !cartData.isSelect;
      this.$store.commit("changeSelect", { cartData, index });
    },
    changeSelectAll() {
      this.$store.commit("changeSelectAll");
    },
    addCart(index) {
      this.$store.commit("addCart", index);
    },
    jianCart(index) {
      this.$store.commit("jianCart", index);
    },
    deleCart(index) {
      this.$store.commit("deleCart", index);
    },
    toDetail(gid){
      this.$router.push("/goodsdetail/"+gid)
    }
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
.cart-page {
  .cart-footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
    position: fixed;
    bottom: 4.9rem;
    left: 0;
    border-top: 1px solid #efefef;
    font-size: 1.4rem;
    .selectAll {
      width: 20%;
      text-align: center;
      font-size: 1.4rem;
    }
    .totalPrice {
      width: 60%;
      text-align: right;
      .price {
        span {
          color: #f44;
          font-weight: bold;
        }
      }
      .tips {
        color: #333;
      }
    }
    .goBuy {
      width: 20%;
      background: #f44;
      line-height: 4rem;
      color: #fff;
      text-align: center;
    }
  }
  .cart-header {
    width: 100%;
    height: 4.4rem;
    border-bottom: 1px solid #efefef;
    text-align: center;
    line-height: 4.4rem;
    font-size: 1.4rem;
    position: fixed;
    top: 0;
    left: 0;
  }
  .cart-wrap {
    ul {
      width: 100%;
      li {
        height: 10rem;
        border-bottom: 1px solid #efefef;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .select {
          width: 10%;
          text-align: center;
        }
        .cart-content {
          width: 90%;
          display: flex;
          .cart-img {
            width: 7rem;
            height: 7rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .cart-text {
            width: 100%;
            width: calc(100% - 9rem);
            margin-right: 1rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .cart-title {
              font-size: 1.2rem;
              height: 4rem;
              line-height: 2rem;
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              margin-bottom: 0.5rem;
            }
            .cart-text-wrap {
              width: 100%;
              display: flex;
              justify-content: space-between;
              .price {
                font-size: 1.8rem;
                color: #f44;
                &:before {
                  content: "￥";
                }
              }
              .num-wrap {
                display: flex;
                .icon-shoucang1 {
                  margin: 0 1rem;
                }
                .num {
                  display: flex;
                }
                input {
                  width: 4rem;
                  height: 2rem;
                  border: 1px solid #efefef;
                  text-align: center;
                }
                a {
                  display: block;
                  width: 2rem;
                  height: 2rem;
                  text-align: center;
                  line-height: 2rem;
                  border: 1px solid #efefef;
                }
              }
            }
          }
        }
      }
    }
  }
  margin-top: 4.4rem;
  .nocart {
    text-align: center;
    color: #666;
    font-size: 1.4rem;
    margin-top: 10rem;
    i {
      font-size: 15rem;
      color: #efefef;
    }
    div {
      margin-top: 2rem;
    }
    a {
      color: red;
    }
  }
}
</style>