import { Player } from "/static/js/game_player/player.js";
import { GIF } from "/static/js/utils/gif.js";

 class Zyx extends Player {
    constructor(root, info) {
        super(root, info);

        this.init_();
    }

    init_() {
        let outer = this;
        let offesets= [0,-22,-22,-160,0,0,0];
        for (let i = 0; i < 7; i++) {
            let gif = GIF();
            gif.load(`/static/images/player/kyo/${i}.gif`);
            this.animation.set(i, {
                gif: gif,
                frame_cnt: 0,   //总图片数
                frame_rate: 5,  //每5帧刷新一次
                offset_y: offesets[i],    //y方向偏移量
                loader: false,  //是否加载成功
                scale:2.5,        //放大倍数
            });

            gif.onload = () => {
                let obj = outer.animation.get(i);
                obj.frame_cnt = gif.frames.length;
                obj.loader = true;

                if(i===3){
                    obj. frame_rate =7;
                }
            }
        }
    }
}
export{
    Zyx
}