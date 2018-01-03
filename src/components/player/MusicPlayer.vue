<template>
	<div class="music-player">
		<Player @show-list="showList"
						:currentIndex.sync="currentSongIndex">
		</Player>
		<Player-list :currentIndex.sync="currentSongIndex"
								 @show-list="showList"
								 :show="show">
		</Player-list>
	</div>
</template>
<script>
	import Player from './Player';
	import PlayerList from './PlayerList'

	export default {
		components: {Player, PlayerList},
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
