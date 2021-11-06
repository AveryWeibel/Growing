function setup() {
  //Create gameobjects
  createCanvas(1024, 512);
  this.newText = new Text("Hello World", new Vector2(width/2, height/2))
  mousePositionText = new Text("", (50, 150));
  box1 = new Rectangle(new Vector2(100, 200), new Vector2(100, 100), new Vector2(0.5, 0.5));
  box2 = new Rectangle(new Vector2(100, 200), new Vector2(200, 300), new Vector2(0.5, 0.5));
  box3 = new Rectangle(new Vector2(100, 200), new Vector2(800, 500), new Vector2(0.5, 0.5));
  sunSprite = new Sprite(sunImage, new Vector2(200, 200), new Vector2(0.5, 0.5))
  backgroundSprite = new Sprite(backgroundImage, new Vector2(0, 0))


  //Create game variables
  this.overlapObjectLock = false
  this.overlapObject = null

  //Setup overlappable objects
  overlappableObjects = [box1, box2, box3, sunSprite]

  //Setup renderable
  renderableObjects = [backgroundSprite, box1, box2, box3, sunSprite, this.newText, mousePositionText]
}

function draw() {
  //variables setup and refresh
  background(240);

  mousePosition = new Vector2(mouseX, mouseY)
  mousePositionText.currentWords = "X: " + mousePosition.x + "\nY: " + mousePosition.y

  //Overlap checking
  overlappableObjects.forEach(obj => {
    if(!overlapObjectLock && obj.CheckOverlap(mousePosition)) {
      this.newText.currentWords = "Overlap"
      this.overlapObject = obj
    }
  });


  if(mouseIsPressed) {
    this.newText.currentWords = "Pressed"
  }

  //Transform overlap object if it is clicked on
  if(this.overlapObject != null && overlapObjectLock) {
    this.overlapObject.position = mousePosition
    if(this.overlapObject == sunSprite) {
      this.overlapObject.SetSprite(sunPinkImage)
    }

  }
  

  //Render
  renderableObjects.forEach(obj => {
    obj.Render()
  });

}

function mousePressed() {
  newText.currentWords = "Pressed"
  if (this.overlapObject != null && overlapObject.CheckOverlap(mousePosition)) {
    overlapObjectLock = true
  }
}

function mouseReleased() {
  this.newText.currentWords = "Released"
  overlapObjectLock = false
  if(this.overlapObject == sunSprite) {
    this.overlapObject.SetSprite(sunImage)
  }
}