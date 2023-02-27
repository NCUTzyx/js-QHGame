//定义数组存储对象
let GAME_OBJECTS = [];

 class GameObject {
    constructor() {
        //把对象那个放进数组里
        GAME_OBJECTS.push(this);

        // 距离上一帧的时间间隔
        this.timedetla = 0;
        //判断当前对象那个是否执行过start函数
        this.has_start = false;
    }

    start() {   //初始化

    }
    update() {   //每一帧执行一次 =》不包括第一帧

    }
    destroy() {   //删除当前对象
        for (let go in GAME_OBJECTS) {
            if (this === GAME_OBJECTS[i]) {
                GAME_OBJECTS.splice(i, 1);
                break;
            }
        }
    }
}

let Previous_time;
let StepFreame = (timestamp) => {
    for (let obj of GAME_OBJECTS) {
        if (!obj.has_start) {
            obj.start();
            obj.has_start  = true;
        } else {
            obj.timedetla = timestamp - Previous_time;
            obj.update();
        }
    }
    Previous_time = timestamp;
    requestAnimationFrame(StepFreame);
}

requestAnimationFrame(StepFreame);

export{
    GameObject
}