<template>
  <div class="scroll-view" ref="scrollView">
    <slot></slot>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import './scroll.styl'

  export default {
    props: {
      click: {
        type: [Boolean],
        default: true,
      },
      refresh: {
        type: [Boolean],
        default: false,
      },
    },
    data() {
      return {
        bScroll: null,
        scrollView: null,
      }
    },
    mounted() {
      this.scrollView = this.$refs.scrollView;
      if (!this.bScroll) {
        this.bScroll = new BScroll(this.scrollView, {
          probeType: 3,
          click: this.click,
        });
        //根据父组件是否监听scroll事件而派发
        if (this.$listeners.hasOwnProperty('scroll')) {
          this.bScroll.on('scroll', (scroll) => {
            this.$emit('scroll', scroll)
          })
        }
      }
    },
    updated() {
      //组件更新后，如果实例化了better-scroll并且需要刷新就调用refresh()函数
      if (this.bScroll && this.refresh === true) {
        this.bScroll.refresh();
      }
    },
    beforeDestroy() {
      if (this.bScroll) {
        this.bScroll.off('scroll');
        this.bScroll = null;
      }
    }
  }
</script>
