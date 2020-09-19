/**
 *  canvas handler events 
 *  author: Gaoli
 *  time: 2020-9-18 
 */

const style = new Map([
    ['mousemove', 'plot-hover'],
   //  ['mousemove', 'plot-hove'],
   //  ['mousemove', 'plot-hove']
])



 export const dbClick = function (fun,params) {
    const e = event || window.event;
    const result = fun(e, params);
    console.log(result, this);
 }

 export const mouseDown = function () {}

 export const mouseUp = function() {}

 export const mousemove = function(fun,params) {
   let timer = new Date().getTime();
   // 函数节流
   return () => {
      const e = event || window.event;
      const currentTime = new Date().getTime();
      if (currentTime - timer > 20) {
         const result = fun(e, params);
         timer = currentTime;
         // 鼠标样式
         params.cav.classList[result.status ? 'add' : 'remove'](style.get('mousemove'))
      }
   }
 }


// 事件添加
 export const addEvents = (self,cav, fun, params) => {
    cav.addEventListener('dblclick', dbClick.bind(self, fun, params))
    cav.addEventListener('mouseDown', mouseDown.bind(self, fun, params))
    cav.addEventListener('mouseUp', mouseUp.bind(self, fun, params))
    cav.addEventListener('mousemove', mousemove.call(self, fun, params))
 }