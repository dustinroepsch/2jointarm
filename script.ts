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

function distance(a: Point, b: Point): number {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function modulate(a: number[]): number[] {
    let x: number[] = a.slice();
    for (let i = 0; i < x.length; i++) {
        x[i] += (Math.random() - .5) / 150;
    }
    return x;
}


class Arm {
    private armLength: number;

    public angles: number[] = [];

    constructor(public positionX: number, public positionY: number, numAngles: number) {
        for (let i: number = 0; i < numAngles; i++) {
            this.angles.push(0);
        }
        this.armLength = canvas.width / (numAngles + .5);
    }


    render(): void {
        let curX: number = this.positionX;
        let curY: number = this.positionY;


        for (let angle of this.angles) {
            ctx.beginPath();
            ctx.ellipse(curX, curY, 15, 15, 0, 0, Math.PI * 2);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(curX, curY);
            curX += this.armLength * Math.cos(angle);
            curY += this.armLength * Math.sin(angle);
            ctx.lineTo(curX, curY);
            ctx.stroke();
        }
        ctx.beginPath();
        ctx.ellipse(curX, curY, 15, 15, 0, 0, Math.PI * 2);
        ctx.stroke();


    }

    private getFinalPoint(): Point {
        let curX = this.positionX;
        let curY = this.positionY;

        for (let angle of this.angles) {
            curX += this.armLength * Math.cos(angle);
            curY += this.armLength * Math.sin(angle);
        }
        return new Point(curX, curY);
    }

    public moveTowards(pos: Point) {
        let startingDistance = distance(this.getFinalPoint(), pos);
        if (startingDistance < 0.01) {
            return;
        }
        let startingAngles: number[] = this.angles.slice();

        for (let i: number = 0; i < 200; i++) {
            this.angles = modulate(startingAngles);
            if (distance(this.getFinalPoint(), pos) < startingDistance) {
                return;
            }
        }
    }
}


let arm: Arm = new Arm(canvas.width / 10, canvas.height / 10, 4);
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
