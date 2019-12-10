const canvas = document.querySelector('canvas')
canvas.width = 1000
canvas.height = 600
const ctx = canvas.getContext('2d')

class Ant {
	constructor(x, y, radius, dx, dy, color, mass = 1) {
		this.x = x
		this.y = y
		this.radius = radius
		this.dx = 0.1
		this.dy = 0.1
		this.color = color
		this.mass = mass
	}

	draw = () => {
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false)
		ctx.fillStyle = this.color
		ctx.fill()
		ctx.closePath()
	}

	move = particles => {
		this.edgeDetection()
		this.x += this.dx
		this.y += this.dy
		this.draw()

		for (let i = 0; i < particles.length; i++) {
			if (this === particles[i]) continue

			if (distance(this.x, this.y, particles[i].x, particles[i].y) <= this.radius + particles[i].radius) {
				this.collisionEffect(particles[i])
			}
		}
	}

	edgeDetection = () => {
		if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0)
			this.dx = -this.dx
		if (this.y + this.radius >= canvas.height || this.y - this.radius <= 0)
			this.dy = -this.dy
	}

	rotate = (dx, dy, angle) => {
		return {
			dx: dx * Math.cos(angle) - dy * Math.sin(angle),
			dy: dx * Math.sin(angle) + dy * Math.cos(angle)
		}
	}

	collisionEffect = (otherAnt) => {
		const angle = -Math.atan2(otherAnt.y - this.y, otherAnt.x - this.x)
		const u1 = this.rotate(this.dx, this.dy, angle)
		const u2 = this.rotate(otherAnt.dx, otherAnt.dy, angle)

		const v1 = {
			dx: ((this.mass - otherAnt.mass) * u1.dx / (this.mass + otherAnt.mass)) + (2 * otherAnt.mass * u2.dx / (this.mass + otherAnt.mass)),
			dy: u1.dy
		}

		const v2 = {
			dx: ((this.mass - otherAnt.mass) * u2.dx / (this.mass + otherAnt.mass)) + (2 * otherAnt.mass * u1.dx / (this.mass + otherAnt.mass)),
			dy: u2.dy
		}

		const rotatedv1 = this.rotate(v1.dx, v1.dy, -angle)
		const rotatedv2 = this.rotate(v2.dx, v2.dy, -angle)

		this.dx = rotatedv1.dx
		this.dy = rotatedv1.dy

		otherAnt.dx = rotatedv2.dx
		otherAnt.dy = rotatedv2.dy
	}
}


const randomRange = (min, max) => {
	while (true) {
		let randomNum = Math.floor(Math.random() * (max - min) + min)
		if (randomNum !== 0)
			return randomNum
	}
}

const randomColor = () => {
	let r = randomRange(0, 255)
	let g = randomRange(0, 255)
	let b = randomRange(0, 255)
	let a = Math.random() * (1 - 0.3) + 0.3 // -> for value between 0 - 1

	return `rgba(${r}, ${g}, ${b}, ${a}`
}

const distance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))

let ants = []
const spawnAnts = noOfAnts => {
	for (let i = 0; i < noOfAnts; i++) {
		const radius = randomRange(5, 15)
		let x = randomRange(radius, canvas.width - radius)
		let y = randomRange(radius, canvas.height - radius)

		const properties = [ // -> x, y, r, dx, dy, color, mass
			x,
			y,
			radius,
			randomRange(-3, 3),
			randomRange(-3, 3),
			randomColor(),
		]

		if (i != 0) {
			for (let j = 0; j < i; j++) {
				let d = distance(x, y, ants[j].x, ants[j].y)
				if (d <= radius + ants[j].radius) {
					x = randomRange(radius, canvas.width - radius)
					y = randomRange(radius, canvas.height - radius)
					j = -1
				}
			}
		}

		ants.push(new Ant(...properties))
	}
}

const destruct = ant => {
	const updatedAnts = ants.filter((items, index) => ant !== index)
	ants = updatedAnts
	updateScore(++score)
	if (ants.length == 0)
		swal('Congratulations', 'You Won', 'success')
}


canvas.addEventListener('mousedown', event => {
	let x = event.x;
	let y = event.y;

	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;

	console.log(x, y)

	for (let i = 0; i < ants.length; i++) {
		if (distance(x, y, ants[i].x, ants[i].y) <= ants[i].radius) {
			destruct(i)
		}
	}
})


function animate() {
	requestAnimationFrame(animate)
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	ants.forEach(ant => ant.move(ants))
}

spawnAnts(5)
animate()