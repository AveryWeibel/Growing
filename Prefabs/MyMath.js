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

    times(coeff) {
        let tmp = new Vector2(this.x * coeff, this.y * coeff)
        return tmp     
    }

    normalize() {
        let len = sqrt(sq(this.x) + sq(this.y))
        if(this.x != 0)
            this.x /= len
        if(this.y != 0)
            this.y /= len        
    }

    distance(location) {
        return sqrt(sq(this.x - location.x) + sq(this.y - location.y))
    }
}