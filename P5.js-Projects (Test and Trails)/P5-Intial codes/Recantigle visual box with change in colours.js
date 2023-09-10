let mic;
let amplitude;
let rectSize = 50;

function setup() {
  createCanvas(400, 400);

  mic = new p5.AudioIn();
  mic.start();

  amplitude = new p5.Amplitude();
  amplitude.setInput(mic);
}

function draw() {
  background(220);

  let level = amplitude.getLevel();

  // Define color ranges based on audio level
  let colorLow = color(242, 123, 12); // #f27b0c for low audio level
  let colorMid = color(12, 242, 123); // #0cf27b for medium audio level
  let colorHigh = color(200, 12, 242); // #c80cf2 for high audio level

  let rectColor;

  if (level < 0.1) {
    // Use low color for low audio level
    rectColor = colorLow;
  } else if (level < 0.2) {
    // Use mid color for medium audio level
    rectColor = colorMid;
  } else {
    // Use high color for high audio level
    rectColor = colorHigh;
  }

  fill(rectColor);

  let rectWidth = map(level, 0, 1, rectSize, width - rectSize);
  let rectHeight = map(level, 0, 1, rectSize, height - rectSize);

  let rectX = (width - rectWidth) / 2;
  let rectY = (height - rectHeight) / 2;

  rect(rectX, rectY, rectWidth, rectHeight);
}
