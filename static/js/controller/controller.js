export class Controller {
    constructor($canvas) {

        this.$canvas = $canvas;

        this.keys = new Set();
        this.start(); 

    }


    start() {
        let outer = this;
        this.$canvas.keydown((e)=>{
            outer.keys.add(e.key);
            // console.log(e.key);
        });

        this.$canvas.keyup((e)=>{
            outer.keys.delete(e.key);
        });
    }

}