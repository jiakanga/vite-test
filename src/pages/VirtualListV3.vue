<template>
  <div class="container">
    <div class="he">头部</div>
    <div class="con">
      <div ref="list" class="infinite-list-container" @scroll="scrollEvent">
        <div
          class="infinite-list-phantom"
          :style="{ height: listHeight + 'px' }"
        ></div>
        <div class="infinite-list" :style="{ transform: getTransform }">
          <div
            ref="items"
            class="infinite-list-item"
            v-for="item in visibleData"
            :key="item.id"
            :style="{
              height: pageData.itemSize + 'px',
              lineHeight: pageData.itemSize + 'px',
            }"
          >
            {{ item.value }}
          </div>
        </div>
      </div>
    </div>
    <div class="foot">底部</div>
  </div>
</template>

<script lang="ts" setup>
// v3 版本 简单实现 实际应用需要优化
// v2 版本 参考链接：https://juejin.cn/post/6844903982742110216#heading-2
import { reactive, ref, computed, onMounted } from "vue";
let pageData = reactive({
  //可视区域高度
  screenHeight: 0,
  //偏移量
  startOffset: 0,
  //起始索引
  start: 0,
  //结束索引
  end: 10,
  itemSize: 20,
});
let now = Date.now();
// 插入一万条数据
const total = 10000;
// 获取容器
let listData = ref(<{ id: number; value: number }[]>[]);

//列表总高度
let listHeight = computed(() => {
  return listData.value.length * pageData.itemSize;
});
//可显示的列表项数
let visibleCount = computed(() => {
  return Math.ceil(pageData.screenHeight / pageData.itemSize);
});
//偏移量对应的style
let getTransform = computed(() => {
  return `translate3d(0,${pageData.startOffset}px,0)`;
});
//获取真实显示列表数据
let visibleData = computed(() => {
  return listData.value.slice(
    pageData.start,
    Math.min(pageData.end, listData.value.length)
  );
});
// 将数据插入容器中
for (let i = 0; i < total; i++) {
  listData.value.push({
    id: i,
    value: i,
  });
}
onMounted(() => {
  pageData.screenHeight = list.value.clientHeight;
  console.log(
    "%c [ list.value ]-99-「demo1」",

    "font-size:13px; background:#28f358; color:#6cff9c;",
    list.value
  );
  pageData.start = 0;
  pageData.end = pageData.start + visibleCount.value;
});
console.log("JS运行时间：", Date.now() - now);
setTimeout(() => {
  console.log("总运行时间：", Date.now() - now);
}, 0);
const list = ref();
const items = ref();
const scrollEvent = () => {
  //当前滚动位置
  let scrollTop = list.value.scrollTop;
  //此时的开始索引
  pageData.start = Math.floor(scrollTop / pageData.itemSize);
  //此时的结束索引
  pageData.end = pageData.start + visibleCount.value;
  //此时的偏移量
  pageData.startOffset = scrollTop - (scrollTop % pageData.itemSize);
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.container {
  height: 100vh;
  overflow: hidden;
  display: flex;
  box-sizing: border-box;
  flex-flow: column nowrap;
}
.he {
  height: 100px;
}
.foot {
  height: 100px;
}
.con {
  overflow: auto;
  flex: 1;
}
.demo {
  height: 20px;
}
.demo:nth-child(odd) {
  background: #666;
}

.infinite-list-container {
  height: 100%;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.infinite-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  text-align: center;
}

.infinite-list-item {
  padding: 10px;
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid #999;
}
</style>
