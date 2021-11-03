function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(240);
  let words = "Hello World"
  text("X: "+ mouseX, 0, height/4);
  text("Y: "+ mouseY, 0, height/2);
  if(mouseIsPressed) {
    words = "Pressed"

  }
  text(words, height/2, width/2)
}