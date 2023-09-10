let mic;
let amplitude;
let circleSize = 50;
let circleX, circleY;
let isSound = false;

// Array to store the scattered pieces
let pieces = [];

// Custom color palette with shades of white
let colors = [
  [255, 255, 255],    // White
  [230, 230, 230],    // Light gray
  [200, 200, 200],    // Gray
  [180, 180, 180],    // Dark gray
  [150, 150, 150],    // Very dark gray
];

function setup() {
  createCanvas(400, 400);
  background(0); // Set black background

  mic = new p5.AudioIn();
  mic.start();

  amplitude = new p5.Amplitude();
  amplitude.setInput(mic);

  circleX = width / 2; // Initial x-position of the shape
  circleY = height / 2; // Initial y-position of the shape
}

function draw() {
  background(0);

  let level = amplitude.getLevel();

  // Define color ranges based on audio level
  let colorLow = colors[0];    // White for low audio level
  let colorMid = colors[2];    // Gray for medium audio level
  let colorHigh = colors[4];   // Very dark gray for high audio level

  let circleColor;

  if (level < 0.3) {
    // Use low color for low audio level
    circleColor = colorLow;
  } else if (level < 0.6) {
    // Use mid color for medium audio level
    circleColor = colorMid;
  } else {
    // Use high color for high audio level
    circleColor = colorHigh;
  }

  fill(circleColor);

  if (level > 0.01) {
    // Draw a shape based on sound level
    let mappedShape = map(level, 0, 1, 0, 2);
    let currentShape = Math.floor(mappedShape);

    switch (currentShape) {
      case 0:
        circle(circleX, circleY, circleSize);
        break;
      case 1:
        ellipse(circleX, circleY, circleSize, circleSize * 0.8);
        break;
      case 2:
        star(circleX, circleY, 5, circleSize / 2, circleSize / 4);
        break;
    }

    isSound = true;
  } else {
    // Scatter into small pieces when there is no sound
    if (isSound) {
      // Store the scattered pieces
      scatter(circleX, circleY, circleSize);
      isSound = false;
    }

    // Draw the scattered pieces
    displayPieces();
  }
}

// Function to draw a star shape
function star(x, y, numPoints, outerRadius, innerRadius) {
  let angle = TWO_PI / numPoints;
  let halfAngle = angle / 2;

  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * outerRadius;
    let sy = y + sin(a) * outerRadius;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * innerRadius;
    sy = y + sin(a + halfAngle) * innerRadius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// Scatter the shape into small pieces
function scatter(x, y, size) {
  pieces = [];

  for (let i = 0; i < size; i++) {
    let px = x + random(-size / 2, size / 2);
    let py = y + random(-size / 2, size / 2);
    let pSize = random(5, 10);
    let pSpeed = random(1, 3);
    let pDirection = p5.Vector.random2D();
    let pColor = colors[Math.floor(random(colors.length))];  // Assign a random color from the array

    pieces.push({
      x: px,
      y: py,
      size: pSize,
      speed: pSpeed,
      direction: pDirection,
      color: pColor
    });
  }
}

// Display the scattered pieces
function displayPieces() {
  for (let i = 0; i < pieces.length; i++) {
    let piece = pieces[i];
    fill(piece.color[0], piece.color[1], piece.color[2]);
    ellipse(piece.x, piece.y, piece.size, piece.size);
    updatePiece(piece); // Call the updatePiece function to update the piece's position
  }
}

// Update the piece's position
function updatePiece(piece) {
  piece.x += piece.speed * piece.direction.x;
  piece.y += piece.speed * piece.direction.y;
}
