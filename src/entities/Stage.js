// Part 3

export class Stage {
    constructor() {
        this.image = document.querySelector('img[alt="background"]');
    }

    update() { }

    draw(context) {
        context.drawImage(background, 0, 0);
    }
}