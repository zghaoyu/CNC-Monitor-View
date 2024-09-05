<template>
  <!-- 跑马灯组件 -->
    <div class="marquee-wrap" ref="marquee-wrap">
      <div class="scroll" ref="scroll">
        <p class="marquee" v-html="text"></p>
        <p class="copy" ref="copy" v-html="copyText"></p>
      </div>
      <p class="getWidth" ref="getWidth" v-html="text"></p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TextScroll',
    props: ['val'],
    data () {
      return {
        timer: null,
        text: '',
        run: false,
        copyText:''
      }
    },
    created () {
    let timer = setTimeout(() => {
      this.move()
      clearTimeout(timer)
    }, 1000)
  },
    mounted () {
      this.updateData()
      
      setInterval(() => {
       this.updateData();
        }, 1000);

    },
    methods: {
      // 更新数据
       updateData() {
        let newval = "";
        for (let item of this.val) {
        newval += "["+item+"]"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
      }
        if(newval != this.text)
        {
          this.text = "";
          this.text = newval;
          if(!this.run)
          {

            this.move();
          }
          
        }
      
      },

      move () {
      let maxWidth = this.$refs['marquee-wrap'].clientWidth
      let width = this.$refs['getWidth'].scrollWidth
      // console.log("max"+maxWidth);
      // console.log("wid"+width);
        if (width <= maxWidth) return
      this.run = true
      let scroll = this.$refs['scroll']
      let copy = this.$refs['copy']
        // copy.innerText = this.text
        this.copyText = this.text
        let distance = 0 
        this.timer = setInterval(() => {
          distance -= 1
          if (-distance >= width) {
            distance = 20
          }
          scroll.style.transform = 'translateX(' + distance + 'px)'
        }, 20)
      }
    },
    beforeDestroy () {
      clearInterval(this.timer)
    }
  }
  </script>
  
  <style scoped>
    .marquee-wrap {
      width: 100%;
      overflow: hidden;
      position: relative;
      background-color: rgb(233, 248, 244);
    }
    .marquee{
      margin-right: 0.16rem;
    }
    p {
      word-break:keep-all;
      white-space: nowrap;
      font-size: 1rem;
    }
    .scroll {
      display: flex;
    }
    .getWidth {
      word-break:keep-all;
      white-space:nowrap;
      position: absolute;
      opacity: 0;
      top: 0;
    }
  </style>
  
  