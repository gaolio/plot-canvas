import { createCav, initCav, queryDom } from "./common"

let textArea;

/**
 *  init 画布
 */

export const initCanvas = el => {
  const cav = createCav();
  const ctx = initCav(el, cav)
  return { cav, ctx }
}

// container容器对象 含有el cavans对象
export const initCon = params => {
  let container = {};
  container.el = queryDom(params.el);
  container.canvas = initCanvas(container.el)
  return container
}

// 修改文本
export const modifyText = function (options, source) {
  const { x, y, w, h,r } = options;
  if (!textArea) {
    textArea = document.createElement('textarea');
    textArea.setAttribute('class', `plot-textarera`)
  }
  textArea.setAttribute('style', `
    display: block;
    left:${x + 2}px; 
    top: ${y + 2}px; 
    width: ${w - 2}px; 
    height: ${h - 2}px;
    border-radius: ${r}px;
    padding: ${r/2}px
    `)
  textArea.value = options.text || '';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.onblur = function(){
   source.data.options.text = this.value;
   textArea.setAttribute('style', 'display: none')
  }
}

// 计算修改文本框的位置
export const comPos = function (cav,options) {
  const x = cav.offsetLeft;
  const y = cav.offsetTop;
  return {
    x: x + options.x,
    y: y + options.y
  }
}

// 计算文字的宽度
export const computerText = (text) => {
  const el = document.createElement('span');
  el.classList.add('plot-text')
  el.innerText = text;
  document.body.appendChild(el)
  const w = el.getClientRects()[0].width;
  document.body.removeChild(el)
  return w;
}
