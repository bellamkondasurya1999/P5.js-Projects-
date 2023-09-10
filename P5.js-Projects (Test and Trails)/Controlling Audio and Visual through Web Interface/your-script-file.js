let mic;
let fft;
let hexagons = [];
let bgColor;
let isAudioPlaying = false;

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

  if (isAudioPlaying) {
    // Analyze the audio and get frequency spectrum
    let spectrum = fft.analyze();

    // Update hexagons based on audio
    updateHexagons(spectrum);
  }

  // Draw hexagons
  drawHexagons();
}

function createHexagons() {
  // ... (same as before)
}

function updateHexagons(spectrum) {
  // ... (same as before)
}

function drawHexagons() {
  // ... (same as before)
}

function toggleAudio() {
  if (isAudioPlaying) {
    mic.stop();
    isAudioPlaying = false;
  } else {
    mic.start();
    isAudioPlaying = true;
  }
}

function changeBgColor(value) {
  bgColor = color(value);
}
