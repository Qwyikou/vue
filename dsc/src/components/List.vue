<!--  -->
<template>
  <div class="">
    <h2>公共列表组件</h2>
    <ul class="list-wrap">
      <li v-for="(list, index) in listdatas" :key="index">
        <router-link :to="'/goodsdetail/' + list.goods_id">
          <img :src="list.goods_thumb" alt="" />
          <div class="list-title">{{ list.title }}</div>
          <div class="list-price">{{ list.shop_price }}</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    listdatas: Array,
  },
  data() {
    //这里存放数据
    return {};
  },
};
</script>
<style lang="less">
.list-wrap {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  li {
    width: 50%;
    text-align: center;
    img {
      width: 17rem;
      height: 17rem;
    }
    .list-title {
      width: 17rem;
      text-align: left;
      margin-left: 1rem;

      font-size: 1.4rem;
      height: 4rem;

      line-height: 2rem;
      overflow: hidden;
      margin: 0.5rem 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .list-price {
      font-size: 1.8rem;
      color: red;
      line-height: 3rem;
      &:before {
        content: "￥";
      }
    }
  }
}
</style>