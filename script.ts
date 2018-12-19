let canvas: HTMLCanvasElement = document.getElementById("mainCanvas") as HTMLCanvasElement;

let ctx: CanvasRenderingContext2D = canvas.getContext("2d");

class Stopwatch {
    private lastTime: number;
    constructor() {
        this.lastTime = Date.now();
    }

    public tick() {
        let delta: number = Date.now() - this.lastTime;
        this.lastTime = Date.now();
        return delta / 1000; //seconds
    }
}
class Point {
    constructor(public x: number, public y: number) { }
}

function getMousePos(canvas, evt): Point {
    var rect = canvas.getBoundingClientRect();
    return new Point(
        evt.clientX - rect.left,
        evt.clientY - rect.top
    );
}

function distance( a: Point, b: Point): number {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) **2);
}



class Arm {
    private angle0: number = 0;
    private angle1: number = 0;
    private armLength: number = canvas.width / 2.5;

    constructor(public positionX: number, public positionY: number) { }

    getP0(): Point {
        return new Point(this.positionX + Math.cos(this.angle0) * this.armLength, this.positionY + Math.sin(this.angle0) * this.armLength);
    }

    getP1(): Point {
        let p0 = this.getP0();
        return new Point(p0.x + Math.cos(this.angle1) * this.armLength, p0.y + Math.sin(this.angle1) * this.armLength);
    }

    render(): void {
        ctx.beginPath();
        ctx.ellipse(this.positionX, this.positionY, 10, 10, 0, 0, 2 * Math.PI);
        ctx.stroke();


        let p0: Point = this.getP0();

        ctx.beginPath();
        ctx.moveTo(this.positionX, this.positionY);
        ctx.lineTo(p0.x, p0.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(p0.x, p0.y, 10, 10, 0, 0, 2 * Math.PI);
        ctx.stroke();

        let p1: Point = this.getP1();

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(p1.x, p1.y, 10, 10, 0, 0, 2 * Math.PI);
        ctx.stroke();
    }

    public moveTowards(pos: Point) {
        let startingDistance: number = distance(pos, this.getP1());
        let count = 0;

        let startingA0 = this.angle0;
        let startingA1 = this.angle1;
        
        while (count < 10 && distance(pos, this.getP1()) >= startingDistance) {
            count++;
            this.angle0 = startingA0 + (Math.random() - .5) / 2000;
            this.angle1 = startingA1 + (Math.random() - .5) / 2000;
        }
        
    }

}


let arm: Arm = new Arm(canvas.width / 10, canvas.height / 10);
let pos: Point = new Point(0, 0);
canvas.addEventListener("mousemove", (evt) => {
     pos = getMousePos(canvas, evt);
})



function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    arm.render();
}



let stopwatch: Stopwatch = new Stopwatch();
function mainLoop(): void {
    for (let i = 0; i < 1000; i++) {
        arm.moveTowards(pos);
    }

    render();
    requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);
