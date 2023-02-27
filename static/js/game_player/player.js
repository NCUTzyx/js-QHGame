import { GameObject } from "/static/js/game_object/object.js";

export class Player extends GameObject {

    constructor(root, info) {
        super();

        this.root = root;
        this.id = info.id;
        this.x = info.x;
        this.y = info.y;
        this.width = info.width;
        this.height = info.height;
        this.color = info.color;

        //方向
        this.direction = 1;

        this.vx = 0;
        this.vy = 0;
        //水平速度
        this.speedx = 400;
        //跳跃速度
        this.speedy = -1000;

        this.gravity = 50;

        this.ctx = this.root.game_map.ctx;
        this.keys = this.root.game_map.controller.keys;

        // 0: idle, 1: 向前, 2: 向后, 3: 跳跃, 4: 攻击, 5: 被打, 6: 死亡
        this.status = 3;
        this.animation = new Map();
        this.startObject = 0;

        //血量
        this.hp = 100;
        this.$hp = this.root.$kof.find(`.player_${this.id} > div`);
        this.$hpd = this.$hp.find('div');
        //伤害
        this.sh = 10;
    }

    start() {

    }


    update_move() {

        this.vy += this.gravity;
        this.x += this.vx * this.timedetla / 1000;
        this.y += this.vy * this.timedetla / 1000;

        let[a,b] = this.root.game_player;

        if(a!==this) [a,b] =[b,a];
        let r1={
            x1:a.x,
            y1:a.y,
            x2:a.x + a.width,
            y2:a.y +a.height
        };
        let r2={
            x1:b.x,
            y1:b.y,
            x2:b.x +b.width,
            y2:b.y +b.height
        };

        //角色不能重叠
        if(this.is_intersection(r1,r2)){
            b.x += this.vx * this.timedetla / 1000/2;
            b.y += this.vy * this.timedetla / 1000/2;
            a.x -= this.vx * this.timedetla / 1000/2;
            a.y -= this.vy * this.timedetla / 1000/2;

            if(this.status ===3) this.status = 0;
        }


        if (this.y > 380) {
            this.y = 380;
            this.vy = 0;

            if(this.status ===3) this.status = 0;
        }

        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.width > this.root.game_map.$canvas.width()) {
            this.x = this.root.game_map.$canvas.width() - this.width;
        }

    }

    update_controller() {
        let w, a, d, space;
        if (this.id === 0) {

            w = this.keys.has('w');
            a = this.keys.has('a');
            d = this.keys.has('d');
            space = this.keys.has(' ');

        } else {
            w = this.keys.has('ArrowUp');
            a = this.keys.has('ArrowLeft');
            d = this.keys.has('ArrowRight');
            space = this.keys.has('Enter');

        }

        if (this.status === 0 || this.status === 1) {

            if (space) {
                this.status = 4;
                this.vx = 0;
                this.startObject = 0;
            }
            else if (w) {
                if (d) {
                    this.vx = this.speedx;
                } else if (a) {
                    this.vx = -this.speedx;
                } else {
                    this.vx = 0;
                }
                this.vy = this.speedy;
                this.status = 3;
                this.startObject = 0;
            } else if (d) {
                this.vx = this.speedx;
                this.status = 1;
            } else if (a) {
                this.vx = -this.speedx;
                this.status = 1;
            } else {

                this.vx = 0;
                this.status = 0;
            }
        }
    }

    uodate_direction() {

        if (this.status === 6) return;

        let player = this.root.game_player;
        if (player[0] && player[1]) {
            let me = this, you = player[1 - this.id];
            if (me.x < you.x) me.direction = 1;
            else me.direction = -1;
        }
    }
    //是否被攻击到
    is_attark() {

        if (this.status === 6) return;
        this.status = 5;
        this.startObject = 0;
        this.hp = Math.max(this.hp - this.sh, 0);

        //改变血条长度

        this.$hpd.animate({
            width : this.$hp.parent().width()*this.hp / 100,
        },300);

        this.$hp.animate({
            width : this.$hp.parent().width()*this.hp / 100,
        },500);
        


        if (this.hp <= 0) {
            this.status = 6;
            this.startObject = 0;
            this.vx=0;
        }

    }

    //是否有交集
    is_intersection(r1, r2) {
        if (Math.max(r1.x1, r2.x1) > Math.min(r1.x2, r2.x2))
            return false;
        if (Math.max(r1.y1, r2.y1) > Math.min(r1.y2, r2.y2))
            return false;
        return true;
    }

    update_attark() {
        if (this.status === 4 && this.startObject === 17) {
            let me = this, you = this.root.game_player[1 - this.id];
            let r1;
            if (this.direction > 0) {
                r1 = {
                    x1: me.x + 120,
                    y1: me.y + 56,
                    x2: me.x + 120 + 160,
                    y2: me.y + 56 + 20,
                };
            } else {
                r1 = {
                    x1: me.x + this.width-280,
                    y1: me.y + 56,
                    x2: me.x + this.width-200,
                    y2: me.y + 56 + 20
                };
            }
            let r2 = {
                x1: you.x,
                y1: you.y,
                x2: you.x + you.width,
                y2: you.y + you.height
            };

            if (this.is_intersection(r1, r2)) {
                you.is_attark();
            }
        }

    }
    update() {

        this.update_controller();
        this.update_move();
        this.uodate_direction();
        this.update_attark();

        this.render();

    }

    render() {
        // this.ctx.fillStyle = 'lightblue';;
        // this.ctx.fillRect(this.x, this.y, this.width, this.height);

        // if (this.direction > 0) {
        //     this.ctx.fillStyle = 'red';;
        //     this.ctx.fillRect(this.x + 120, this.y + 56, 160, 20);
        // } else {
        //     this.ctx.fillStyle = 'red';;
        //     this.ctx.fillRect(this.x + this.width - 280, this.y + 56, 160, 20);
        // }

        let status = this.status;
        if (this.status === 1 && this.direction * this.vx < 0) status = 2;
        let obj = this.animation.get(status);
        if (obj && obj.loader) {

            if (this.direction > 0) {
                let k = parseInt(this.startObject / obj.frame_rate) % obj.frame_cnt;
                let image = obj.gif.frames[k].image;
                this.ctx.drawImage(image, this.x, this.y + obj.offset_y, image.width * obj.scale, image.height * obj.scale);
            } else {
                this.ctx.save();
                this.ctx.scale(-1, 1);
                this.ctx.translate(-this.root.game_map.$canvas.width(), 0);

                let k = parseInt(this.startObject / obj.frame_rate) % obj.frame_cnt;
                let image = obj.gif.frames[k].image;
                this.ctx.drawImage(image, this.root.game_map.$canvas.width() - this.x - this.width, this.y + obj.offset_y, image.width * obj.scale, image.height * obj.scale);

                this.ctx.restore();
            }
        }

        if (status === 4 || status === 3 || status === 5 || status === 6) {

            if (this.startObject === obj.frame_rate * (obj.frame_cnt - 1)) {
                if (status === 6) {
                    this.startObject--;
                } else {
                    this.status = 0;
                }
            }
        }
        this.startObject++;
    }
}