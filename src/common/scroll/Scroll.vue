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
			pulldown: {
      	type: [Function],
				default: function () {
					console.log('默认的pulldown事件')
				}
			},
			scroll: {
				type: [Function],
				default: function () {
//					console.log('默认的scroll事件')
				}
			}
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
				this.bScroll.on('scroll', this.scroll);
//        if (this.$listeners.hasOwnProperty('scroll')) {
//          this.bScroll.on('scroll', (scroll) => {
//            this.$emit('scroll', scroll)
//          })
//        }
				//根据父组件是否监听pulldown事件而派发
//				if (this.$listeners.hasOwnProperty('pulldown')) {
//					this.bScroll.on('touchEnd', (pos) => {
//						this.$emit('pulldown', pos)
//					})
//				}
				this.bScroll.on('touchEnd', this.pulldown);
      }
    },
    beforeDestroy() {
      if (this.bScroll) {
        this.bScroll.off('scroll');
        this.bScroll = null;
      }
    },
		methods: {
			refresh() {
				if (this.bScroll) {
					this.bScroll.refresh();
				}
			}
		}
  }
</script>
