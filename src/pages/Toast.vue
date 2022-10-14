<template>
  <div><button @click="showToast()">显示toast</button></div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";
export default defineComponent({
  name: "show-toast",
  setup() {
    //getCurrentInstance:可以获取到组件的实例
    let { proxy }: any = getCurrentInstance();
    // 代替this
    let showToast = () => {
      proxy.$myToast({
        message: "我是toast插件",
        duration: 3000,
        onClose: () => {
          console.log("已关闭");
        },
      });
    };
    return { showToast };
  },
});
</script>
