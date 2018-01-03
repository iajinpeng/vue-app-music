<template>
	<div class="mini-player" v-show="!showStatus" @click="hangleShow">
		<div class="player-img rotate" :style="imgStyle">
			<img :src="song.img || '/src/assets/imgs/music.png'" :alt="song.name">
		</div>
		<div class="player-center">
			<div class="progress-wrapper">
				<Progress disableButton :progress="progress"></Progress>
			</div>
			<span class="song">{{song.name}}</span>
			<span class="singer">{{song.singer}}</span>
		</div>
		<div class="player-right">
			<i :class="playStatus ? 'icon-pause' : 'icon-play'" @click="handlePlayOrPause"></i>
			<i class="icon-next ml-10" @click="handleNext"></i>
		</div>
		<div class="filter"></div>
	</div>
</template>
<script>
	import { mapGetters, mapActions } from 'vuex'
	import Progress from './Progress.vue'
	import './miniplayer.styl'

	export default{
		components: {Progress},
		props: ['progress', 'song', 'showStatus', 'playStatus'],
		computed: {
			imgStyle(){
				if(this.playStatus){
					return 'animation-play-state: running; -webkit-animation-play-state: running';
				}else{
					return 'animation-play-state: paused; -webkit-animation-play-state: paused';
				}
			}
		},
		methods: {
			...mapActions(['showPlayer', 'changeSong']),
			hangleShow(e){
				if(this.song.url && e.target.nodeName.toLowerCase() !== 'i'){
					this.showPlayer(true);
				}
			},
			handlePlayOrPause(){
				if(this.song.url){
					this.$emit('playOrPause')
				}
			},
			handleNext(){
				this.$emit('next')
			}
		}
	}

</script>
