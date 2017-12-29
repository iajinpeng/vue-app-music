<template>
	<div class="player" ref="player" v-if="showStatus">
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
					<span class="current-time"></span>
					<div class="play-progress">

					</div>
					<span class="total-time">{{getTime(song.duration)}}</span>
				</div>
				<div class="play-wrapper">
					<div class="play-model-button">
						<i class="icon-list-play"></i>
					</div>
					<div class="previous-button">
						<i class="icon-previous"></i>
					</div>
					<div class="play-button">
						<i class="icon-play"></i>
					</div>
					<div class="next-button">
						<i class="icon-next"></i>
					</div>
					<div class="play-list-button">
						<i class="icon-play-list"></i>
					</div>
				</div>
			</div>
		</div>
		<div class="player-bg" :style="`background-image: url(${playBg})`"></div>
		<audio ref="audio"></audio>
	</div>

	<!--<mini-player></mini-player>-->
</template>
<script>
	import "./player.styl"
	import {Song} from "@/model/song"
	import { mapGetters, mapActions } from 'vuex'

	export default {
		data(){
			return {

			}
		},
		computed: {
			...mapGetters(['showStatus', 'song', 'allSongs']),
			playBg(){
				return this.song.img ? this.song.img : '../../assets/imgs/play_bg.jpg';
			}
		},
		methods: {
			...mapActions(['showPlayer', 'changeSong', 'removeSong', 'setSongs']),

			getTime(second){
				second = Math.floor(second);
				let minute = Math.floor(second / 60);
				second = second - minute * 60;
				return minute  + ":" + this.formatTime(second);
			},
			formatTime(time){
				let timeStr = "00";
				if(time > 0 && time < 10){
					timeStr = "0" + time;
				}else if(time >= 10){
					timeStr = time;
				}
				return timeStr;
			}
		}
	}
</script>
