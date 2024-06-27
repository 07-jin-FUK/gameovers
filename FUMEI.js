//// Part5 4'00"あたりから書き始めてるけど、結局どこで使われているか分からない...!

// まずジャンプの許可をする
if (this.control.isUp) {
    this.player.velocity.y = -speed;
}

// ジャンプ中、既に空中にいた場合、ジャンプボタンを繰り返し押すことを妨げるものは何もない
if (this.control.isUp) {
    if (!this.player.isJumping) {
        this.player.velocity.y = -speed;
        this.player.isJumping = true;
    }
}

// しゃがみ込みたい場合
if (this.control.isDown) {
    if (!this.player.isCrouching) {
        this.player.isCrouching = true;
    }
} else if (this.control.isUp) {
    if (!this.player.isJumping) {
        this.player.velocity.y = -speed;
        this.player.isJumping = true;
    }
}

// しゃがみ込みたい場合とジャンプしたい場合の制御
if (this.control.isDown) {
    if (!this.player.isCrouching && !this.player.isJumping) {
        this.player.isCrouching = true;
    }
} else if (this.control.isUp) {
    if (!this.player.isJumping && !this.player.isCrouching) {
        this.player.velocity.y = -speed;
        this.player.isJumping = true;
    }
}

