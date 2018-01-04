<template>
	<div class="player-container">
		<div class="player" ref="player" v-show="showStatus">
			<div class="header">
			<span class="header-back" @click="showPlayer(false)">
				<i class="icon-back"></i>
			</span>
				<div class="header-title">{{song.name}}</div>
			</div>
			<div class="singer-top">
				<div class="singer">
					<div class="singer-name">{{song.singer}}</div>
				</div>
			</div>
			<div class="singer-middle">
				<div class="singer-img" ref="singerImg">
					<img :src="playBg" :alt="song.name" v-if="song.img">
				</div>
			</div>
			<div class="singer-bottom">
				<div class="controller-wrapper">
					<div class="progress-wrapper">
						<span class="current-time">{{getTime(currentTime)}}</span>
						<div class="play-progress">
							<Progress :progress="playProgress"
												@on-drag="handleDrag"
												@drag-end="handleDragEnd">
							</Progress>
						</div>
						<span class="total-time">{{getTime(song.duration)}}</span>
					</div>
					<div class="play-wrapper">
						<div class="play-model-button" @click="changePlayMode">
							<i :class="`icon-${playModes[currentPlayMode]}-play`"></i>
						</div>
						<div class="previous-button" @click="previous">
							<i class="icon-previous"></i>
						</div>
						<div class="play-button" @click="playOrPause">
							<i :class="this.playStatus ? 'icon-pause' : 'icon-play'"></i>
						</div>
						<div class="next-button" @click="next">
							<i class="icon-next"></i>
						</div>
						<div class="play-list-button" @click="showPlayList">
							<i class="icon-play-list"></i>
						</div>
					</div>
				</div>
			</div>
			<div class="player-bg" :style="`background-image: url(${playBg})`"></div>
			<audio ref="audio" :src="currentSongUrl"></audio>
		</div>
		<Mini-player :song="song" :progress="playProgress"
								 :playStatus="playStatus"
								 :showStatus="showStatus"
								 @playOrPause="playOrPause"
								 @next="next">
		</Mini-player>
	</div>
