function setup() {
  createCanvas(400, 400);
  newText = new Text("Hello World", new Vector2(width/2, height/2))
  mousePositionText = new Text("", new Vector2(50, 150));
  myBox = new DragBox(new Vector2(100, 200), new Vector2(100, 100), new Vector2(0.5, 0.5));
}

function draw() {
  background(240);
  mousePosition = new Vector2(mouseX, mouseY)
  mousePositionText.currentWords = "X: " + mousePosition.x + "\nY: " + mousePosition.y

  if(mouseIsPressed) {
    newText.currentWords = "Pressed"

    if(myBox.CheckOverlap(mousePosition) == true) {
      newText.currentWords = "Overlap"      
      myBox.position = mousePosition
    }
  }
  
  myBox.Render();
  newText.Render();
  mousePositionText.Render()

}