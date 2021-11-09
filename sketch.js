function setup() {
  //Create gameobjects
  var cnv = createCanvas(1024, 512);
  frameRate(144)
  backgroundSkySprite = new Sprite(backgroundSky, new Vector2(0, 0))
  sunSprite = new Sun(sunImage, new Vector2(105,95), new Vector2(0.5, 0.5), color(255, 255, 255), backgroundSkySprite)
  backgroundSprite = new Sprite(backgroundImage, new Vector2(0, 0))
  vignetteSprite = new Sprite(vignette, new Vector2(0,0))

  //Mid Barrel
  pinkSeedSprite = new Sprite(pinkSeed, new Vector2(400, 320), new Vector2(0.5, 0.5))
  pinkSeedSprite.SetVisible(false)
  pinkSeedSprite.tags.push("PinkSeed")
  midBarrelSprite = new Barrel(midBarrel, new Vector2(340,270), new Vector2(0, 0), color(255, 255, 255), pinkSeedSprite)

  //Bot Barrel
  yellowSeedSprite = new Sprite(yellowSeed, new Vector2(380, 430), new Vector2(0.5, 0.5))
  yellowSeedSprite.SetVisible(false)
  yellowSeedSprite.tags.push("YellowSeed")
  botBarrelSprite = new Barrel(botBarrel, new Vector2(280, 370), new Vector2(0, 0), color(255, 255, 255), yellowSeedSprite)

  //Top Barrel
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
  GameObjects = [sunSprite, plotDirt1, blueSeedSprite, pinkSeedSprite, yellowSeedSprite, topBarrelSprite, midBarrelSprite, botBarrelSprite, wateringCanSprite]

  //Setup renderable
  renderableObjects = [backgroundSkySprite, sunSprite, fenceSprite, backgroundSprite, plotDirt1, blueSeedSprite, pinkSeedSprite, yellowSeedSprite, topBarrelSprite, midBarrelSprite, botBarrelSprite, wateringCanSprite, vignetteSprite]

  //Setup creature sprite arrays
  blueCreatureSprites = [blueGhost]
  pinkCreatureSprites = [pinkGhost]
  yellowCreatureSprites = [yellowGhost]
  
}

function GetRandomCreatureSprite(type) {
  switch (type) {
    case "Blue":
      console.log("Get blue creature sprite")
      return blueCreatureSprites.at(random(blueCreatureSprites.length))
    case "Pink":
      console.log("Get pink creature sprite")
      return pinkCreatureSprites.at(random(pinkCreatureSprites.length))
    case "Yellow":
      console.log("Get yellow creature sprite")
      return yellowCreatureSprites.at(random(yellowCreatureSprites.length))
  }
}

function AddCreature(creature) {
  console.log("Add creature")
  renderableObjects.splice(5, 0, creature)
  GameObjects.push(creature)
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