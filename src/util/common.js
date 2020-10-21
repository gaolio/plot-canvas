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
  for (let i in sourceData) {
    // 对象的坐标和宽高
    const { x, y, w, h } = sourceData[i].options
    // 判断比对得出结果
    if (cx > x && cx <= (x + w) && cy >= y && cy <= (y + h)) {
      const cts = computerCts({cx,cy}, sourceData[i].options);
      // 判断坐标点
      obj = {
        cts,
        status: true,
        data: sourceData[i],
        i,
      }
    }
  }
  return obj ? obj : { status: false };
}

// 计算坐标点的位置
export const computerCts = ($event, options) => {
  const { cx, cy } = $event;
  const { x, y, w, h } = options;
  // 范围
  const range = 10;
  const obj = [
    {
      type: 'ctspot',
      options: {
        x,
        y: y + h / 2
      }
    },
    {
      type: 'ctspot',
      options: {
        x: x + w / 2,
        y
      }
    },
    {
      type: 'ctspot',
      options: {
        x: x + w,
        y: y + h / 2
      }
    },
    {
      type: 'ctspot',
      options: {
        x: x + w / 2,
        y: y + h
      }
    }
  ]
  let result = false;
  // 判断范围
  for(let i = 0; i < obj.length; i++) {
    const {x,y} = obj[i].options;
    if (cx > (x-range) && cx <= (x + range) && cy > (y-range) && cy <= (y + range) ) {
      result = {x,y}
      return result;
    }
  }
  return result;
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
// 对象克隆
export const cloneObj = obj => {
  return JSON.parse(JSON.stringify(obj))
}


class ComputerPosition {
  constructor(params){
    this.init(params);
  }
  init(params){
    this.sourceData = params.sourceData;
    this.node = params.node
  }
  // 全局处理点击事件
  handlerEvents(ev){
    const arr = this.sourceData;
    // 循环判断是否有坐标点
    for(let i in arr) {
      const options = arr[i];
      const result = this.rect(options,ev);
      if(result) return result;
    }
    return false
  }
  // 根据类型处理位置
  // 参数一： 节点信息 参数二：事件对象evnets
  rect(options, ev){
    // canvas信息
    const { cav } = this.node;
    const { x, y, w, h } = options;
    const cx = ev.clientX - cav.offsetLeft, cy = ev.clientY - cav.offsetTop;
    // 判断是否在当前节点范围内
    if (cx > x && cx <= (x + w) && cy >= y && cy <= (y + h)) return options
    return false
  }
}


export default ComputerPosition