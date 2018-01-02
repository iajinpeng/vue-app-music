<template>
	<div class="music-player">
		<Player @show-list="showList"
			:currentIndex.sync="currentSongIndex">
		</Player>
	</div>
</template>
<script>
	import Player from './Player.vue';

	export default {
		components: {Player},
		data(){
			return {
				currentSongIndex: 0,
				show: false,
			}
		},
		methods: {
			showList(status){
				this.show = status;
			}
		}
	}
</script>
