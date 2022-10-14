// toast.vue
<template>
  <div class="toast-wrap">{{ message }}</div>
</template>

<script>
export default {
  name: "my-toast",
  props: { message: { type: String, default: "" } },
};
</script>

<style scoped>
.toast-wrap {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 8px 15px;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  position: fixed;
  z-index: 99;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
}
</style>
