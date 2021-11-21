function getRandomRGBColor() {
  const randomR = Math.random() * 255
  const randomG = Math.random() * 255
  const randomB = Math.random() * 255
  return `rgba(${randomR}, ${randomG} , ${randomB})`
}

function checkBoundaries (rect) {
  if (rect.x > canvas.width - rect.width) {
    rect.velocityX *= -1
  } else if (rect.x < 0) {
    rect.velocityX *= -1
  }
  if (rect.y > canvas.height - rect.height) {
    rect.velocityY *= -1
    rect.y = canvas.height - rect.height
    rect.velocityY *= 0.5
  } else if (rect.y < 0) {
    rect.velocityY *= -1
  }  
}

function checkHitTest(rectA, rectB) {
  const isHit = !(
    rectA.x + rectA.width < rectB.x ||
    rectB.x + rectB.width < rectA.x ||
    rectA.y + rectA.height < rectB.y ||
    rectB.y + rectB.height < rectA.y
  )
  return isHit
}

function createBox () {
  const width = Math.random() * 50 + 20
  const height = Math.random() * 50 + 20
  const box = new Rectangle({
    x: Math.random() * canvas.width,
    y: -height,
    width,
    height,
    color: getRandomRGBColor()
  })
  boxes.push(box)
  return box
}

export { getRandomRGBColor, checkBoundaries, checkHitTest, createBox }