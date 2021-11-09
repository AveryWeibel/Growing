class Sun extends Sprite {
    constructor(_image, _position, _origin = new Vector2(0,0), _tint = color(255, 255, 255), _sky) {
        super(_image, _position, _origin, _tint)
        this.sky = _sky
        this.offset = this.position.y
    }

    Update() {
        super.Update()
        this.sky.SetTint(255 * (1 - ( constrain(this.position.y - this.offset, 0, 512) / 512)), 255 * (1 - ( constrain(this.position.y - this.offset, 0, 512) / 512)), 255)
    }
}