<template>
  <transition name="slide">
    <div class="music-album">
      <music-header :title="album.name"></music-header>
      <div style="position: relative;">
        <div ref="albumBg" class="album-img" :style="`background-image: url(${album.img})`">
          <div class="filter"></div>
        </div>
        <div ref="albumFixedBg" class="album-img fixed" :style="`background-image: url(${album.img})`">
          <div class="filter"></div>
        </div>
        <div class="play-wrapper" ref="playButtonWrapper" @click="playAll">
          <div class="play-button">
            <i class="icon-play"></i><span>播放全部</span>
          </div>
        </div>
      </div>
      <div ref="albumContainer" class="album-container">
        <div class="album-scroll" v-show="!loading">
          <Scroll :refresh="refreshScroll" @scroll="scroll">
            <div class="album-wrapper">
              <div class="song-count">专辑 共{{songs.length}}首</div>
              <div class="song-list">
                <div class="song" v-for="(song, index) in songs" :key="index" @click="selectSong(song)">
                  <div class="song-name">{{song.name}}</div>
                  <div class="song-singer">{{song.singer}}</div>
                </div>
              </div>
              <div class="album-info" v-if="album.desc">
                <h1 class="album-title">专辑简介</h1>
                <div class="album-desc">{{album.desc}}</div>
              </div>
            </div>
          </Scroll>
          <Loading title="正在加载..." :show="loading"></Loading>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import MusicHeader from '@/common/header/Header'
  import Scroll from '@/common/scroll/Scroll'
  import Loading from '@/common/loading/Loading'
  import {getAlbumInfo} from '@/api/recommend'
  import {getSongVKey} from '@/api/song'
  import {CODE_SUCCESS} from '@/api/config'
  import * as AlbumModel from '@/model/album'
  import * as SongModel from '@/model/song'
	import { mapGetters, mapActions } from 'vuex'

  import './album.styl'

  export default {
    components: {MusicHeader, Scroll, Loading},
    data() {
      return {
        loading: true,
        album: {},
        songs: [],
        refreshScroll: false,
      }
    },
    methods: {
			...mapActions(['showPlayer', 'changeSong', 'removeSong', 'setSongs']),
      getSongUrl(song, mId) {
        getSongVKey(mId).then((res) => {
          if (res && res.code === CODE_SUCCESS) {
            if (res.data.items) {
              let item = res.data.items[0];
              song.url = `http://dl.stream.qqmusic.qq.com/${item.filename}?vkey=${item.vkey}&guid=3655047200&fromtag=66`;
            }
          }
        })
      },
			selectSong(song){  //选择歌曲
				this.setSongs([song]);
				this.changeSong(song);
				this.showPlayer(true);

			},
			playAll(){  //播放全部
				if(this.songs.length !== 0){
					this.setSongs(this.songs);
					this.changeSong(this.songs[0]);
					this.showPlayer(false);
				}
			},
      scroll({y}) {
        let albumBgDOM = this.$refs.albumBg;
        let albumFixedBgDOM = this.$refs.albumFixedBg;
        let playButtonWrapperDOM = this.$refs.playButtonWrapper;
        if (y < 0) {
          if (Math.abs(y) + 55 > albumBgDOM.offsetHeight) {
            albumFixedBgDOM.style.display = 'block';
          } else {
            albumFixedBgDOM.style.display = 'none';
          }
        } else {
          let transform = `scale(${1 + y * 0.004}, ${1 + y * 0.004})`;
          albumBgDOM.style['webkitTransform'] = transform;
          albumBgDOM.style['transform'] = transform;
          playButtonWrapperDOM.style.marginTop = `${y}px`;
        }
      }
    },
    mounted() {
      let albumBgDOM = this.$refs.albumBg;
      let albumContainerDOM = this.$refs.albumContainer;
      albumContainerDOM.style.top = albumBgDOM.offsetHeight + 'px';

      getAlbumInfo(this.$route.params.id).then((res) => {
        console.log('获取专辑详情');
        if (res) {
          console.log(res);
          if (res.code === CODE_SUCCESS) {
            let album = AlbumModel.createAlbumByDetail(res.data);
            album.desc = res.data.desc;

            let songList = res.data.list;
            let songs = [];
            songList.forEach(item => {
              let song = SongModel.createSong(item);
              this.getSongUrl(song, item.songmid);
              songs.push(song);
            });
            this.loading = false;
            this.album = album;
            this.songs = songs;
          }
        }
      })
    }
  }
</script>
