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
        </div>
        <router-view/>
    </div>
</template>

<script>
	import './index.css'
    import './App.styl'
	export default {
		name: 'app'
	}
</script>

