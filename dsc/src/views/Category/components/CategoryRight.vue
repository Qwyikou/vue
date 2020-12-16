<!--  -->
<template>
  <div class="category-right">
    <div v-if="showText" style="text-align: center; line-height: 3rem">
      下拉刷新
    </div>
    <div class="category-right" id="wrapper">
      <div class="category-right-content" id="content">
        <div class="ad">
          <img :src="this.$store.state.ad" alt="" />
        </div>
        <ul class="category-list">
          <li
            v-for="categoryRightData in categoryRightDatas"
            :key="categoryRightData.cat_id"
          >
            <h3>
              <span>-</span>
              {{ categoryRightData.cat_name }}
              <span>-</span>
            </h3>
            <ul class="child">
              <li
                v-for="category in categoryRightData.child"
                :key="category.cat_id"
              >
                <router-link :to="'/categorylist/'+category.cat_id">
                  <img :src="category.touch_icon" alt="" />
                  <h4>{{ category.cat_name }}</h4>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import BScroll from "better-scroll";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    categoryRightDatas: Array,
  },
  data() {
    //这里存放数据
    return {
      rightScroll: null,
      showText: false,
      scrollTop: 0,
      oHeight: 0,
      arr: ["858", "6", "8", "3", "4", "5", "860"],
      index: 0,
    };
  },
  methods: {
    scrollPage() {
      this.rightScroll = new BScroll("#wrapper", {
        pullUpLoad: true,
        scrollbar: false,
        pullDownRefresh: true,
        click: true,
      });
      this.rightScroll.on(
        "scroll",
        (obj) => {
          if (obj.y > 30 && obj.y < 100) {
            this.showText = true;
          } else {
            this.showText = false;
          }
          if (obj.y > 100) {
            let index = this.findIndex((val) => {
              return val == this.$store.state.cat_id;
            });
            if (index) {
              this.$store.dispatch(
                "actChangeCategoryRight",
                this.arr[index - 1]
              );
              this.rightScroll.refresh();
            } else {
              this.$store.dispatch("actChangeCategoryRight", this.arr[index]);
            }
          }
          this.scrollTop = Math.abs(obj.y);
          if (document.querySelector("#content")) {
            this.oHeight =
              document.querySelector("#content").scrollHeight -
              document.querySelector("#wrapper").offsetHeight;
          }
          if (this.scrollTop > this.oHeight + 100) {
            let index = this.arr.findIndex((val) => {
              return val == this.$store.state.cat_id;
            });
            this.$store.dispatch("actChangeCategoryRight", this.arr[index + 1]);
            this.rightScroll.refresh();
          }
        },
        false
      );
    },
  },
  computed: {},
  mounted() {
    this.$nextTick(() => {
      this.scrollPage();
    });
  },
};
</script>
<style lang="less">
.category-right {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  .category-right-content {
    .ad {
      width: 100%;
      margin-top: 1rem;
      img {
        width: 90%;
        margin-left: 5%;
      }
    }
    .category-list {
      li {
        h3 {
          font-size: 1.4rem;
          line-height: 4.4rem;
          color: #666;
          text-align: center;
          font-weight: normal;
          span {
            color: #ccc;
          }
        }
        .child {
          display: flex;
          flex-wrap: wrap;
          text-align: center;
          li {
            width: 33%;
            height: 8.2rem;
            margin-bottom: 1rem;
            img {
              width: 5.2rem;
              height: 5.2rem;
            }
            h4 {
              font-size: 1.2rem;
              font-weight: normal;
              color: #999;
              margin-top: 1rem;
            }
          }
        }
      }
    }
  }
}
</style>