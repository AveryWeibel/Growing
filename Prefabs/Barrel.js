class Barrel extends Sprite {
    constructor(_image, _position, _origin = new Vector2(0,0), _tint = color(255, 255, 255), _seed) {
        super(_image, _position, _origin, _tint)
        this.seed = _seed
    }

    CheckOverlapPoint(InPosition) {
        if(super.CheckOverlapPoint(InPosition)) {
            this.seed.SetVisible(true)
        }
        else {            
            this.seed.SetVisible(false)
            if(this.seed.snapBack)
                this.seed.ResetSnap()
        }
    }
}