
import * as PubMethods from "./util/common"
import { initCon } from "./util/business"
import {drawAll} from "./util/draw"
import { addEvents } from "./util/event"



// 用来存储过度信息 dom节点 canvas2D
export let container = null;
class Plot{
   constructor(params){
      // dom节点
      container = initCon(params);
      this.sourceData = { masterNode: params.sourceData }
      // 数据源 监听
      this.sourceData =  PubMethods.deepWatch.call(this, this.sourceData, drawAll, container.canvas.ctx, container.canvas.cav);
      // 绘制canvas
      drawAll(this.sourceData, container.canvas.ctx, container.canvas.cav);
      // 事件添加
      addEvents(this, container.canvas.cav, PubMethods.computer, {cav: container.canvas.cav, sourceData: this.sourceData.masterNode, ctx:container.canvas.ctx })
      // 添加一条数据
      PubMethods.modifySource.call(this)
   }

}



export default Plot
