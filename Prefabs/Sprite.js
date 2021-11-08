class Sprite extends GameObject {    
    constructor(_image, _position, _origin = new Vector2(0,0), _tint = color(255, 255, 255)) {
        super(new Vector2(_image.width, _image.height), _position, _origin)
        this.image = _image
        this.tint = _tint
    }

    SetTint(newColor) {
        this.tint = newColor
    }

    SetColor(newColor) {
        this.SetTint(newColor)

    }

    SetSprite(newImg) {
        this.image = newImg
    }

    Render() {
        tint(this.tint)
        image(this.image, this.position.x - this.origin.x, this.position.y - this.origin.y)
    }
}