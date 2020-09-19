/**
 *  common methods
 *  exmple： computer watch Object
 */

import { initCon } from "./methods";

// create canvas
export const createCav = () => {
  const canvas = document.createElement('canvas');
  return canvas
}

/**
 *  @param { Element } el  DOM node
 *  @param { Element } el  canvas node
 *  初始化cav画布大小100% 并添加
 */
export const initCav = (el, canvas) => {
  const obj = el.getBoundingClientRect && el.getBoundingClientRect();
  if (obj) {
    canvas.setAttribute('width', obj.width);
    canvas.setAttribute('height', obj.height)
  }
  el.appendChild(canvas);
  return canvas.getContext('2d');
}

/**
 *  计算点击区域
 *  @param { Events }  e window.event
 *  @param { Element } canvas node 
 *  @param { Array }  sourceDate 数据源
 *  @returns { Boolean } 是否在焦点范围内
 *  @returns { Object | String } 选中数据源
 *  @returns { Number } 选中数据源下标
 * 
 */

export const computer = (ev, params) => {
  const { cav, sourceData } = params;
  console.log(params);
  const cx = ev.clientX - cav.offsetLeft, cy = ev.clientY - cav.offsetTop;
  let obj = null;
  sourceData.forEach((item, index) => {
    // 对象的坐标和宽高
    const { x, y, w, h } = item.options
    // 判断比对得出结果
    if (cx > x && cx <= (x + w) && cy >= y && cy <= (y + h)) {
      obj = {
        status: true,
        data: item,
        index,
      }
    }
  });
  return obj ? obj : { status: false };
}


/**
 *  select dom
 *  @param {string | Object}
 *  @returns dom
 */

export const queryDom = node => {
  const status = typeof node === 'string';
  if (!status) return node;
  return document.querySelector(node);
}

/**
 *  @param {Object} obj canvas数据源
 *  @param {Function} fun 改变之后的回掉函数
 */
export const watchSourceData = (obj, fun) => {
  const proxy = new Proxy(obj, {
    get: function (obj, key) {
      return obj[key]
    },
    set: function (obj, key, value) {
      obj[key] = value;
      fun()
      return true;
    }
  })
  return proxy
}



