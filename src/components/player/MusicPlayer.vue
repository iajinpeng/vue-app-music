<template>
	<div class="music-player">
		<Player @show-list="showList">
		</Player>
		<Player-list @show-list="showList"
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
				show: false
			}
		},
		methods: {
			showList(status){
				this.show = status;
			}
		}
	}
</script>
