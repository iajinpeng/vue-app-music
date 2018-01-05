<template>
	<div class="music-search">
		<div class="search-box-wrapper">
			<div class="search-box">
				<i class="icon-search"></i><!--
				--><input type="text" class="search-input" placeholder="搜索歌曲、歌手、专辑"
									v-model="w"
									@keyup.enter="search(w)">
			</div>
			<div class="cancel-button" v-show="!!w" @click="handleCancel">取消</div>
		</div>
		<div class="search-hot" v-show="!w">
			<h1 class="title">热门搜索</h1>
			<div class="hot-list">
				<div class="hot-item" v-for="(hot, index) in hotKeys" v-if="index <= 10" @click="handleSearch(hot)">{{hot.k}}</div>
			</div>
		</div>
		<div class="search-result" v-show="w">
			<Scroll ref="scroll">
				<div>
					<!--专辑-->
					<div class="album-wrapper" v-if="album.id" @click="handleClick(album.mId, 'album')">
						<div class="left">
							<img :src="album.img" :alt="album.name">
						</div><!--
						--><div class="right">
							<div class="song">{{album.name}}</div>
							<div class="singer">{{album.singer}}</div>
						</div>
					</div>
					<!--歌手-->
					<div class="singer-wrapper" v-if="singer.id" @click="handleClick(singer.mId, 'singer')">
						<div class="left">
							<img :src="singer.img" :alt="singer.name">
						</div><!--
						--><div class="right">
							<div class="song">{{singer.name}}</div>
							<div class="singer">单曲{{singer.songnum}} 专辑{{singer.albumnum}}</div>
						</div>
					</div>
					<!--歌曲列表-->
					<div class="song-wrapper" v-for="song in songs" @click="handleClick(song, 'song')">
						<div class="left">
							<i class="icon-fe-music"></i>
						</div><!--
						--><div class="right">
							<div class="song">{{song.name}}</div>
							<div class="singer">{{song.singer}}</div>
						</div>
					</div>
				</div>
				<Loading title="正在加载..." :show="loading"></Loading>
			</Scroll>
		</div>
	</div>
</template>
<script>
	import './search.styl'

	import Scroll from '@/common/scroll/Scroll'
	import Loading from '@/common/loading/Loading'
	import {getHotKey, search} from "@/api/search"
	import {getSongVKey} from "@/api/song"
	import {CODE_SUCCESS} from "@/api/config"
	import * as SingerModel from "@/model/singer"
	import * as AlbumModel from "@/model/album"
	import * as SongModel from "@/model/song"
	import {mapGetters, mapActions} from 'vuex'

	export default {
		components: {Scroll, Loading},
		data(){
			return {
				hotKeys: [],
				singer: {},
				album: {},
				songs: [],
				w: '',
				loading: false
			}
		},
		mounted(){
			getHotKey().then(res => {  //获取热搜词
				if (res) {
					if (res.code === CODE_SUCCESS) {
						this.hotKeys = res.data.hotkey;
					}
				}
			})
		},
		methods: {
			...mapActions(['showPlayer', 'changeSong', 'selectAndAutoplay']),

			handleCancel(){
				this.w = '';
				this.album = {};
				this.songs = [];
			},
			handleSearch({k}){
				this.w = k;
				this.search(k);
			},
			handleClick(data, type){
				switch (type){
					case 'album':
						this.$router.push({name: 'album', params: {id: data}});
						break;
					case 'singer':

						break;
					case 'song':
						getSongVKey(data.mId).then(res => {
							if(res){
								if(res.code === CODE_SUCCESS){
									if(res.data.items){
										let item = res.data.items[0];
										data.url =  `http://dl.stream.qqmusic.qq.com/${item.filename}?vkey=${item.vkey}&guid=3655047200&fromtag=66`;
										this.selectAndAutoplay([data]);
									}
								}
							}
						})
				}
			},
			search(w){
				this.loading = true;
				search(w).then(res => {
					if (res) {
						if (res.code === CODE_SUCCESS) {
							let zhida = res.data.zhida;
							let type = zhida.type;
							let singer = {};
							let album = {};
							switch (type) {
								//0：表示歌曲
								case 0:
									break;
								//2：表示歌手
								case 2:
									singer = SingerModel.createSingerBySearch(zhida);
									singer.songnum = zhida.songnum;
									singer.albumnum = zhida.albumnum;
									break;
								//3: 表示专辑
								case 3:
									album = AlbumModel.createAlbumBySearch(zhida);
									break;
								default:
									break;
							}
							let songs = [];
							res.data.song.list.forEach((data) => {
								if (data.pay.payplay === 1) {
									return
								}
								songs.push(SongModel.createSong(data));
							});
							this.album = album;
							this.singer = singer;
							this.songs = songs;
							this.loading = false;
							this.$nextTick(() => {
								this.$refs.scroll.refresh();
							})
						}
					}
				})
			}
		}
	}
</script>
