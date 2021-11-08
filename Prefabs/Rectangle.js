class Rectangle extends GameObject {

    constructor(_dimensions, _position, _origin = new Vector2(0,0), _color = color(255, 255, 255)) {
        super(_dimensions, _position, _origin)
        this.color = _color
    }

    SetTint(newColor) {
        this.SetColor(newColor)
    }

    SetColor(newColor) {
        this.color = newColor
    }

    Render() {
        fill(this.color)
        rect(this.position.x - this.origin.x, this.position.y - this.origin.y, this.dimensions.x, this.dimensions.y)
    }

    HoldAtPoint (InPosition) {
        this.position = InPosition
        console.log("Print from Rectangle")
    }

}