</template>
<script>
	import "./player.styl"
	//	import {Song} from "@/model/song"
	import {mapGetters, mapActions} from 'vuex'
	import Progress from './Progress.vue'
	import MiniPlayer from './MiniPlayer.vue'

	export default {
		components: {Progress, MiniPlayer},
		data(){
			return {
				currentTime: 0,
				currentSong: null,
				playProgress: 0,
				dragProgress: 0,
				playStatus: false,
				playModes: ['list', 'single', 'shuffle'],
				currentPlayMode: 0,
			}
		},
		watch: {
			songs(songs){
				localStorage.setItem('my-song-cache', JSON.stringify(songs));
			}
		},
		computed: {
			...mapGetters(['showStatus', 'song', 'songs', 'autoplay']),

			currentIndex(){
				return this.songs.indexOf(this.song)
			},
			playBg(){
				return this.song.img ? this.song.img : '/src/assets/imgs/play_bg.jpg';
			},
			currentSongUrl(){
				if (this.song && this.song.url) {
					//当前歌曲发生变化
					if (!this.currentSong) {
						this.currentSong = this.song;
					} else if (this.currentSong.id !== this.song.id) {
						this.currentSong = this.song;
					}
					return this.currentSong.url;
				}
			}
		},
		mounted(){
			let audioDOM = this.$refs.audio;
			audioDOM.addEventListener('canplay', () => {
				if(this.autoplay){
					audioDOM.play();
					this.startImgRotate();
					this.playStatus = true;
				}
			}, false);
			audioDOM.load();  //加载资源，ios需要调用此方法
			audioDOM.addEventListener('timeupdate', () => {
				if (this.playStatus) {
					this.playProgress = audioDOM.currentTime / audioDOM.duration;
					this.currentTime = audioDOM.currentTime;
				}
			}, false);
			audioDOM.addEventListener('ended', () => {
				if (this.songs.length > 1) {
					let currentIndex = this.currentIndex;
					if (this.currentPlayMode === 0) {
						if (currentIndex === this.songs.length - 1) {
							currentIndex = 0;
						} else {
							currentIndex++;
						}
					} else if (this.currentPlayMode === 2) {
						currentIndex = parseInt(Math.random() * this.songs.length)
					}
					this.changeSong(this.songs[currentIndex]);
					this.$emit('update:currentIndex', currentIndex);
				} else {
					if (this.currentPlayMode == 1) {
						audioDOM.play();
					} else {
						audioDOM.pause();
						this.stopImgRotate();

						this.playProgress = 0;
						this.currentTime = 0;
						this.playStatus = false;
					}
				}
			})
		},
		methods: {
			...mapActions(['showPlayer', 'changeSong']),

			playOrPause(){  //播放或暂停
				let audioDOM = this.$refs.audio;
				if (audioDOM.paused) {
					audioDOM.play().catch((e) => {
						console.log(e);
					});
					this.startImgRotate();
					this.playStatus = true;
				} else {
					audioDOM.pause();
					this.stopImgRotate();
					this.playStatus = false;
				}
			},
			previous(){  //上一首
				if (this.songs.length > 1) {
					let currentIndex = this.currentIndex;
					if (this.currentPlayMode === 0) {  //列表循环
						if (currentIndex === 0) {
							currentIndex = this.songs.length - 1;
						} else {
							currentIndex--;
						}
					} else if (this.currentPlayMode === 1) {  //单曲循环

					} else {  //随机播放
						currentIndex = parseInt(Math.random() * this.songs.length);
					}
					this.changeSong(this.songs[currentIndex]);
					this.$emit('update:currentIndex', currentIndex);
				}
			},
			next(){  //下一首
				if (this.songs.length > 1) {
					let currentIndex = this.currentIndex;
					if (this.currentPlayMode === 0) {  //列表循环
						if (currentIndex === this.songs.length - 1) {
							currentIndex = 0;
						} else {
							currentIndex++;
						}
					} else if (this.currentPlayMode === 1) {  //单曲循环

					} else {  //随机播放
						currentIndex = parseInt(Math.random() * this.songs.length);
					}
					this.changeSong(this.songs[currentIndex]);
					this.$emit('update:currentIndex', currentIndex);
				}
			},
			startImgRotate(){  //开始旋转图片
				if (this.$refs.singerImg.className.indexOf('rotate') === -1) {
					this.$refs.singerImg.classList.add('rotate');
				} else {
					this.$refs.singerImg.style["webkitAnimationPlayState"] = "running";
					this.$refs.singerImg.style["animationPlayState"] = "running";
				}
			},
			stopImgRotate(){  //停止旋转图片
				this.$refs.singerImg.style["webkitAnimationPlayState"] = "paused";
				this.$refs.singerImg.style["animationPlayState"] = "paused";
			},
			showPlayList(){  //显示播放列表
				this.$emit('show-list', true)
			},
			changePlayMode(){  //改变播放模式
				if (this.currentPlayMode === this.playModes.length - 1) {
					this.currentPlayMode = 0;
				} else {
					this.currentPlayMode++;
				}
			},
			handleDrag(progress){  //开始拖拽
				let audioDOM = this.$refs.audio;
				if (audioDOM.duration > 0) {
					audioDOM.pause();
					this.stopImgRotate();
					this.playStatus = false;
					this.dragProgress = progress;
				}
			},
			handleDragEnd(){  //拖拽结束
				let audioDOM = this.$refs.audio;
				if (audioDOM.duration > 0) {
					let currentTime = audioDOM.duration * this.dragProgress;
					this.playProgress = this.dragProgress;
					this.currentTime = currentTime;
					this.$nextTick(() => {
						audioDOM.currentTime = currentTime;
						audioDOM.play();
						this.startImgRotate();
						this.playStatus = true;
						this.dragProgress = 0;
					})
				}
			},
			getTime(second){
				second = Math.floor(second);
				let minute = Math.floor(second / 60);
				second = second - minute * 60;
				return minute + ":" + this.formatTime(second);
			},
			formatTime(time){
				let timeStr = "00";
				if (time > 0 && time < 10) {
					timeStr = "0" + time;
				} else if (time >= 10) {
					timeStr = time;
				}
				return timeStr;
			}
		}
	}
</script>
