class Creature extends Sprite {
    constructor(_image, _position, _origin = new Vector2(0,0), _tint = color(255, 255, 255)) {
        super(_image, _position, _origin, _tint)

        this.wanderPosition = new Vector2(random(980), random(200, 490))
        this.wanderDirection = this.position
        this.wanderDistance = 0
        this.wanderSpeed = this.speed / 1.4
        this.wanderCoeff = 10
        this.snapBack = false
    }

    StepWanderPosition() {
        let curDistance = this.position.distance(this.wanderPosition)
        this.wanderDirection = this.wanderPosition.minus(this.position)
        this.wanderDirection.normalize()
        this.wanderCoeff = this.easeMin + this.wanderSpeed * ( curDistance * 1.5 / this.wanderDistance)
        this.position = this.position.plus(this.wanderDirection.times(this.wanderCoeff))
    }

    ResetWander() {
        console.log("Wandered")
        this.position = this.wanderPosition
        this.wanderPosition = new Vector2(random(980), random(200, 490))
        this.wanderDistance = this.position.distance(this.wanderPosition)
        this.holdPosition = this.position
    }

    HandleDrop() {
        this.snapBack = false;       
        this.wanderPosition = this.position
        this.ResetWander()
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
                this.ResetSnap()
            }
        }
        else {
            if(this.wanderDistance == 0)
            this.wanderDistance = this.position.distance(this.wanderPosition)

            this.StepWanderPosition()
            this.holdPosition = this.position

            if(this.position.distance(this.wanderPosition) < this.wanderCoeff){
                this.ResetWander()
            }
        }

    }

}