class Sprite extends GameObject {    
    constructor(_image, _position, _origin = new Vector2(0,0), _tint = color(255, 255, 255)) {
        super(new Vector2(_image.width, _image.height), _position, _origin)
        this.image = _image
        this.tint = _tint
        this.visible = true

        this.tags = []
    }

    SetTint(newColor) {
        this.tint = newColor
    }

    SetColor(newColor) {
        this.SetTint(newColor)

    }

    SetVisible(state) {
        this.visible = state
    }

    SetSprite(newImg) {
        this.image = newImg
    }

    Render() {
        if(this.visible) {
            tint(this.tint)
            image(this.image, this.position.x - this.origin.x, this.position.y - this.origin.y)
        }
    }
}