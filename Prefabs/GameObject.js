class GameObject {
    constructor(_dimensions, _position, _origin = new Vector2(0,0)) {
        this.dimensions = _dimensions
        this.position = _position
        this.origin = new Vector2(_dimensions.x * _origin.x, _dimensions.y * _origin.y)
        this.held = false
        this.snapBack = false;
        this.holdPosition = this.position
        this.snapBackPosition = this.position
        this.snapBackDirection = this.position
        this.snapBackDistance = 0
        this.speed = 5
        this.easeCoeff = 0
        this.easeMin = .56
        this.easeThreshold = 50
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

    StepSnapBack() {
        let curDistance = this.position.distance(this.snapBackPosition)
        this.snapBackDirection = this.snapBackPosition.minus(this.position)
        this.snapBackDirection.normalize()
        this.easeCoeff = this.easeMin + this.speed * (curDistance * 4.5 / this.snapBackDistance)
        this.position = this.position.plus(this.snapBackDirection.times(this.easeCoeff))
    }

    Update () {

        if (this.held) {
            this.position = this.holdPosition
        }
        else if (this.snapBack) {
             if(this.snapBackDistance == 0)
                 this.snapBackDistance = this.position.distance(this.snapBackPosition)

            this.StepSnapBack()
            this.holdPosition = this.position

            if(this.position.distance(this.snapBackPosition) < this.easeCoeff) {
                console.log("Returned")
                this.snapBack = false;
                this.snapBackDistance = 0
                this.position = this.snapBackPosition
            }
        }

    }
    
}