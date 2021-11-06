class Sprite extends GameObject {    
    constructor(_image, _position, _origin = new Vector2(0,0)) {
        super(new Vector2(_image.width, _image.height), _position, _origin)
        this.image = _image
    }

    SetSprite(newImg) {
        this.image = newImg
    }

    Render() {
        image(this.image, this.position.x - this.origin.x, this.position.y - this.origin.y)
    }
}