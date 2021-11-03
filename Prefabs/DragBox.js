class DragBox {
    constructor(_dimensions, _position, _origin = new Vector2(0,0)) {
        this.dimensions = _dimensions
        this.position = _position
        this.origin = new Vector2(_dimensions.x * _origin.x, _dimensions.y * _origin.y)
    }

    CheckOverlap(InPosition) {

        if(InPosition == null)
            return false

        if(
        InPosition.x > this.position.x - this.origin.x &&
        InPosition.x < this.position.x - this.origin.x + this.dimensions.x &&
        InPosition.y > this.position.y - this.origin.y &&
        InPosition.y < this.position.y - this.origin.y + this.dimensions.y
        ) 
        {
            return true
        }
        
        return false
    }

    Render() {
        rect(this.position.x - this.origin.x, this.position.y - this.origin.y, this.dimensions.x, this.dimensions.y)
    }

}