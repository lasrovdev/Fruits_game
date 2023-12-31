let startCoor = [0, 0]
let speed = 3
let speeds_circle = [speed / 2, speed / 3, speed]
let colors = ["red", "deeppink", "black", "limegreen", "cornflowerblue", "black", "purple" , "brown", "orange", "black", "peru", "cornflowerblue"]

window.ontouchmove = draw
window.ontouchstart = defineDraw

let polyline = document.querySelector("polyline")
let fruits = document.querySelectorAll("circle, ellipse")
let $points = document.querySelector("h3")
let $lives = document.querySelector("h3:nth-child(2)")

let points = 0
let lives = 1

fruits.forEach(x => {
  x.setAttribute("cx", Math.floor(50 + Math.random() * (window.innerWidth - 50 + 1 - 50)))
  
  if (x.nodeName == "ellipse") {
    x.setAttribute("fill", "limegreen")
  } else {
    x.setAttribute("fill", colors[Math.floor(Math.random() * colors.length)])
  }
})
let lost = false

function draw(){
  let x = event.touches[0].clientX
  let y = event.touches[0].clientY
  
  polyline.setAttribute("points",
    `${startCoor[0]},${startCoor[1]} ${x},${y}`
  )
  
  destruir = setTimeout(() => {
    if(!lost) {
      polyline.setAttribute("points", "")
    }
  }, 250)
}
function defineDraw(){
  startCoor[0] = event.touches[0].clientX
  startCoor[1] = event.touches[0].clientY
  
  draw()
}
function fruitsMove(){
  fruits.forEach(x => {
    x.setAttribute("cy", x.getAttribute("cy") - speed)
    
    if(detectCollision(x, polyline) 
      || 
      +x.getAttribute("cy") < 0){
      if(x.getAttribute("fill") == "black" 
      && 
      !(+x.getAttribute("cy") < 0)
      &&
      --lives == 0){/*
        clearInterval(main)
        lost = true
        
        window.ontouchmove = null
        window.ontouchstart = null*/
        window.location  = window.location
      }
      if (detectCollision(x, polyline) 
      || 
      !+x.getAttribute("cy") < 0) {
        $points.innerHTML = "Points: " + points
        if(x.getAttribute("fill") == "cornflowerblue"){
          points+=10*+(x.getAttribute("fill")!="black")
          $points.innerHTML = "Points: " + +points
          
          lives++
        }
        else if(colors.indexOf(x.getAttribute("fill")) < 5){
          points+=3*+(x.getAttribute("fill")!="black")
          $points.innerHTML = "Points: " + +points
        }
        else if (colors.indexOf(x.getAttribute("fill")) >= 5 && colors.indexOf(x.getAttribute("fill") < 8)) {
          points+=5*+(x.getAttribute("fill")!="black")
          $points.innerHTML = "Points: " + +points
        }
        else{
          points+=10*+(x.getAttribute("fill")!="black")
          $points.innerHTML = "Points: " + +points
        }
      }
      
      $lives.innerHTML = lives + " ❤"
      
     // if(x.getAttribute("fill") != "black"){
        x.setAttribute("cy", window.innerHeight * [2, 3, 4][Math.floor(Math.random() * 3)])
      
      
      x.setAttribute("cx", Math.floor(50 + Math.random() * (window.innerWidth -50 + 1 - 50)))
      
      if (x.nodeName == "ellipse") {
        x.setAttribute("fill", "limegreen")
      } else {
        x.setAttribute("fill", colors[Math.floor(Math.random() * colors.length)])
        
        if(lives >= 5){
          x.setAttribute("fill", "black")
        }
        
        x.style.transform = "scale(" + [100, 120][Math.floor(Math.random() * 2)] + "%)"
      }
      }
   // }
    speed += 0.00001
  })
}

//Chat GTP
function detectCollision(circle, line) {
  const circleRect = circle.getBoundingClientRect();
  const linePoints = line.points;
  
  for (let i = 0; i < linePoints.length - 1; i++) {
    const x1 = linePoints[i].x;
    const y1 = linePoints[i].y;
    const x2 = linePoints[i+1].x;
    const y2 = linePoints[i+1].y;
    
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    
    if (circleRect.left <= maxX && circleRect.right >= minX &&
        circleRect.top <= maxY && circleRect.bottom >= minY) {
          
      return true;
    }
  }
  
  return false;
}
/*function detectCollision(obj1, obj2) {
  const obj1X = +obj1.getAttribute("cx")
  const obj1Y = +obj1.getAttribute("cy")
  const obj1R = +(obj1.getAttribute("r") || obj1.getAttribute("rx"))
  const obj2Points = obj2.points
  
  for (let i = 0; i < obj2Points.length; i++) {
    const point = obj2Points[i]
    const pointX = point.x
    const pointY = point.y
    
    if (Math.sqrt((obj1X - pointX) ** 2 + (obj1Y - pointY) ** 2) < obj1R) {
      return true
    }
  }
  
  return false
}
*/



let main = setInterval(fruitsMove, 1)
alert("Start?")