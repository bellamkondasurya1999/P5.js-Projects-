let rings = [];
let particles = [];
let mic, fft;
let initialDiameters = [];

let isAnimationRunning = true;
let speedSlider, shapeController;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Initialize microphone and FFT
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  // Create hex rings
  for (let i = 0; i < 5; i++) {
    let diameter = i * 30;
    rings.push(new HexRing(width / 2, height / 2, diameter));
    initialDiameters.push(diameter);
  }

  // Create particles
  for (let i = 0; i < 200; i++) {
    particles.push(new Particle(random(width), random(height)));
  }

  // Add button for starting and stopping animation
  const toggleButton = createButton('Toggle Animation');
  toggleButton.position(20, 20);
  toggleButton.mousePressed(toggleAnimation);

  // Add speed slider
  speedSlider = createSlider(0.01, 0.1, 0.05, 0.01);
  speedSlider.position(20, 50);

  // Add shape controller
  shapeController = createSelect();
  shapeController.position(20, 80);
  shapeController.option('Circle');
  shapeController.option('Triangle');
  shapeController.option('Rectangle');
  shapeController.option('Star');
  shapeController.changed(changeParticleShape);
}

function draw() {
  background(0);

  // Get sound amplitude
  let amplitude = mic.getLevel();

  // Update and display hex rings
  for (let i = 0; i < rings.length; i++) {
    let ring = rings[i];
    let diameter = initialDiameters[i] + amplitude * 200;

    if (amplitude > 0) {
      ring.update(diameter);
    }

    ring.display();
  }

  // Update and display particles
  for (let particle of particles) {
    particle.update(speedSlider.value());
    particle.display();
  }
}

function toggleAnimation() {
  isAnimationRunning = !isAnimationRunning;
  if (isAnimationRunning) {
    loop();
  } else {
    noLoop();
  }
}

function mousePressed() {
  changeRingColor();
}

function changeRingColor() {
  for (let ring of rings) {
    ring.changeColor();
  }
}

function changeParticleShape() {
  const shape = shapeController.value();
  for (let particle of particles) {
    particle.changeShape(shape);
  }
}

class HexRing {
  constructor(x, y, diameter) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.angle = 0;
    this.rotationSpeed = random(-0.02, 0.02);
    this.color = color(255, 255, 0);
  }

  update(diameter) {
    this.diameter = diameter;
    this.angle += this.rotationSpeed;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    noFill();
    stroke(this.color);
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < 6; i++) {
      let angle = TWO_PI * i / 6;
      let px = cos(angle) * this.diameter / 2;
      let py = sin(angle) * this.diameter / 2;
      vertex(px, py);
    }
    endShape(CLOSE);
    pop();
  }

  changeColor() {
    this.color = color(random(255), random(255), random(255));
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.color = color(255); // Set color to white
    this.shape = 'Circle';
  }

  update(speed) {
    this.x += this.velocity.x * speed;
    this.y += this.velocity.y * speed;

    // Wrap around the canvas
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }

  display() {
    let size = 5;
    fill(this.color);
    noStroke();

    if (this.shape === 'Circle') {
      ellipse(this.x, this.y, size, size);
    } else if (this.shape === 'Triangle') {
      triangle(this.x, this.y - size, this.x - size, this.y + size, this.x + size, this.y + size);
    } else if (this.shape === 'Rectangle') {
      rectMode(CENTER);
      rect(this.x, this.y, size, size);
    } else if (this.shape === 'Star') {
      const angle = TWO_PI / 5;
      beginShape();
      for (let a = 0; a < TWO_PI; a += angle) {
        let sx = this.x + cos(a) * size;
        let sy = this.y + sin(a) * size;
        vertex(sx, sy);
        sx = this.x + cos(a + angle / 2) * (size / 2);
        sy = this.y + sin(a + angle / 2) * (size / 2);
        vertex(sx, sy);
      }
      endShape(CLOSE);
    }
  }

  changeShape(shape) {
    this.shape = shape;
  }
}

// Resize canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
