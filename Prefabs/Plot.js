class Plot extends Sprite {    

    constructor(_image, _position, _origin = new Vector2(0,0), _tint = color(255, 255, 255) ) {
        super(_image, _position, _origin, _tint)
        this.faceSprite = new Sprite(plotFace, new Vector2(this.position.x + 60, this.position.y + 15))
        this.sproutSprite = new Sprite(plotSprout, new Vector2(this.position.x + 60, this.position.y))
        this.plotState = {
            EMPTY: "empty",
            PLANTED: "planted"
        }
        this.state = this.plotState.EMPTY
        this.UpdateFromState()
    }

    UpdateFromState() {
        switch (this.state) {
            case this.plotState.EMPTY:
                this.faceSprite.SetVisible(true)
                this.sproutSprite.SetVisible(false)
                break
            case this.plotState.PLANTED:
                this.faceSprite.SetVisible(false)
                this.sproutSprite.SetVisible(true)
                break
        }

    }

    Render() {
        if(this.visible) {
            tint(this.tint)
            //render dirt
            image(this.image, this.position.x - this.origin.x, this.position.y - this.origin.y)

            //Render face
            this.faceSprite.Render()

            //Render sprout
            this.sproutSprite.Render()
        }
    }

    CheckOverlapRect(InRect) {
        let res = (abs(( (this.position.x - this.origin.x)  - (InRect.position.x - InRect.origin.x) ) ) * 2 < this.dimensions.x + InRect.dimensions.x) &&
        (abs(( (this.position.y - this.origin.y) -  (InRect.position.y - InRect.origin.y) ) ) * 2 < this.dimensions.y + InRect.dimensions.y)
        
        if(res)
        this.HandleRectOverlap(InRect)

        return res
    }

    HandleRectOverlap(InRect) {
        let tags = InRect.tags

        if(this.state == this.plotState.EMPTY && tags.find(tag => tag == "BlueSeed")) {
            this.state = this.plotState.PLANTED
            this.UpdateFromState()
        }

        if(this.state == this.plotState.PLANTED && tags.find(tag => tag == "WateringCan")) {

            AddCreature(new Creature(blueGhost, new Vector2(580, 230), new Vector2(0.5, 0.5)))

            this.state = this.plotState.EMPTY
            this.UpdateFromState()
        }

        let msg = "Overlap obj "

        tags.forEach(tag => {
            msg += tag
        });

        console.log(msg)
    }
}