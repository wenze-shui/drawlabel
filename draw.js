//按下鼠标
let canvas = document.getElementById('xxx')
let context = canvas.getContext('2d')

autoResize()

listenToUser()

let painting = false
let lastPoint = {'x': undefined, 'y': undefined}


function autoResize() {
  getWindowSize()

  window.onresize = function() {
    getWindowSize()
  }
}

function getWindowSize() {
  let pageWidth = document.documentElement.clientWidth
  let pageHeight = document.documentElement.clientHeight

  canvas.width = pageWidth
  canvas.height = pageHeight
}

function listenToUser() {
  // 特性检测
  if (document.body.ontouchstart !== undefined) {
    canvas.ontouchstart = function(aaa) {
      console.log('开始触摸')
      let x = aaa.touches[0].clientX
      let y = aaa.touches[0].clientY
      if (usingEraser){
        painting = true
        context.clearRect(x-5,y-5,10,10)
      }else{
        painting = true
        lastPoint = {'x': x, 'y': y}
        // drawCircle(x,y,1)
      }
    }
    
    canvas.ontouchmove = function(aaa) {
      console.log('触摸移动')
      let x = aaa.touches[0].clientX
      let y = aaa.touches[0].clientY
      if (!painting){
        return
      }
      if (usingEraser){
        context.clearRect(x,y,10,10)
      }else{
        let newPoint = {'x': x,'y': y}
        // drawCircle(x,y,1)
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    
    canvas.ontouchend = function(aaa) {
      console.log('触摸结束')
      painting = false
    }
  }else {
    canvas.onmousedown = function(aaa){
      let x = aaa.clientX
      let y = aaa.clientY
      if (usingEraser){
        painting = true
        context.clearRect(x-5,y-5,10,10)
      }else{
        painting = true
        lastPoint = {'x': x, 'y': y}
        // drawCircle(x,y,1)
      }
    }
    
    canvas.onmousemove = function(aaa){
      let x = aaa.clientX
      let y = aaa.clientY
      if (!painting){
        return
      }
      if (usingEraser){
        context.clearRect(x,y,10,10)
      }else{
        let newPoint = {'x': x,'y': y}
        // drawCircle(x,y,1)
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
      
    }
    canvas.onmouseup = function(aaa){
      painting = false
    }
  }

}

function drawCircle(x,y,radius) {
  context.beginPath()
  context.arc(x,y,radius,0,Math.PI*2);
  context.stroke()
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1)
  context.lineWidth = 5
  context.lineTo(x2, y2)
  context.stroke()
  context.closePath()
}

// ----------------------------

let usingEraser = false
eraser.onclick = function() {
  usingEraser = true
  actions.className = 'actions x' 
}

brush.onclick = function(){
  usingEraser = false
  actions.className = 'actions'
}

// ——————————————————————————————————————————————————————————————————————————————————

// context.fillStyle = 'red'
// context.fillRect(0, 0, 100, 100)
// let painting = false
// document.onmousedown = function(a) {
//   painting = true
//   let x = a.clientX
//   let y = a.clientY
  
//   let divA = document.createElement('div')
//   divA.style = "width: 6px; height: 6px;" + 
//     "background: black; border-radius: 3px;" +
//     "position: absolute; left: " + (x-3) + "px;" +
//     "top: " + (y-3) + "px;"
//   div.appendChild(divA) 
// }

// //动鼠标
// document.onmousemove = function(a) {
//   if (painting) {
//     let x = a.clientX
//     let y = a.clientY
    
//     let divA = document.createElement('div')
//     divA.style = "width: 6px; height: 6px;" + 
//       "background: black; border-radius: 3px;" +
//       "position: absolute; left: " + (x-3) + "px;" +
//       "top: " + (y-3) + "px;"
//     div.appendChild(divA) 
//   }
//   // console.log(y)
// }

// // 松开鼠标
// document.onmouseup = function(z) {
//   painting = false
//   // console.log(z)
// }