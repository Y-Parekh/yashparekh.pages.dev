document.body.style.cursor = 'none';

/* Gets rid of custom cursor if touchscreen */
function detectTouchDevice() {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
    document.body.classList.add("hide-trail")
    document.body.classList.add("hide-cursor")
    document.body.classList.add("touchscreen")
  }
}
window.addEventListener('load', detectTouchDevice);

/* Custom Cursor */
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e=> {
  cursor.setAttribute('style', `top: ${e.clientY-10}px; left: ${e.clientX-10}px`);
})

document.addEventListener("click", () =>{
  cursor.classList.add("expand");
  setTimeout(()=>{
    cursor.classList.remove("expand");
  }, 500)
})



/* Fade in and out */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        entry.target.classList.remove('not-in-view');
      } else {
        entry.target.classList.remove('in-view');
        entry.target.classList.add('not-in-view');
      }
    });
  },
  {
    rootMargin: '0px',
    threshold: [0.1],
  }
);

const tags = document.querySelectorAll('section');

tags.forEach((tag) => {
  observer.observe(tag);
});


/* Mouse Trail */
const svg = document.querySelector("svg.trail")
const path = svg.querySelector("path")
let points = []
let segments = 30
let mouse = {
  x: 0,
  y: 0
}
const move = (event) => {
  const x = event.clientX
  const y = event.clientY
  mouse.x = x
  mouse.y = y
  if(points.length === 0) {
    for (let i = 0; i < segments; i++) {
      points.push({
        x: x,
        y: y,
      })
    }
  }
}

const anim = () => {
  let px = mouse.x
  let py = mouse.y
  points.forEach((p, index) => {
    p.x = px
    p.y = py
    let n = points[index + 1]
    if (n){
      px = px - (p.x -n.x)*0.3
      py = py - (p.y -n.y)*0.3
    }
  })
  path.setAttribute("d", `M ${points.map(p => `${p.x} ${p.y}`).join(` L `)}`)
  requestAnimationFrame(anim)
}

const resize = () => {
  const ww = window.innerWidth
  const wh = window.innerHeight

  svg.style.width = ww + "px"
  svg.style.height = wh + "px"
  svg.setAttribute("viewBox", `0 0 ${ww} ${wh}`)
}
document.addEventListener("mousemove", move)
window.addEventListener("resize", resize)
resize()
anim()


/* Toggles custom mouse and auto */
function toggleMouse() {
  if (document.body.classList.contains('hide-cursor')) {
    document.body.classList.remove('hide-cursor');
    document.body.style.cursor = 'none'
  } else {
    document.body.classList.add('hide-cursor');
    document.body.style.cursor = 'auto';
  }
}

/* Toggles mouse trail */
function toggleMouseTrail() {
  if (document.body.classList.contains('hiden-trail')) {
    document.body.classList.remove('hiden-trail');
  } else {
    document.body.classList.add('hiden-trail');
  }
}


function togglebackground(){
  document.body.classList.toggle('light-mode');
  var img = document.getElementById('background');
  var currentSrc = img.src.split('/').pop();
  var nav = document.getElementById('desktop-nav');
  if (currentSrc === "LightMode.png") {
      img.src = "./assets/DarkMode.png";
  } else {
      img.src = "./assets/LightMode.png";
  }
}


function togglelight(){
  document.body.classList.remove("darkmode");
  document.body.classList.add("lightmode");
  const button = document.getElementbyId("dark_mode_icon");
  button.style.display = "none"
  var item = document.getElementById(itemId);
  button.parentNode.removeChild(button);

}


function toggledark(){
  document.body.classList.remove("lightmode");
  document.body.classList.add("darkmode");
}


/* Gets rid of mouse trail if on an image/link/button */
function removeMouseTrail(){
  document.body.classList.remove('hide-trail');
  var interactiveElements = document.querySelectorAll('a, button, img, label, input, textarea, span');
  interactiveElements.forEach(element => {
    element.addEventListener('mouseover', () => {
      cursor.classList.add('hover');
      overInteractive = true;
      document.body.classList.add('hide-trail');
    });
    element.addEventListener('mouseout', () => {
      cursor.classList.remove('hover');
      overInteractive = false;
      document.body.classList.remove('hide-trail');
    });
  });
}

removeMouseTrail()

let subMenu = document.getElementById("subMenu");
let settingsPic = document.getElementById("settingsPic")

    function toggleMenu(){
        subMenu.classList.toggle("open-menu");
        settingsPic.classList.toggle("rotated");
    }

    const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});




var button1 = document.getElementsByClassName("button-1");
var slide = document.getElementById("slide");
var r_arrow = document.getElementsByClassName("right")
var l_arrow = document.getElementsByClassName("left")

button1[0].onclick=function(){
    slide.style.transform="translateX(0px)";
    for(i=0;i<4;i++){
        button1[i].classList.remove("active");
    }
    this.classList.add("active");
}
button1[1].onclick=function(){
    slide.style.transform="translateX(-800px)";
    for(i=0;i<4;i++){
        button1[i].classList.remove("active");
    }
    this.classList.add("active");
}
button1[2].onclick=function(){
    slide.style.transform="translateX(-1600px)";
    for(i=0;i<4;i++){
        button1[i].classList.remove("active");
    }
    this.classList.add("active");
}
button1[3].onclick=function(){
    slide.style.transform="translateX(-2400px)";
    for(i=0;i<4;i++){
        button1[i].classList.remove("active");
    }
    this.classList.add("active");
}

