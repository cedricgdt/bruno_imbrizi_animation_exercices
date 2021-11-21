class Rectangle {
  constructor({
    x = 0,
    y = 0, 
    width = 10,
    height = 10,
    velocityX = 0,
    velocityY = 0,
    gravity = 0,
    color = 'black'
  }) {
    this.x = x,
    this.y = y,
    this.width = width,
    this.height = height,
    this.velocityX = velocityX,
    this.velocityY = velocityY,
    this.gravity = gravity
    this.color = color
  }

  update(dt) {
    this.velocityY += this.gravity * dt
    this.x += this.velocityX * dt
    this.y += this.velocityY * dt
  }

  render(ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

class Circle {
  constructor ({
    x,
    y,
    radius,
    color,
    gravity
  }) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocityX = 0
    this.velocityY = 0
    this.frictionFactor = 0.5
    this.gravity = gravity
  }

  springTo (target, dt) {
    const speed = dt * 20
    const accelerationX = (target.x - this.x) * speed
    const accelerationY = (target.y - this.y) * speed

    this.velocityX += accelerationX
    this.velocityY += accelerationY

    this.velocityX *= this.frictionFactor
    this.velocityY *= this.frictionFactor

    this.velocityY += this.gravity * dt

    this.x += this.velocityX
    this.y += this.velocityY
  }

  render (ctx) {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
  }
}

export { Rectangle, Circle }