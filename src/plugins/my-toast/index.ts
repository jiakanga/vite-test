// index.ts
import MyToast from "./toast.vue";
import { createVNode, render } from "vue";

interface IOptions {
  message: string;
  duration?: number;
  onClose?: Function;
}

export default {
  install: (app: any) => {
    //是否存在toast，防止toast在未销毁前，连续点击按钮生成多个toastlet
    let isToast = false;
    // app.config.globalProperties注册全局方法，相当于vue2的Vue.prototype
    app.config.globalProperties.$myToast = function (opts: IOptions) {
      //如果toast不存在，开始创建toast
      if (!isToast) {
        isToast = true;
        //在toast未销毁前，不执行以下程序//创建虚拟节点
        let vm: any = createVNode(MyToast);
        //创建div容器
        let container = document.createElement("div");
        //渲染虚拟节点
        render(vm, container);
        //将创建好的div元素添加到body元素内
        document.body.appendChild(container);
        //设置toast.vue文件中的props选项内部的message的值
        vm.component.props.message = opts.message || "";
        let duration = opts.duration || 2000;
        setTimeout(() => {
          //销毁toast
          document.body.removeChild(container);
          //toast销毁后将isToast设置为false，可以再次创建toastisToast = false;
          //如果存在onClose方法
          if (opts.onClose) {
            //调用  onClose方法
            opts.onClose();
          }
        }, duration);
      }
    };
  },
};
