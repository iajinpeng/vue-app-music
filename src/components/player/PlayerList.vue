<template>
	<div class="player-list">
		<transition name="fade" @enter="handleShowList(true)" @leave="handleShowList(false)"
								@after-enter="scrollRefresh">
			<div class="play-list-bg" v-show="show" @click.self="hidePlayList">
				<transition name="slidebottom">
					<div class="play-list-wrap" v-show="showList">
						<div class="play-list-head">
							<span class="head-title">播放列表</span>
							<span class="close" @click="hidePlayList">关闭</span>
						</div>
						<div class="play-list">
							<Scroll ref="scroll">
								<div>
									<div class="play-list-item" v-for="(song, index) in songs">
										<div class="item-left">{{index + 1 < 10 ? `0${index + 1}` : index + 1}}</div>
										<div class="item-right">
											<div class="song" :class="{current: index === currentIndex}" @click="playSong(song, index)">
												<span class="song-name">{{song.name}}</span>
												<span class="song-singer">{{song.singer}}</span>
											</div>
											<i class="icon-delete delete" @click="removeSong(song.id)"></i>
										</div>
									</div>
								</div>
							</Scroll>
						</div>
					</div>
				</transition>
			</div>
		</transition>
	</div>
</template>
<script>
	import './playerlist.styl'
	import {mapGetters, mapActions} from 'vuex'
	import Scroll from '@/common/scroll/Scroll'

	export default {
		components: {Scroll},
		data(){
			return {
				showList: false,
			}
		},
		props: ['show', 'currentIndex'],
		computed: {
			...mapGetters(['song', 'songs']),
		},
		methods: {
			...mapActions(['changeSong', 'removeSong']),
			hidePlayList(){
				this.$emit('show-list', false)
			},
			handleShowList(status){
				setTimeout(() => {
					this.showList = status;
				},)
			},
			scrollRefresh(){
				this.$refs.scroll.refresh();  //调用Scroll组件的刷新方法
			},
			playSong(song, index){
				this.changeSong(song);
				this.$emit('update:currentIndex', index);
			}
		}
	}
</script>
