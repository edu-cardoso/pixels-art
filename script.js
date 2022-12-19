const colorPalette = document.getElementsByClassName('color')

function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function randomColorPalette() {
  for (let i = 1; i < colorPalette.length; i++) {
    colorPalette[i].style.backgroundColor = generateRandomColor()
  }
}

randomColorPalette()

const randomColorBtn = document.getElementById('button-random-color')
randomColorBtn.addEventListener('click', randomColorPalette)

const pixelBoard = document.getElementById('pixel-board')

function createLine() {
  const line = document.createElement('li')
  line.className = 'line'
  pixelBoard.appendChild(line)
  for (let i = 0; i < 12; i++) {
    const pixel = document.createElement('div')
    pixel.className = 'pixel'
    line.appendChild(pixel)
  }
}

function createColumn() {
  for (let i = 0; i < 12; i++) {
    createLine()
  }
}

createColumn()

function addSelectedClass() {
  for (let color of colorPalette) {
    color.addEventListener('click', () => {
      const selected = document.querySelector('.selected')
      if (selected) {
        selected.classList.remove('selected')
      }
      color.classList.add('selected')
    })
  }
}

addSelectedClass()

const pixels = document.getElementsByClassName('pixel')

function paintPixel() {
  for (let pixel of pixels) {
    pixel.addEventListener('click', () => {
      pixel.style.backgroundColor = document.querySelector('.selected').style.backgroundColor
    })
  }
}

paintPixel()

function clearBoard() {
  const clearBoardBtn = document.getElementById('clear-board')
  clearBoardBtn.addEventListener('click', () => {
    for (let pixel of pixels) {
      pixel.style.backgroundColor = 'white'
    }
  })
}

clearBoard()

















