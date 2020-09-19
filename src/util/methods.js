import {createCav, initCav, queryDom} from "./common"

/**
 *  init 画布
 */

 export const initCanvas = el => {
    const cav = createCav();
    const ctx = initCav(el, cav)
    return {cav, ctx}
 }

 // container容器对象 含有el cavans对象
 export const initCon = params => {
   let container = {}; 
   container.el = queryDom(params.el);
   container.canvas = initCanvas(container.el)
   return container
 }