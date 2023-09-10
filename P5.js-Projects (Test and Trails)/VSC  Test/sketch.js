let osc;
let isSoundPlaying = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  osc = new p5.Oscillator();
}

function draw() {
  background(220);
  
  if (isSoundPlaying) {
    // Visual feedback when the sound is playing
    fill('red');
    ellipse(mouseX, mouseY, 50, 50);
  }
}

function startSound() {
  if (!isSoundPlaying) {
    isSoundPlaying = true;
    osc.start();
    osc.amp(0.5);
    osc.freq(440);
  } else {
    isSoundPlaying = false;
    osc.stop();
  }
}
