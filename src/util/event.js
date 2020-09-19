/**
 *  canvas handler events 
 *  author: Gaoli
 *  time: 2020-9-18 
 */


 export const dbClick = (fun,params) => {
    const e = event || window.event;
    const result = fun(e, params);
    console.log(result, this);
 }

 export const mouseDown = () => {}

 export const mouseUp = () => {}

 export const mousemove = () => {}





// 事件添加
 export const addEvents = (self,cav, fun, params) => {
    cav.addEventListener('dblclick', dbClick.bind(self, fun, params))
    cav.addEventListener('mouseDown', mouseDown.bind(self))
    cav.addEventListener('mouseUp', mouseUp.bind(self))
    cav.addEventListener('mousemove', mousemove.bind(self))
 }