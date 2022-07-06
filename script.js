const program = { // Object which holds all application functionality

  settings: {

    // How often cells begin their next transition to a new location
    moveEvery: 2000,

  },

  func: { // Array of functions for application function

    // Function to generate necessary DOM elements for application
    createCells: (cellsTotal) => {

        // Function which creates a single cell and appends it to document
        const add = () => { 

          // Create two divs, one outer and one inner
          let div = document.createElement('div')
          let innerDiv = document.createElement('div')

          // Add classes to each div that was generated
          div.classList.add('child')
          innerDiv.classList.add('inner-div')

          // Generate text content for inner div
          innerDiv.textContent = Math.floor(Math.random() * 10)

          // Append divs to respective parents
          document.querySelector('.parent').appendChild(div);
          div.appendChild(innerDiv);

        }

        // Generate cells using above function for as many cells that have been called for
        for(let i = 0; i < cellsTotal; i++) {
          add()
        }

    },

    // Function to update scale of each cell based on mouse position
    interact: (e) => {

      let innerDivs = document.querySelectorAll('.inner-div')
      
      x = e.clientX
      y = e.clientY

      const lerp = (x, y, a) => x * (1 - a) + y * a;
      const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
      const invlerp = (x, y, a) => clamp((a - x) / (y - x));
      const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));

      for(const inner of innerDivs) {

        // Calculate the distance between the mouse position and this specific inner div
        const calculateDistance = (elem, mouseX, mouseY) => { 
          return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.getBoundingClientRect().left+(elem.clientWidth/2)), 2) + Math.pow(mouseY - (elem.getBoundingClientRect().top+(elem.clientHeight/2)), 2)))
        }

        // Use interpolation to determine correct scale values for each cell
        let distance = invlerp(1, 1000, calculateDistance(inner, x, y));

        // Set each cell's transform scale to reflect the distance between the mouse and cell location
        inner.style.transform = 'scale(' + lerp(2, 0.5, distance) + ')';

      }
    },


  }
}

// Initialize 144 cells and append them
program.func.createCells(144)

// Add mouse move interactivity using the Interact function
document.querySelector('.wrapper').addEventListener('mousemove', (e) => {
  program.func.interact(e)
})

// Initialize and repeat random movement of each cell
for(const child of document.querySelectorAll('.child')) {

  setInterval(() => {

    // Calculate random positions on both the X axis and Y axis each time a transition ends
    let xMove = Math.floor(Math.random() * 10);
    let yMove = Math.floor(Math.random() * 10);

    // Set the position of this individual cell to transition to it's new random location
    child.style.transform = 'translateX(' + xMove + 'px) translateY(' + yMove + 'px)'

  }, program.settings.moveEvery);

}

const mobileText = document.querySelector('.mobile-text')

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

setInterval(() => {
  mobileText.style.transform = 'translateX(' + randInt(-1, 1) + 'px) translateY(' + randInt(-1, 1) + 'px)'
},500)