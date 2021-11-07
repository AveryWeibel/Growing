class Vector2 {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y
    }

    minus(position) {
        let tmp = new Vector2(this.x - position.x, this.y - position.y)
        return tmp                
    }

    plus(position) {
        let tmp = new Vector2(this.x + position.x, this.y + position.y)
        return tmp                
    }
}