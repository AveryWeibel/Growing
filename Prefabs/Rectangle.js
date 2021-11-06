class Rectangle extends GameObject {

    Render() {
        rect(this.position.x - this.origin.x, this.position.y - this.origin.y, this.dimensions.x, this.dimensions.y)
    }

}