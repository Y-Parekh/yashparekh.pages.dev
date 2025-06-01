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
//Actually functioning cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
});
//Animates the expand when mouse clicked
document.addEventListener("click", () => {
  cursor.classList.add("expand");
  setTimeout(() => {
    cursor.classList.remove("expand");
  }, 500);
});

//Hovers different colours over different ojects
const cursorInner = document.querySelector('.cursor-inner');
const hoverTargets = [
  { selector: 'a', className: 'hover-link' },
  { selector: 'button', className: 'hover-button' },
  { selector: 'img', className: 'hover-image' },
  { selector: 'input, textarea, select, label', className: 'hover-input' }
];
hoverTargets.forEach(({ selector, className }) => {
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      cursorInner.classList.add(className);
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      cursorInner.classList.remove(className);
    });
  });
});

//Controls colour of the mouse and trail
let hue = 0;
setInterval(() => {
  hue = (hue + 1) % 360;
  document.documentElement.style.setProperty('--hue', hue);
}, 20);

const trailPath = document.querySelector('.trail path');

function updateTrailColor() {
  const startColor = `hsl(${hue}, 100%, 50%)`;
  const startStop = document.querySelector('#gradient-start');
  if (startStop) {
    startStop.setAttribute('stop-color', startColor);
  }
}
setInterval(updateTrailColor, 20);



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

/*gradient colour */
let lastX = 0;
let lastY = 0;
const gradient = document.querySelector('#cursor-gradient');

document.addEventListener('mousemove', (e) => {
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  lastX = e.clientX;
  lastY = e.clientY;

  let angle = Math.atan2(dy, dx) * (180 / Math.PI);
  angle = (angle + 360) % 360;
  angle = (angle + 180) % 360; 

  gradient.setAttribute('gradientTransform', `rotate(${angle}, 0.5, 0.5)`);
});

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
      img.src = "DarkMode.png";
  } else {
      img.src = "LightMode.png";
  }
}



/* Gets rid of mouse trail if on an image/link/button/label/input/textarea/span */

function removeMouseTrail() {
  const cursorInner = document.querySelector('.cursor-inner');
  document.body.classList.remove('hide-trail');
  const interactiveElements = document.querySelectorAll('a, button, img, label, input, textarea, span');

  interactiveElements.forEach(element => {
    element.addEventListener('mouseover', () => {
      cursor.classList.add('hover');
      cursorInner.classList.add('hover');
      cursorInner.classList.remove('unhover'); // just in case
      overInteractive = true;
      document.body.classList.add('hide-trail');
    });
  
    element.addEventListener('mouseout', () => {
      cursor.classList.remove('hover');
      cursorInner.classList.remove('hover');
      cursorInner.classList.add('unhover');
      overInteractive = false;
      document.body.classList.remove('hide-trail');

      // optional: clean up unhover after animation
      setTimeout(() => {
        cursorInner.classList.remove('unhover');
      }, 1000); // should match animation duration
    });
  });
}


removeMouseTrail()

//Toggles Settings menu and rotates picture

let subMenu = document.getElementById("subMenu");
let settingsPic = document.getElementById("settingsPic")

function toggleMenu(){
  subMenu.classList.toggle("open-menu");
  settingsPic.classList.toggle("rotated");
}

document.addEventListener("click", function(event) {
  if (!subMenu.contains(event.target) && !settingsPic.contains(event.target)) {
    subMenu.classList.remove("open-menu");
    settingsPic.classList.remove("rotated");
  }
});

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
    for(let i=0; i<4; i++){
        button1[i].classList.remove("active");
    }
    this.classList.add("active");
}
button1[1].onclick=function(){
    slide.style.transform="translateX(-800px)";
    for(let i=0; i<4; i++){
        button1[i].classList.remove("active");
    }
    this.classList.add("active");
}
button1[2].onclick=function(){
    slide.style.transform="translateX(-1600px)";
    for(let i=0; i<4; i++){
        button1[i].classList.remove("active");
    }
    this.classList.add("active");
}
button1[3].onclick=function(){
    slide.style.transform="translateX(-2400px)";
    for(let i=0; i<4; i++){
        button1[i].classList.remove("active");
    }
    this.classList.add("active");
}


/*Magnetic Button*/
const magnets = document.querySelectorAll('.magnetic');
const strength = 40; // how far it moves (px)

magnets.forEach(magnet => {
  magnet.addEventListener('mousemove', (e) => {
    const rect = magnet.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    // Calculate percentage offset from center (-0.5 to +0.5)
    const moveX = ((offsetX / rect.width) - 0.5) * 2 * strength;
    const moveY = ((offsetY / rect.height) - 0.5) * 2 * strength;

    // Apply transform
    magnet.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  magnet.addEventListener('mouseleave', () => {
    // Smoothly return to original position
    magnet.style.transform = `translate(0, 0)`;
  });
});

//Custom Right Click Menu
const menu = document.getElementById('custom-menu');

document.addEventListener('contextmenu', (e) => {
  e.preventDefault(); // prevent default right-click menu
  menu.style.top = `${e.clientY}px`;
  menu.style.left = `${e.clientX}px`;
  menu.style.display = 'block';
});

document.addEventListener('click', () => {
  menu.style.display = 'none'; // hide on normal click
});

function copyURL() {
  navigator.clipboard.writeText(window.location.href)
    .then(() => alert('📋 URL copied to clipboard!'))
    .catch(err => alert('❌ Failed to copy URL: ' + err));
}
