/**
 *  common methods
 *  exmple： computer watch Object
 */

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
export const watchSourceData = function (obj, fun, ctx, cav) {
  // 始终改变的是原素组
  const self = this;
  const proxy = new Proxy(obj, {
    get: function (obj, key) {
      return obj[key]
    },
    set: function (obj, key, value) {
      if(typeof value === 'object') value = deepWatch.call(self, value, fun, ctx, cav);
      obj[key] = value;
      fun(self.sourceData || obj, ctx, cav)
      return true;
    }
  })
  return proxy
}
// 循环添加proxy
export const deepWatch = function(obj, fun, ctx, cav) {
  let result = false;
  if (typeof obj === 'object') {
    for (let i in obj) {
      if (typeof obj[i] === 'object') obj[i] = deepWatch.call(this, obj[i],fun, ctx,cav)
    }
    result = watchSourceData.call(this, obj, fun, ctx,cav)
  } else { result = obj }
  return result;
}

// 修改数据源
export const modifySource= function(){
  const length =  this.sourceData.length;
  this.sourceData[length] = {
   type: 'rect',
   options: { x: 100, y: 400, w: 100, h: 45, r: 10, text: '开始' }
 }
}



// 函数截流

const throttle = (fun, time) => {
  const timer = new Date().getTime();
  return () => {
     const currentTime = new Date().getTime();
     if ((currentTime - timer) > time) {
        fun()
        timer = currentTime;
     }
  }
}

// 对象克隆
export const cloneObj = obj => {
  return JSON.parse(JSON.stringify(obj))
}