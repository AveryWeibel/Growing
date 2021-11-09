function setup() {
  //Create gameobjects
  var cnv = createCanvas(1024, 512);
  frameRate(144)
  sunSprite = new Sprite(sunImage, new Vector2(105,95), new Vector2(0.5, 0.5))
  backgroundSprite = new Sprite(backgroundImage, new Vector2(0, 0))
  backgroundSkySprite = new Sprite(backgroundSky, new Vector2(0, 0))
  vignetteSprite = new Sprite(vignette, new Vector2(0,0))
  midBarrelSprite = new Sprite(midBarrel, new Vector2(340,270))
  botBarrelSprite = new Sprite(botBarrel, new Vector2(280, 370))

  blueSeedSprite = new Sprite(blueSeed, new Vector2(360, 230), new Vector2(0.5, 0.5))
  blueSeedSprite.SetVisible(false)
  blueSeedSprite.tags.push("BlueSeed")
  topBarrelSprite = new Barrel(topBarrel, new Vector2(280, 180), new Vector2(0, 0), color(255, 255, 255), blueSeedSprite)

  plotDirt1 = new Plot(plotDirt, new Vector2(580, 230), new Vector2(0, 0), color(255, 255, 255))
  plotDirt1.SetLocked(true)

  fenceSprite = new Sprite(fence, new Vector2(0, 90))

  wateringCanSprite = new Sprite(wateringCan, new Vector2(450, 240), new Vector2(.5, .5))
  wateringCanSprite.tags.push("WateringCan")

  //Create game variables
  this.overlapObjectLock = false
  this.overlapObject = null
  this.holdObject = null

  //Setup overlappable objects
  GameObjects = [sunSprite, plotDirt1, blueSeedSprite, topBarrelSprite, wateringCanSprite]

  //Setup renderable
  renderableObjects = [backgroundSkySprite, sunSprite, fenceSprite, backgroundSprite, plotDirt1, midBarrelSprite, botBarrelSprite, blueSeedSprite, topBarrelSprite, wateringCanSprite, vignetteSprite]
}

function AddCreature(creature) {
  console.log("Add creature")
  renderableObjects.splice(5, 0, creature)
}

function draw() {
  //variables setup and refresh
  background(240);
  if(this.overlapObject != null)
    this.overlapObject.SetTint(255, 255, 255)
    
  this.overlapObject = null

  mousePosition = new Vector2(mouseX, mouseY)

  //Update GameObjects
  GameObjects.forEach(obj => {
    obj.Update()
  });

  //Overlap checking
  GameObjects.forEach(obj => {
    if(!mouseIsPressed && obj.CheckOverlapPoint(mousePosition)) {
        obj.SetTint(220, 220, 220)
        this.overlapObject = obj
    }
  });


  if(mouseIsPressed) {
    if(this.holdObject != null) {
      this.holdObject.holdPosition = mousePosition
      //RectOverlapCheck(this.holdObject)
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
          obj.HandleRectOverlap(InRect);
          return true
        }
      }
    });
    return false
}

function mousePressed() {
  if (this.overlapObject != null && !this.overlapObject.locked && this.overlapObject.CheckOverlapPoint(mousePosition)) {
    this.holdObject = this.overlapObject
    this.holdObject.SetSnap(false)
    this.holdObject.SetHold(true, mousePosition)
  }
}

function mouseReleased() {
  if(this.holdObject != null) {
    RectOverlapCheck(this.holdObject)
    this.holdObject.SetSnap(true)
    this.holdObject.SetHold(false, mousePosition)
    this.holdObject = null
  }
}