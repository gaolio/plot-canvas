/**
 *   图像类型
 *   rect：圆角矩形
 *   text: 文本 
 */
export const colors = {
  fontColor: '#000',
  strokeStyle: '#067FFB',
  fillStyle: '#D6E9FE',
  shadowColor: '#067FFB',
  currentSelectColors:{
    strokeStyle: '#eaf6fd',
    fillStyle: '#eaf6fd',
  },
  ctspot:{
    fillStyle: '#FFF',
  }
}
// 计算文字宽度
import { computerText } from "./business"

// 绘制图形
const draw = new Map([
['rect', (ctx, options, val) => {
  let { x, y, w, h, r } = options;
  const center = 2 * r;
  if (w < center) w = center;
  if (h < center) h = center;
  ctx.strokeStyle = options.strokeStyle || colors.strokeStyle
  ctx.fillStyle = options.fillStyle || colors.fillStyle
  ctx.setLineDash(options.setLineDash || [])
  ctx.shadowBlur = 2;
  ctx.shadowColor = colors.shadowColor;
  ctx.lineWidth = "2"
  ctx.beginPath();
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + (w - r), y)
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + r + (h - center))
  ctx.arcTo(x + w, y + center + (h - center), x + w - r, y + center + (h - center), r);
  ctx.lineTo(x + r, y + center + (h - center))
  ctx.arcTo(x, y + center + (h - center), x, y + r + (h - center), r);
  ctx.lineTo(x, y + r)
  ctx.arcTo(x, y, x + r, y, r);
  ctx.stroke()
  ctx.fill();
  // 绘制文字部分
  if (options.text) {
    ctx.shadowBlur = 0;
    ctx.fillStyle = colors.fontColor;
    ctx.font = "normal small-caps 300 14px arial";
    const fontWidth = computerText(options.text || '');
    if(fontWidth > w) { 
      options.w = fontWidth + 20;
      return false
    }
    // 计算文本位置 居中
    const left = x + (w - fontWidth) / 2;
    const top = y + (h / 2) + 5;
    // 填充文本
    ctx.fillText(options.text, left, top);
  }
  ctx.closePath();
}],
// 控制点
['ctspot', (ctx, options) => {
  let { x, y } = options;
  ctx.strokeStyle = options.strokeStyle || colors.strokeStyle
  ctx.fillStyle = '#FFF'
  ctx.setLineDash(options.setLineDash || [])
  ctx.lineWidth = "2"
  ctx.beginPath();
  ctx.arc(x, y, 3, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}]
]);


// 绘制节点
export const drawAll = function(sourceData, ctx, cav) {
  cav && cav.width && ctx.clearRect(0,0, cav.width, cav.height);
  // 数组对象处理方式
  if (Array.isArray(sourceData)) {
     sourceData.forEach(item => {
      draw.get(item.type)(ctx, item.options)
     })
     return false;
  }
  const keys = Object.keys(sourceData);
  keys.forEach(item => {
      // 主节点处理流程
      if (item === 'masterNode' || item === "ctspot") {
        const params =  sourceData[item];
        for(let i =0; i < params.length; i++) {
          const items = params[i]
          draw.get(items.type)(ctx, items.options)
        }
      }
  })
}
// 拖拽角标
export const drawcts = function(options){
    const { x,y,h,w } = options;
    const obj = [
      {
        type: 'ctspot',
        options:{
          x,
          y: y + h/2
        }
      },
      {
        type: 'ctspot',
        options:{
          x: x + w/2,
          y
        }
      },
      {
        type: 'ctspot',
        options:{
          x: x + w,
          y: y + h/2
        }
      },
      {
        type: 'ctspot',
        options:{
          x: x + w/2,
          y: y + h
        }
      }
    ]
    return obj
}