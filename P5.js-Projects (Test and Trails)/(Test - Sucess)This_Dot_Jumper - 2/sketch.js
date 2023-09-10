let score = 0;
let scroll = 10;
let scrollBg = 0;
let runner;
let particles = [];
let cloudImages = [];
let backgroundImg;
let protonImg, neutronImg, quantImg, badImg;
let restart = false;

function preload() {
  backgroundImg = loadImage('bg.jpg');
  cloudImages.push(loadImage('cloud1.png'));
  cloudImages.push(loadImage('cloud2.png'));
  cloudImages.push(loadImage('cloud3.png'));
  protonImg = loadImage('proton.png');
  neutronImg = loadImage('neutron.png');
  quantImg = loadImage('quant.png');
  badImg = loadImage('bad.png');
}

function setup() {
  createCanvas(700, 400);
  runner = new Runner();
  
  createP('Controls: ')
  createP('Space to jump. It\'s really that simple!')
  createP('<hr>');
  createP('Plot:');
  createP('Quantum Particle Runner is an exciting game where you control the runner who travels along the quantum path. The path is filled with particles like protons, neutrons, quants, and bad particles. When the runner collides with these particles, interesting things happen. Colliding with protons enlarges the runner, neutrons turn the cloud into blue, quants turn the cloud into gold, and bad particles decrease the size of the runner. Be careful and navigate through the quantum world with precision!')
  createP('<hr>');
}

function keyPressed() {
  if (restart) {
    restartGame();
  }
  if (key == ' ') {
    runner.jump();
    return false;
  }
}

function restartGame() {
  restart = false;
  score = 0;
  scrollBg = 0;
  scroll = 10;
  particles = [];
  loop();
}

function draw() {
  image(backgroundImg, -scrollBg, 0, width, height);
  image(backgroundImg, -scrollBg + width, 0, width, height);

  if (scrollBg > width) {
    scrollBg = 0;
  }

  if (random(1) < 0.75 && frameCount % 50 == 0) {
    particles.push(new Particle());
  }

  if (frameCount % 5 == 0) {
    score++;
  }

  fill(255);
  textSize(32);
  textFont('monospace');
  text(`Score: ${score}`, 10, 30);

  for (let i = particles.length - 1; i >= 0; i--) {
    let particle = particles[i];
    particle.move();
    particle.show();

    if (runner.collide(particle)) {
      handleCollision(particle);
    }

    if (particle.isOffScreen()) {
      particles.splice(i, 1);
    }
  }

  runner.show();
  runner.move();

  scroll += 0.005;
  scrollBg += scroll / 5;
}

function handleCollision(particle) {
  if (particle.type === 'proton') {
    runner.enlarge();
    particle.turnIntoCloud('red');
  } else if (particle.type === 'neutron') {
    particle.turnIntoCloud('blue');
  } else if (particle.type === 'quant') {
    particle.turnIntoCloud('gold');
  } else if (particle.type === 'bad') {
    runner.shrink();
    particle.turnIntoCloud('black');
  }
  particle.isCollided = true;
  if (!runner.isShrinking) {
    score++;
  }
  if (runner.isShrinking && runner.size <= 0) {
    gameOver();
  }
}

function gameOver() {
  noLoop();
  fill(255);
  textSize(24);
  text(`Game Over! Press any key to restart`, 45, height / 2);
  restart = true;
}

class Runner {
  constructor() {
    this.size = 50;
    this.x = 50;
    this.y = height - this.size;
    this.vy = 0;
    this.gravity = 2;
    this.isShrinking = false;
  }

  move() {
    this.y += this.vy;
    this.vy += this.gravity;
    this.y = constrain(this.y, 0, height - this.size);
  }

  jump() {
    if (this.y == height - this.size) {
      this.vy = -32;
    }
  }

  collide(particle) {
    let hitX = this.x + this.size > particle.x && this.x < particle.x + particle.size;
    let hitY = this.y + this.size > particle.y && this.y < particle.y + particle.size;
    return hitX && hitY;
  }

  enlarge() {
    this.size += 10;
  }

  shrink() {
    this.isShrinking = true;
    this.size -= 10;
    this.size = max(0, this.size);
  }

  show() {
    fill(255, 127);
    ellipse(this.x + this.size / 2, this.y + this.size / 2, this.size);
  }
}

class Particle {
  constructor() {
    this.size = 30;
    this.x = width;
    this.y = random(height - this.size);
    this.type = random(['proton', 'neutron', 'quant', 'bad']);
    this.cloudImg = null;
    this.isCollided = false;
  }

  move() {
    this.x -= scroll;
  }

  isOffScreen() {
    return this.x + this.size < 0;
  }

  turnIntoCloud(color) {
    this.cloudImg = cloudImages[color];
  }

  show() {
    if (this.cloudImg) {
      image(this.cloudImg, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    } else {
      let particleImg;
      if (this.type === 'proton') {
        particleImg = protonImg;
      } else if (this.type === 'neutron') {
        particleImg = neutronImg;
      } else if (this.type === 'quant') {
        particleImg = quantImg;
      } else if (this.type === 'bad') {
        particleImg = badImg;
      }
      image(particleImg, this.x, this.y, this.size, this.size);
    }
  }
}
