function setup() {
  //Create gameobjects
  createCanvas(1024, 512);
  this.newText = new Text("Hello World", new Vector2(width/2, height/2))
  mousePositionText = new Text("", (50, 150));
  box1 = new Rectangle(new Vector2(50, 50), new Vector2(100, 100), new Vector2(0.5, 0.5));
  box2 = new Rectangle(new Vector2(50, 50), new Vector2(200, 300), new Vector2(0.5, 0.5));
  box3 = new Rectangle(new Vector2(50, 50), new Vector2(800, 500), new Vector2(0.5, 0.5));
  sunSprite = new Sprite(sunImage, new Vector2(200, 200), new Vector2(0.5, 0.5))
  backgroundSprite = new Sprite(backgroundImage, new Vector2(0, 0))


  //Create game variables
  this.overlapObjectLock = false
  this.overlapObject = null

  //Setup overlappable objects
  GameObjects = [box1, box2, box3, sunSprite]

  //Setup renderable
  renderableObjects = [backgroundSprite, box1, box2, box3, sunSprite, this.newText, mousePositionText]
}

function draw() {
  //variables setup and refresh
  background(240);

  mousePosition = new Vector2(mouseX, mouseY)
  mousePositionText.currentWords = "X: " + mousePosition.x + "\nY: " + mousePosition.y

  //Update GameObjects
  GameObjects.forEach(obj => {
    obj.Update()
  });

  //Overlap checking
  GameObjects.forEach(obj => {
    if(!mouseIsPressed && obj.CheckOverlapPoint(mousePosition)) {
      this.newText.currentWords = "Overlap"
      this.overlapObject = obj
    }
  });


  if(mouseIsPressed) {
    this.newText.currentWords = "Pressed"
    if(this.overlapObject != null) {
      this.overlapObject.holdPosition = mousePosition
    }
  }

  //Transform overlap object if it is clicked on
  if(this.overlapObject != null) {

  }

  //Render
  renderableObjects.forEach(obj => {
    obj.Render()
  });

}

function mousePressed() {
  newText.currentWords = "Pressed"
  if (this.overlapObject.CheckOverlapPoint(mousePosition)) {
    this.overlapObject.SetSnap(false)
    this.overlapObject.SetHold(true, mousePosition)
  }
}

function mouseReleased() {
  this.newText.currentWords = "Released"
  if(this.overlapObject != null) {
    this.overlapObject.SetSnap(true)
    this.overlapObject.SetHold(false, mousePosition)
    this.overlapObject = null
  }
}