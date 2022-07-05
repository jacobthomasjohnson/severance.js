const parent = document.querySelector('.parent')

const add = () => { // Add a single cell to table
  let div = document.createElement('div')
  div.classList.add('child')
  div.textContent = Math.floor(Math.random() * 10)
  parent.appendChild(div);
}

const createCells = (cellsTotal) => { // Generate entire table
  for(let i = 0; i < cellsTotal; i++) {
    add()
  }
}

createCells(120) // Generate a table with 120 cells

parent.addEventListener('mousemove', (e) => {
  let children = document.querySelectorAll('.child')
  x = e.clientX
  y = e.clientY
  const lerp = (x, y, a) => x * (1 - a) + y * a;
  const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
  const invlerp = (x, y, a) => clamp((a - x) / (y - x));
  const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));
  for(const child of children) {
      const calculateDistance = (elem, mouseX, mouseY) => { 
        /* Calculate distance from this child to mouse position */
        return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.getBoundingClientRect().left+(elem.clientWidth/2)), 2) + Math.pow(mouseY - (elem.getBoundingClientRect().top+(elem.clientHeight/2)), 2)))
      }
      let distance = calculateDistance(child, x, y);
      let perc = invlerp(1,1000,distance);
      let bound = child.getBoundingClientRect();
      child.style = 'font-size: ' + lerp(55, 12, perc) + 'px';
  }
})



