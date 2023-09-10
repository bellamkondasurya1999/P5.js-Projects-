var song;
var amplitude;

var animationState = 0;
var animations = [];

function preload() {
  song = loadSound('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3');
}

function setup() {
  var canvas = createCanvas(800, 400);
  canvas.parent('myCanvas');

  amplitude = new p5.Amplitude();

  // Initialize your animations
  animations[0] = new Animation1();
  animations[1] = new Animation2();
  // Add more animations as needed
}

function draw() {
  background(255);

  // Check if the music is playing
  if (song.isPlaying()) {
    // Get the current amplitude level of the audio
    var level = amplitude.getLevel();

    // Change the animation based on the audio level
    if (level > 0.1) {
      animationState = 1;
    } else {
      animationState = 0;
    }
  }

  // Display the current animation
  animations[animationState].display();
}

function togglePlayback() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.loop();
  }
}

// Define your animation classes

function Animation1() {
  this.display = function() {
    // Draw your animation for state 0
    fill(255, 0, 0);
    ellipse(width / 2, height / 2, 100, 100);
  };
}

function Animation2() {
  this.display = function() {
    // Draw your animation for state 1
    fill(0, 0, 255);
    rectMode(CENTER);
    rect(width / 2, height / 2, 100, 100);
  };
}

// Add more animation classes as needed

var playButton = document.getElementById('playButton');
playButton.addEventListener('click', togglePlayback);
