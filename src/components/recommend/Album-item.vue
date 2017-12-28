<template>
    <div class="album-wrapper">
        <div class="left">
            <img :src="album.img" :alt="album.name" width="100%" height="100%">
        </div><!--
        --><div class="right">
            <div class="album-name">{{album.name}}</div>
            <div class="singer-name">{{album.singer}}</div>
            <div class="public-time">{{album.publicTime}}</div>
        </div>
    </div>
</template>
<script>
	import * as AlbumModel from '@/model/album'
    export default{
    	props: ['info'],
        computed: {
            album(){
            	return AlbumModel.createAlbumByList(this.info);
            }
        },
    }
</script>