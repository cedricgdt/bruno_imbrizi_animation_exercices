import {Rectangle} from "./class.js"
import { getRandomRGBColor } from "./library.js"

// ------- Basic Initialization -------
const CANVAS_WIDTH = window.innerWidth
const CANVAS_HEIGHT = window.innerHeight
const canvas = document.getElementById('canvas')
const dpr = devicePixelRatio
canvas.width = CANVAS_WIDTH * devicePixelRatio
canvas.height = CANVAS_HEIGHT * devicePixelRatio
canvas.style.setProperty('width', CANVAS_WIDTH + 'px')
canvas.style.setProperty('height', CANVAS_HEIGHT + 'px')
const ctx = canvas.getContext('2d')


// ------- Project Initialization -------
const width = canvas.width / 2
const height = canvas.height / 2

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, width, height);
ctx.fillStyle = "black"

const cx = width //* 0.5
const cy = height //* 0.5
const w = width * 0.01
const h = height * 0.1
let x,y;
const num = 24
// const num = randomRange(15, 30)
const radius = width * 0.3

const scales = []
const lineWidths = []
const radiuss = []
const slices = []

for (let i = 0; i < num; i++) {
  scales[i] = []
  slices[i] = []
  scales[i][0] = randomRange(0.1, 2)
  scales[i][1] = randomRange(0.2, 0.5)
  lineWidths[i] = randomRange(8, 20)
  radiuss[i] = randomRange(0.7, 1.3)
  slices[i][0] = randomRange(0, -5)
  slices[i][1] = randomRange(0, 5)
  slices[i][2] = Math.round(randomRange(0, 1))
}

console.log(slices[0])

let oldTime = 0

requestAnimationFrame(drawFrame)

// ------- Render Loop -------
function drawFrame (ts) {
  ts /= 1000
  const dt = ts - oldTime
  oldTime = ts

  // clear our canvas contents
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < num; i++) {
    const slice = degToRad(360 / num)
    const angle = slice * i
  
    x = cx + radius * Math.sin(angle)
    y = cy + radius * Math.cos(angle)
  
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(-angle)
    ctx.scale(scales[i][0], scales[i][1])
  
    ctx.beginPath()
    ctx.rect(-w * 0.5, -h * 0.5, w, h)
    ctx.fill()
    ctx.restore()
  
    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate(-angle)
  
    ctx.lineWidth = lineWidths[i]

    changeSlices(slices, dt)
  
    ctx.beginPath()
    ctx.arc(0, 0, radius * radiuss[i], slice * slices[i][0], slice * slices[i][1])
    ctx.stroke()
  
    ctx.restore()
  
  }

  requestAnimationFrame(drawFrame)
}

function changeSlices() {
  slices.forEach((slice, i) => {
    if (slice[2]) {
      slice[0] = slice[0] + 0.005
      slice[1] = slice[1] + 0.005
      if (slice[1] > 10) {
        slice[2] = 0
      }
    } else {
      slice[0] = slice[0] - 0.005
      slice[1] = slice[1] - 0.005
      if (slice[0] < -10) {
        slice[2] = 1
      }
    }

    if (scales[i][2]) {
      scales[i][0] = scales[i][0] + 0.0005
      scales[i][1] = scales[i][1] + 0.0005
      if (scales[i][1] > 0.7) {
        scales[i][2] = 0
      }
    } else {
      scales[i][0] = scales[i][0] - 0.0005
      scales[i][1] = scales[i][1] - 0.0005
      if (scales[i][0] < 0.7) {
        scales[i][2] = 1
      }
    }

  });
}

function degToRad(deg) {
  return deg / 180 * Math.PI
}

function randomRange(min, max) {
  return Math.random() * (max - min) + min
}