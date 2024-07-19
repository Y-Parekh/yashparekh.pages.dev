
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
document.body.classList.remove('hide-trail');
     const interactiveElements = document.querySelectorAll('a, button, img');
  
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

function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

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


  path.setAttribute("d", `M  ${points.map(p => `${p.x} ${p.y}`).join(` L `)}`)
  
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