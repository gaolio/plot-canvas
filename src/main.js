/**
 *  2020-09-16
 *  author: gaoli
 */

import "./assets/index.scss"
import Plot from "./index"


const plot = new Plot({
  el: document.querySelector('#app'),
  nodeDataArray:[
    { text: 'start', key: '123123456456123123897891saasda' },
    { text: '受到各方回家啊啥的风景', key: '123123456456123123897891saasda' }
  ]
});

console.log(plot);

