var slider = document.getElementById("freq-slider");
var output = document.getElementById("dynamicSet");
var isShow = true
output.innerHTML = slider.value
update=()=>{

output.innerHTML = slider.value;
// Display the default slider value
console.log(slider.value)
}

// Update the current slider value (each time you drag the slider handle)
//let update = () => output.innerHTML = slider.value;

slider.addEventListener('input', update);
slider.addEventListener('input', draw);

/*
 * @name Sine Cosine in 3D
 * @description Sine, cosine and push / pop could be applied in 3D as well.
 */
function setup() {
  createCanvas(710, 400, WEBGL);
}

function draw() {
  background(250);
  rotateY(frameCount * 0.01);

  for (let j = 0; j < 5; j++) {
    push();
    for (let i = 0; i < 80; i++) {
      translate(
        sin(frameCount * 0.001 + j) * 100,
        sin(frameCount * 0.001 + j) * 100,
        i * 0.1
      );
      rotateZ(frameCount * 0.002);
      push();
      sphere(slider.value/20, 6, 4);
      pop();
    }
    pop();
  }
}

