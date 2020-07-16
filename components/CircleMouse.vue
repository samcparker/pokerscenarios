<template>
<div>

<div id="box"></div>
<div class="circle"></div>
</div>
</template>

<script>
export default {
    methods: {
        changePosition(e) {
            this.leftOffset = e.offsetX;
            this.topOffset = e.offsetY;
        },

    },
    data: () => {
        return {
            leftOffset: 0,
            topOffset: 0,
            size: 180
        }
    },
    mounted () {
        window.addEventListener("mousemove", this.changePosition);
        // window.addEventListener("mousedown", () => { this.size = 120});
        // window.addEventListener("mouseup", () => { this.size = 60});
    },
    computed: {
        style() {
            return {
                left: (this.leftOffset - this.size/2) + "px",
                top: (this.topOffset - this.size/2) + "px",
                width: this.size + "px", 
	            height: this.size + "px", 
            }
        }
    }
}
</script>

<style scoped>
.circle-bg {
    position: absolute;
    width: 100%;
    height: 100%;
}
.circle {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 50%;
  left: 50%;
  margin: -50px 0 0 -50px;
  background: #CB4B16;
  border-radius: 80%;
  backface-visibility: hidden;
  visibility:hidden;
  z-index:1;
}
#box{
  position: absolute;
  top:100px;
  left:100px;
  width: 300px;
  height: 200px;
  background: green;
  z-index:0;
}
</style>