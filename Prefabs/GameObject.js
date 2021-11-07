class GameObject {
    constructor(_dimensions, _position, _origin = new Vector2(0,0)) {
        this.dimensions = _dimensions
        this.position = _position
        this.origin = new Vector2(_dimensions.x * _origin.x, _dimensions.y * _origin.y)
        this.held = false
        this.snapBack = true;
        this.holdPosition = this.position
        this.snapBackPosition = this.position
        this.snapBackDirection = this.position
    }

    CheckOverlapPoint(InPosition) {

        if(InPosition == null) {
            return false;
        }

        if(
        InPosition.x > this.position.x - this.origin.x &&
        InPosition.x < this.position.x - this.origin.x + this.dimensions.x &&
        InPosition.y > this.position.y - this.origin.y &&
        InPosition.y < this.position.y - this.origin.y + this.dimensions.y) 
        {
            return true;
        }
        return false;
    }

    SetHold(state) {
        console.log("SetHold()")
        this.held = state;
        if(state)
            this.position = this.holdPosition
    }

    SetSnap(state) {
        this.snapBack = state        
    }

    Update () {

        if (this.held) {
            this.position = this.holdPosition
        }
        else if (this.snapBack) {
            this.position = this.snapBackDirection.plus(this.position)
            this.snapBackDirection = this.snapBackPosition.minus(this.position)
            this.holdPosition = this.position
        }


    }
    
}