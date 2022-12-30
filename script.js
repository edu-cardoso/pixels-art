const colorPalette = document.getElementsByClassName('color')
const boardSizeInput = document.getElementById('board-size')
const generateBoardBtn = document.getElementById('generate-board')

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

const randomColorBtn = document.getElementById('button-random-color')
randomColorBtn.addEventListener('click', randomColorPalette)

const pixelBoard = document.getElementById('pixel-board')

function createLine(size) {
  const line = document.createElement('li')
  line.className = 'line'
  pixelBoard.appendChild(line)
  for (let i = 0; i < size; i++) {
    const pixel = document.createElement('div')
    pixel.className = 'pixel'
    line.appendChild(pixel)
  }
}

function createColumn(size) {
  for (let i = 0; i < size; i++) {
    createLine(12)
  }
  paintPixel()
}

const pixels = document.getElementsByClassName('pixel')

function paintPixel() {
  for (let pixel of pixels) {
    pixel.addEventListener('click', () => {
      pixel.style.backgroundColor = document.querySelector('.selected').style.backgroundColor
    })
  }
}

paintPixel()


generateBoardBtn.addEventListener('click', () => {
  if (boardSizeInput.value !== '') {
    const gridSizeDB = localStorage.setItem('boardsize', boardSizeInput.value) 
  }
})


const savedGridSize = localStorage.getItem('boardsize')

function savedBoardSize() {
  if (localStorage.boardsize !== null) {
    pixelBoard.innerHTML = ''
    for (let i = 0; i < savedGridSize; i++) {
      createLine(savedGridSize)
    }
  }
  paintPixel()
}

if (!localStorage.boardsize) {
  createColumn(12)
} else {
  savedBoardSize()
}

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

function clearBoard() {
  const clearBoardBtn = document.getElementById('clear-board')
  clearBoardBtn.addEventListener('click', () => {
    localStorage.removeItem('pixelBoard')
    for (let pixel of pixels) {
      pixel.style.backgroundColor = 'white'
    }
  })
}

clearBoard()

function createNewBoard() {
  generateBoardBtn.addEventListener('click', () => {
    localStorage.removeItem('pixelBoard')
    if (boardSizeInput.value === '') {
      alert('Board inválido!')
    }
    if (boardSizeInput.value >= 10 && boardSizeInput.value <= 20) {
      pixelBoard.innerHTML = ''
      for (let i = 0; i < boardSizeInput.value; i++) {
        createLine(boardSizeInput.value)
      }
      boardSizeInput.value = ''
      paintPixel()
    }
  })
}

createNewBoard()

let arrOfColors = []

function setItem(item) {
  arrOfColors.push(item)
  setItemOnDB()
}

function setItemOnDB() {
  localStorage.setItem('colors', JSON.stringify(arrOfColors))
}

randomColorBtn.addEventListener('click', () => {
  arrOfColors = []
  for (let color of colorPalette) {
    setItem(color.style.backgroundColor)
  }
})

function getSavedColors() {
  const savedColors = JSON.parse(localStorage.getItem('colors'))
  for (let i = 0; i < savedColors.length; i++) {
    colorPalette[i].style.backgroundColor = savedColors[i]
  }
}

getSavedColors()

let arrOfPixelColor = []

function savePixelColor() {
  const saveBoardBtn = document.getElementById('save-board')
  saveBoardBtn.addEventListener('click', () => {
    arrOfPixelColor = []
    for (let pixel of pixels) {
      arrOfPixelColor.push(pixel.style.backgroundColor)
    }
    localStorage.setItem('pixelBoard', JSON.stringify(arrOfPixelColor))
  })
}

savePixelColor()

function recoverPixelColor() {
  const pixelSavedColors = JSON.parse(localStorage.getItem('pixelBoard'))
  for (let i = 0; i < pixels.length; i++) {
    pixels[i].style.backgroundColor = pixelSavedColors[i]
  }
}

recoverPixelColor()













































