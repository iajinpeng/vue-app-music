<template>
	<div class="progress-bar" ref="progressBar">
		<div class="progress-load"></div>
		<div class="progress" :style="`width: ${progress * 100}%`" ref="progress"></div>
		<div class="progress-button" v-if="!disableButton" :style="progressButtonStyle" ref="progressBtn"></div>
	</div>
</template>
<script>
	import './progress.styl'

	export default {
		props: {
			progress: {  //进度
				type: Number,
				required: true,
			},
			disableButton: {  //是否禁用按钮
				type: Boolean
			},
			disableDrag: {  //是否禁用拖拽
				type: Boolean
			},
		},
		data(){
			return {
				progressBarWidth: null,
			}
		},
		computed: {
			progressButtonStyle(){
				let left = 0;
				if(this.progressBarWidth){
					left = this.progress * this.progressBarWidth + 'px';
				}
				return `left: ${left}`
			}
		},
		mounted(){
			let progressBar = this.$refs.progressBar;
			let progress = this.$refs.progress;
			let progressBtn = this.$refs.progressBtn;

			this.progressBarWidth = progressBar.offsetWidth;

			if(this.disableButton !== true && this.disableDrag != true){
				//触摸开始位置
				let downX = 0;
				//按钮left值
				let buttonLeft = 0;

				progressBtn.addEventListener('touchstart', (e) => {
					let touch = e.touches[0];
					downX = touch.clientX;
					buttonLeft = parseInt(touch.target.style.left);

					if(this.$listeners.hasOwnProperty('drag-start')){
						this.$emit('drag-start')
					}
				});
				progressBtn.addEventListener('touchmove', (e) => {
					e.preventDefault();

					let touch = e.touches[0];
					let diffX = touch.clientX -downX;

					let btnLeft = buttonLeft + diffX;
					if(btnLeft > progressBar.offsetWidth){
						btnLeft = progressBar.offsetWidth;
					}else if(btnLeft < 0){
						btnLeft = 0;
					}
					//设置按钮left值
					touch.target.style.left = btnLeft + 'px';
					//设置进度width
					progress.style.width = btnLeft / this.progressBarWidth * 100 + '%';

					if(this.$listeners.hasOwnProperty('on-drag')){
						this.$emit('on-drag', btnLeft / this.progressBarWidth)
					}
				});
				progressBtn.addEventListener('touchend', (e) => {
					if(this.$listeners.hasOwnProperty('drag-end')){
						this.$emit('drag-end')
					}
				})
			}
		},
		updated(){
			//组件更新后重新获取进度条总宽度
			if (!this.progressBarWidth){
				this.progressBarWidth = this.$refs.progressBar.offsetWidth;
			}
		}
	}
</script>
