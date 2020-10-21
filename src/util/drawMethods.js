import settings from "./settings";
import { computerText } from "./business"
const { colors } = settings

// 绘制图形
class Draw {
  constructor(params) {
    this.init(params)
  }
  // 初始化
  init(params) {
    this.node = {
      ctx: params.ctx,
      cav: params.cav
    }
  }
  // 初始化全局绘制
  drawAll(params){
     const { nodeDataArray } = params;
     // 节点绘制 存储位置信息
     let positionInfo = nodeDataArray.map((item,index) => {
       return this.rect({
         ...item,
         x: 200,
         y: 100 + index * 80,
         w: 100,
         h: 40,
         r: 5
       })
     });
     return positionInfo
  }
  // 重会
  drawReplace(params){
    const {cav, ctx} = this.node;
    ctx.clearRect(0,0,cav.width, cav.height);
    params = params.map((item) => {
      return this.rect(item)
    });
  }
  // 初始化绘制样式
  initStyle(options) {
    const { ctx } = this.node;
    ctx.strokeStyle = options.strokeStyle || colors.strokeStyle
    ctx.fillStyle = options.fillStyle || colors.fillStyle
    ctx.setLineDash(options.setLineDash || [])
    ctx.shadowBlur = 2;
    ctx.shadowColor = colors.shadowColor;
    ctx.lineWidth = "2"
  }
  // 拖拽坐标点获取坐标绘制
  dragPoint(options) {
    // 起始点 x，y  宽高 w，h, 圆角半径r
    this.initStyle(options);
    let { x, y, w, h, r } = options;
    const xHarf = x + w / 2, yHarf = y + h / 2;
    // 生成四个点
    const gather = [
      { x: xHarf, y },
      { x: x + w, y: yHarf },
      { x: xHarf, y: y + h },
      { x, y: y + h }
    ]
    // 绘制点
    gather.map(i => this.point(i))
  }
  // 绘制圆角矩形
  rect(options) {
    const { ctx } = this.node;
    // 起始点 x，y  宽高 w，h, 圆角半径r
    this.initStyle(options);
    // 计算文本宽度
    const fontWidth = computerText(options.text || '');
    options.w = fontWidth > options.w ? fontWidth + 20 : options.w;
    let { x, y, w, h, r } = options;
    const center = 2 * r;
    if (w < center) w = center;
    if (h < center) h = center;
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
      if (fontWidth > w) {
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
    return options;
  }
  // 绘制拖拽坐标点
  point(options){
    let { x, y } = options;
    this.initStyle();
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }
}


export default Draw