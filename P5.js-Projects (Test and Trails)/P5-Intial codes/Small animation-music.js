var x, y; // Position of the shape
var angle = 0; // Rotation angle
var rotationSpeed = 0.05; // Speed of rotation
var size = 100; // Size of the shape
var backgroundMusic;

function preload() {
  backgroundMusic = loadSound('http://commondatastorage.googleapis.com/codeskulptor-assets/Evillaugh.ogg');
}

function setup() {
  createCanvas(400, 400);
  x = width / 2;
  y = height / 2;
  backgroundMusic.loop();
}

function draw() {
  background(51);

  // Update position and rotation
  x += random(-2, 2);
  y += random(-2, 2);
  angle += rotationSpeed;

  // Set fill and stroke colors
  fill(255, 204, 0);
  stroke(255);

  // Apply translation and rotation
  translate(x, y);
  rotate(angle);

  // Draw the shape
  beginShape();
  vertex(-size / 2, -size / 2);
  vertex(size / 2, -size / 2);
  vertex(size / 2, size / 2);
  vertex(-size / 2, size / 2);
  endShape(CLOSE);
}
