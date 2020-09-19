import {createCav, initCav} from "./common"


/**
 *  init 画布
 */

 export const initCanvas = el => {
    const cav = createCav();
    const ctx = initCav(el, cav)
    return {cav, ctx}
 }