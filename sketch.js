function setup() {
  //Create gameobjects
  createCanvas(1024, 512);
  this.newText = new Text("Hello World", new Vector2(width/2, height/2))
  mousePositionText = new Text("", (50, 150));
  box1 = new Rectangle(new Vector2(127, 127), new Vector2(100, 100), new Vector2(0.2, 0.8));
  box2 = new Rectangle(new Vector2(127, 127), new Vector2(200, 300), new Vector2(0.5, 0.5));
  box3 = new Rectangle(new Vector2(127, 127), new Vector2(800, 500), new Vector2(0.5, 0.5));
  sunSprite = new Sprite(sunImage, new Vector2(200, 200), new Vector2(0.5, 0.5))
  backgroundSprite = new Sprite(backgroundImage, new Vector2(0, 0))


  //Create game variables
  this.overlapObjectLock = false
  this.overlapObject = null
  this.holdObject = null

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
    if(this.holdObject != null) {
      this.holdObject.holdPosition = mousePosition
      RectOverlapCheck(this.holdObject)
    }
  }

  //Render
  renderableObjects.forEach(obj => {
    obj.Render()
  });

}

function RectOverlapCheck (InRect) {
    //Rect Overlap checking
    InRect.SetTint(color(255,255,255))
    GameObjects.forEach(obj => {
      if(obj != InRect) {
        if(obj.CheckOverlapRect(InRect)) {
          InRect.SetTint(color(55,255,255))
          return
        }
      }
    });
}

function mousePressed() {
  newText.currentWords = "Pressed"
  if (this.overlapObject != null && this.overlapObject.CheckOverlapPoint(mousePosition)) {
    this.holdObject = this.overlapObject
    this.holdObject.SetSnap(false)
    this.holdObject.SetHold(true, mousePosition)
  }
}

function mouseReleased() {
  this.newText.currentWords = "Released"
  if(this.holdObject != null) {    
    RectOverlapCheck(this.holdObject)
    this.holdObject.SetSnap(true)
    this.holdObject.SetHold(false, mousePosition)
    this.holdObject = null
  }
}