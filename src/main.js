/**
 *  2020-09-16
 *  author: gaoli
 */

 import "./assets/index.scss"
 import Plot from "./index"

const plot = new Plot({
  el: '.app',
  sourceData: [
    {
      type: 'rect',
      options: { x: 100, y: 100, w: 100, h: 45, r: 10, text: '开始' }
    },
    {
      type: 'rect',
      options: { x: 300, y: 100, w: 70, h: 70, r: 35, text: '继续' }
    },
    {
      type: 'rect',
      options: { x: 500, y: 100, w: 100, h: 45, r: 4, text: '结束'  }
    }
  ]
})



