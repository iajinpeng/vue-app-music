<template>
  <div id="app">
    <div class="app">
      <header class="app-header">
        <img src="./assets/imgs/logo.png" alt="logo" class="app-logo">
        <h1 class="app-title">我的音乐</h1>
      </header>
      <div class="music-tab">
        <div class="tab-item selected">
          <router-link to="recommend" class="nav-link">推荐</router-link>
        </div>
        <div class="tab-item">
          <router-link to="ranking" class="nav-link">排行榜</router-link>
        </div>
        <div class="tab-item">
          <router-link to="search" class="nav-link">搜索</router-link>
        </div>
      </div>
      <div class="music-view">
				<keep-alive>
					<router-view/>
				</keep-alive>
      </div>
			<music-player />
    </div>
  </div>
</template>

<script>
	import MusicPlayer from './components/player/MusicPlayer.vue'
  import './App.styl'
  import './assets/stylus/reset.styl'
  import './assets/stylus/font.styl'

  export default {
		components: {MusicPlayer},
    name: 'app',
		created(){
			var songs = localStorage.getItem('my-song-cache');
			if(songs){
				this.$store.dispatch('setSongs', JSON.parse(songs));
				this.$store.dispatch('changeSong', JSON.parse(songs)[0]);
			}
		},
  }
</script>
<style>
  body, html, #app {
    width: 100%;
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
</style>

