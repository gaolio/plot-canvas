/**
 *  canvas handler events 
 *  author: Gaoli
 *  time: 2020-9-18 
 */

const style = new Map([
    ['mousemove', 'plot-hover'],
    ['mousemoveCts', 'plot-hover-cts']
   //  ['mousemove', 'plot-hove'],
   //  ['mousemove', 'plot-hove']
])
import {drawAll, drawcts, colors} from "./draw"
import { cloneObj } from "./common"
import config from '../config'
import { modifyText, comPos } from "./business"

// 当前移动对象
const currentDataFormate = (e,obj,cav) => {
   obj.options.x = e.clientX - cav.offsetLeft - obj.options.w / 2;
   obj.options.y = e.clientY - cav.offsetTop- obj.options.h / 2;
   obj.options.setLineDash = config.setLineDash;
   obj.options.text = '';
   obj.options.fillStyle = colors.currentSelectColors.fillStyle;
   obj.options.strokeStyle = colors.currentSelectColors.strokeStyle;
   return obj;
}

 export const dbClick = function (fun,params) {
    const e = event || window.event;
    const result = fun(e, params);
    if(result.status) {
      // 位置
      const obj = cloneObj(result.data);
      const {options} = obj; 
      const {x, y} = comPos(params.cav, options);
      options.x = x;
      options.y = y;
      modifyText(options, result)
    }  
 }

 export const mouseDown = function (fun,params) {
   const e = event || window.event;
   // 鼠标左击事件
   if (e.button === 0) {
      const result = fun(e, params);
      console.log(result);
      const self = this;
      const {cav, ctx} = params;
      let { data,index } = result;
      let currentData;
      if (cav, result.status) {
         currentData = cloneObj(data);
         params.cav.onmousemove = function(){
            const e = event || window.event;
            currentData = currentDataFormate(e,currentData, cav);
            const arr = [...self.sourceData.masterNode, currentData];
            drawAll(arr, ctx, cav)
         }
      }
      params.cav.onmouseup = function(){
         params.cav.onmousemove = null;
         if(currentData) {
            data.options.x = currentData.options.x;
            data.options.y = currentData.options.y;
            self.sourceData[index] = data;
            // drawAll(self.sourceData, ctx, cav);
            currentData = null;
         }
      }
   }
 }

 export const mouseUp = function() {}

 export const mousemove = function(fun,params) {
   let timer = new Date().getTime();
   const self = this;
   // 函数节流
   return () => {
      const e = event || window.event;
      const currentTime = new Date().getTime();
      if (currentTime - timer > 20) {
         const result = fun(e, params);
         timer = currentTime;
         const status = result.status || result.cts;
         // 鼠标样式
         params.cav.classList[status ? 'add' : 'remove'](style.get('mousemove'));
         params.cav.classList[result.cts ? 'add' : 'remove'](style.get('mousemoveCts'));
         self.sourceData.ctspot = result.status ? drawcts(result.data.options) : [];
      }
   }
 }


// 事件添加
 export const addEvents = (self,cav, fun, params) => {
    cav.addEventListener('dblclick', dbClick.bind(self, fun, params))
    cav.addEventListener('mousedown', mouseDown.bind(self, fun, params))
    cav.addEventListener('mouseUp', mouseUp.bind(self, fun, params))
    cav.addEventListener('mousemove', mousemove.call(self, fun, params))
 }