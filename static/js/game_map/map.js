import { GameObject } from "/static/js/game_object/object.js";
import { Controller } from "/static/js/controller/controller.js";

export class GameMap extends GameObject {
    constructor(root) {
        super();
        this.root = root;

        this.$canvas = $('<canvas  width="1510" height="696" tabindex=0 ></canvas>');
        this.ctx = this.$canvas[0].getContext('2d');
        this.root.$kof.append(this.$canvas);
        this.$canvas.focus();

        this.controller = new Controller(this.$canvas);

        this.timer = 90000; //90秒
        this.$time = this.root.$kof.find('.timer');


    }
    start() {

    }

    update() {
        this.timer -= this.timedetla;
        if (this.timer < 0) {

            this.timer = 0;

            let [a, b] = this.root.game_player;
            if (a.status !== 6 && b.status !== 6) {
                a.status = 6;
                b.status = 6;
                a.startObject =0;
                b.startObject =0;
                a.vx =0;
                b.vx =0;

            }
        };



        this.$time.text(parseInt(this.timer / 1000));

        this.render();
    }

    render() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        // this.ctx.fillStyle = 'black';
        // this.ctx.fillRect(0,0,this.$canvas.width(),this.$canvas.height());
    }
}

