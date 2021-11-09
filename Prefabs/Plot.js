class Plot extends Sprite {

    constructor(_image, _position, _origin = new Vector2(0,0), _tint = color(255, 255, 255) ) {
        super(_image, _position, _origin, _tint)
        this.faceSprite = new Sprite(plotFace, new Vector2(this.position.x + 60, this.position.y + 15))
        
    }

    Render() {
        if(this.visible) {
            tint(this.tint)
            image(this.image, this.position.x - this.origin.x, this.position.y - this.origin.y)
            image(this.faceSprite.image, this.faceSprite.position.x - this.faceSprite.origin.x, this.faceSprite.position.y - this.faceSprite.origin.y)
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
        let msg = "Overlap obj "

        InRect.tags.forEach(tag => {
            msg += tag
        });

        console.log(msg)
    }
}