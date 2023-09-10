let mic;
let fft;
let particles = [];
let hexagons = [];
let bgColor;

function setup() {
  createCanvas(800, 600);

  // Create the microphone input
  mic = new p5.AudioIn();
  mic.start();

  // Create the FFT analyzer
  fft = new p5.FFT();
  fft.setInput(mic);

  // Create hexagons
  createHexagons();

  // Set initial background color
  bgColor = color(0, 0, 0);
}

function draw() {
  background(bgColor);

  // Analyze the audio and get frequency spectrum
  let spectrum = fft.analyze();

  // Update hexagons and particles based on audio
  updateHexagons(spectrum);
  updateParticles(spectrum);

  // Draw hexagons and particles
  drawHexagons();
  drawParticles();
}

function createHexagons() {
  const numHexagons = 50;
  const hexSize = 50;
  const padding = 10;

  for (let i = 0; i < numHexagons; i++) {
    const x = random(padding, width - padding);
    const y = random(padding, height - padding);

    const hexagon = {
      x: x,
      y: y,
      size: hexSize,
      rotation: random(TWO_PI),
      color: color(random(255), random(255), random(255), 100),
    };

    hexagons.push(hexagon);
  }
}

function updateHexagons(spectrum) {
  const minHexSize = 10;
  const maxHexSize = 200;

  for (let i = 0; i < hexagons.length; i++) {
    const hexagon = hexagons[i];

    // Update hexagon size based on the average spectrum value
    const index = Math.floor(map(i, 0, hexagons.length, 0, spectrum.length));
    const size = map(spectrum[index], 0, 255, minHexSize, maxHexSize);
    hexagon.size = size;

    // Update hexagon rotation
    hexagon.rotation += 0.01;
  }
}

function drawHexagons() {
  for (let i = 0; i < hexagons.length; i++) {
    const hexagon = hexagons[i];

    push();
    translate(hexagon.x, hexagon.y);
    rotate(hexagon.rotation);
    drawHexagon(hexagon.size, hexagon.color);
    pop();
  }
}

function drawHexagon(size, color) {
  beginShape();
  for (let i = 0; i < 6; i++) {
    const angle = i * TWO_PI / 6;
    const x = size * cos(angle);
    const y = size * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);
}

function updateParticles(spectrum) {
  const numParticles = 200;

  for (let i = 0; i < numParticles; i++) {
    let particle;

    if (particles.length <= i) {
      // Create new particle
      const x = random(width);
      const y = random(height);
      const size = random(2, 8);
      const shape = random(["circle", "triangle", "rect"]);

      particle = {
        x: x,
        y: y,
        size: size,
        rotation: random(TWO_PI),
        shape: shape,
        color: color(255),
      };

      particles.push(particle);
    } else {
      particle = particles[i];
    }

    // Update particle properties based on audio
    const index = Math.floor(map(i, 0, numParticles, 0, spectrum.length));
    const brightness = map(spectrum[index], 0, 255, 0, 1);
    particle.color = color(255 * brightness);
  }
}

function drawParticles() {
  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];

    push();
    translate(particle.x, particle.y);
    rotate(particle.rotation);

    fill(particle.color);
    noStroke();

    if (particle.shape === "circle") {
      ellipse(0, 0, particle.size);
    } else if (particle.shape === "triangle") {
      triangle(0, -particle.size / 2, -particle.size / 2, particle.size / 2, particle.size / 2, particle.size / 2);
    } else if (particle.shape === "rect") {
      rectMode(CENTER);
      rect(0, 0, particle.size, particle.size);
    }

    pop();
  }
}
