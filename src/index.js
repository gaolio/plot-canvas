
// /**
//  *  key canvas要绘制的类型  type: ['rect']
//  */

// // 图像类型
// import draw from "./draw"
// import createInput, { hideEdit, handlerEnter } from "./edit"

// // 处理拖拽事件 参数说明： canvas 2D 绘制对象 全部数据源 绘制方法 canvas对象
// function drawImage(ctx, sourceData, draw, cav) {
//     ctx.clearRect(0, 0, cav.width, cav.height)
//     sourceData.forEach(i => {
//         draw.get(i.type)(ctx, i.options)
//     })
// }
// // 鼠标按下移动
// function moveDown(ctx, sourceData, currentData, cav) {
//     const e = event || window.event;
//     currentData.options.x = e.clientX - (currentData.options.w / 2);
//     currentData.options.y = e.clientY - (currentData.options.h / 2);
//     drawImage(ctx, [...sourceData, currentData], draw, cav)
// }


// // 文字编辑
// const handlerDbclick = (state, item, index, callback) => {
//     let input = document.querySelector('.plot-input')
//     const handlerChange = function(item,index){
//         return function () {
//             const e = event || window.event;
//             if (e.keyCode === 13) {
//                 // debugger
//                 item.options.text = input.value;
//                 callback(index, item);
//                 handlerEnter();
//             }
//         }
//     }
//     if (state) {
//         const { options } = item;
//         const text = options.text ? options.text : '';
//         const top = options.y + (options.h - 36) / 2;
//         const left = options.x + (options.w - text.length * 16 ) / 2 - 15
//         // 创建或拿到input元素
//         if (!input) {
//             input = createInput({ class: 'plot-input', style: `display:block; top: ${top}px; left: ${left}px` });
//         } else {
//             hideEdit(true);
//             input.setAttribute('style', `top: ${top}px; left: ${left}px`)
//         }
//         input.removeEventListener('keydown', handlerChange);
//         // 赋值并获取焦点
//         input.value = options.text ?  options.text : '';
//         input.focus();
//         input.addEventListener('keydown', handlerChange(JSON.parse(JSON.stringify(item),index)))
//     } else {
//         hideEdit(false);
//     }
// }

// class Plot {
//     constructor(sourceData) {
//         const { el, imgData } = sourceData;
//         if (!el) {
//             console.error('Missing parameter el')
//             return false;
//         }
//         this.el = sourceData.el;
//         // 校验数据源
//         if (imgData && !Array.isArray(imgData)) {
//             console.error('Missing parameter El or parameter format error. Array expected')
//         }
//         // 绘制区域数据源
//         this.sourceData = sourceData.imgData || [];
//         // 当前操作项
//         this.currentData = null;
//         // 当前canvas对象
//         this.cav = this.createCanvans();
//         this.ctx = this.cav.getContext('2d');
//         // 绘制图像
//         this.handlerImageData();
//     }
//     /**
//      * @param {canvas 2D object} ctx canvas 2d对象
//      * @param { Object } imgData  绘制的对象参数 如：圆角矩形rect
//      */
//     drawPlot(ctx, imgData, val) {
//         // 根据type绘制图形
//         draw.get(imgData.type)(ctx, imgData.options)
//         if (val) this.sourceData.push(imgData);
//     }
//     /**
//      *  动态生成canvas
//      */
//     createCanvans() {
//         const canvas = document.createElement('canvas');
//         const obj = this.el.getBoundingClientRect && this.el.getBoundingClientRect();
//         if (obj) {
//             canvas.setAttribute('width', obj.width);
//             canvas.setAttribute('height', obj.height)
//         }
//         this.el.appendChild(canvas);
//         // 添加hover事件
//         canvas.addEventListener('mousemove', this.computer.bind(this, false, this.sourceData, this.handleFocus));
//         // 添加拖拽事件
//         canvas.onmousedown = this.handlerEnter.bind(this, canvas)
//         // 添加双击事件
//         canvas.addEventListener('dblclick', this.computer.bind(this, false, this.sourceData, handlerDbclick));
//         // 点击事件隐藏输入框
//         canvas.addEventListener('click', this.computer.bind(this, false, this.sourceData, hideEdit.bind(this, false)))
//         return canvas
//     }
//     // imgdata的数据绘制
//     handlerImageData(index, item) {
//         console.log(index);
//         index && item && (this.sourceData[index] = item)
//         console.log(this.ctx);
//         this.ctx.clearRect(0,0,this.cav.width, this.cav.height);
//         const data = this.sourceData;
//         console.log(data);
//         data.forEach(item => {
//             this.drawPlot(this.ctx, item)
//         });
//     }
//     // 通用mouseover事件
//     computer($event, sourceData, callback) {
//         // 未获取焦点则移除事件
//         callback && callback.call(this);
//         let e = $event || window.event || event;
//         const x = e.clientX - this.cav.offsetLeft, y = e.clientY - this.cav.offsetTop;
//         sourceData.forEach((item, index) => {
//             const { options } = item
//             // 圆角矩形处理方式
//             if (item.type === 'rect' && x > options.x && x <= (options.x + options.w) && y >= options.y && y <= (options.y + options.h)) {
//                 callback && callback.call(this, true, item, index, this.handlerImageData.bind(this))
//             }
//         });
//     }
//     // 获取失去焦点操作
//     handleFocus(state) {
//         this.cav.setAttribute('style', `${state ? 'cursor: move' : ''}`)
//     }
//     // 鼠标按下并点击
//     handlerEnter(cav) {
//         const self = this;
//         // cav.removeEventListener('mousemove', move);
//         const e = event || window.event;
//         // 当前选中的下标注
//         let index = false;
//         this.computer(e, this.sourceData, (state, i, indexItem) => {
//             cav.style = state ? 'cursor: move' : '';
//             if (state) {
//                 this.currentData = JSON.parse(JSON.stringify(i));
//                 this.currentData.options.setLineDash = [2, 2];
//                 index = indexItem
//                 cav.onmousemove = moveDown.bind(this, this.ctx, this.sourceData, this.currentData, cav)
//             }
//         })
//         //清除事件
//         cav.onmouseup = function () {
//             const { ctx, sourceData, cav, currentData } = self;
//             // 定位
//             if (sourceData[index]) {
//                 let cloneObj = JSON.parse(JSON.stringify(currentData));
//                 sourceData.splice(index, 1);
//                 cloneObj.options.setLineDash = false;
//                 sourceData.push(cloneObj)
//             }
//             drawImage(ctx, sourceData, draw, cav)
//             cav.onmousemove = null;
//         }
//     }

// }

import * as PubMethods from "./util/common"
import { initCanvas } from "./util/methods"

// 用来存储过度信息
const container = {};

class Plot{
   constructor(params){
      // dom节点
      container.el = PubMethods.queryDom(params.el);
      this.sourceData = PubMethods.watchSourceData(params.sourceData, () => {console.log(this);});
      container.canvas = initCanvas(container.el);
      console.log(container);
   }

}



export default Plot
