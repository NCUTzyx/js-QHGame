import { GameMap } from "/static/js/game_map/map.js";
import { Zyx } from "/static/js/game_player/zyx.js";

class KOF {
    constructor(id) {
        this.$kof = $('#' + id);
        this.game_map = new GameMap(this);
        this.game_player = [
            new Zyx(this, {
                id: 0,
                x: 300,
                y: 0,
                width: 120,
                height: 200,
                color: "lightblue",
            }),

            new Zyx(this, {
                id :1,
                x: 1000,
                y: 0,
                width: 120,
                height: 200,
                color: "lightpink",
            })
        ];

    }
}

export {
    KOF
}