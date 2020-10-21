
// canvas 绘制流程图
import Draw from "./util/drawMethods"
// 创建初始化canvas画布
import { initCanvas } from './util/business'
// 事件循环
import cavEvents  from "./util/event"
// 计算位置
import ComputerPosition from "./util/common"
 class Plot {
   constructor(params){
      this.init(params);   
   }
   init(params){
      // canvas
      this.node = {
         el: params.el,
         ...initCanvas(params.el),
      }
      // 数据源
      this.$data = params;
      // 绘制图形的方法
      this.draw = new Draw(this.node);
      // 绘制页面 获取节点位置
      this.positionInfo = this.draw.drawAll(this.$data); 
      // 位置计算操作
      this.computer = new ComputerPosition({
         node: this.node, 
         sourceData: this.positionInfo
      }) 
      // 事件添加
      this.bindEvents();
   }
   // 事件添加
   bindEvents(){ 
      cavEvents.call(this)
   }
} 




export default Plot


