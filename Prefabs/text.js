class Text {
    constructor(_words, _position) {
        this.originalWords = _words
        this.currentWords = _words
        this.position = _position

    }

    Render() {
        fill(color(0,0,0))
        text(this.currentWords, this.position.x, this.position.y)
        this.currentWords = this.originalWords
    }

}

