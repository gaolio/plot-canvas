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

export const computer = ($event, cav, sourceData, cav) => {
  const cx = $event.clientX - cav.offsetLeft, cy = $event.clientY - cav.offsetTop;
  const obj = null;
    // try 跳出for循环
   try {
      sourceData.forEach((item, index) => {
        // 对象的坐标和宽高
        const {x,y,w,h} = item.options
        // 判断比对得出结果
        if (cx > x && cx <= (x + w) && cy >= y && cy <= (y + h)) {
          obj =  {
            status: true,
            data: item,
            index,
          }
          throw Error();
        } 
      });
    } catch (error) {
      throw error
    }
  return obj ? obj : {status: false};
}


/**
 *  select dom
 */

export const queryDom = (node) => {
  console.log(node);
} 


