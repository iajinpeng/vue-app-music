<template>
	<Scroll ref="scroll" @pulldown="handlePullDown" @scroll="handleScroll">
		<div class="music-recommend">
			<pull-down :height="pullDownHeight"></pull-down>
			<div class="slider-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(slider, index) in slideList">
						<a class="slider-nav">
							<img :src="slider.picUrl" alt="推荐" width="100%" height="100%">
						</a>
					</div>
				</div>
				<div class="swiper-pagination"></div>
			</div>
			<div class="album-container">
				<h1 class="title">最新专辑</h1>
				<div class="album-list">
					<div class="album-wrapper" @click="toAlbumDetail(album)"
							 v-for="album in newAlbums.map(item => albumCreateByList(item))">
						<div class="left">
							<img :src="album.img" :alt="album.name" width="100%" height="100%">
						</div><!--
        --><div class="right">
						<div class="album-name">{{album.name}}</div>
						<div class="singer-name">{{album.singer}}</div>
						<div class="public-time">{{album.publicTime}}</div>
					</div>
					</div>
				</div>
			</div>
		</div>
		<Loading title="正在加载..." :show="loading"></Loading>
		<router-view/>
	</Scroll>
</template>
<script>
  import {getCarousel, getNewAlbum} from '@/api/recommend'
  import {CODE_SUCCESS} from '@/api/config'
  import Swiper from 'swiper'
  import Scroll from '@/common/scroll/Scroll'
  import Loading from '@/common/loading/Loading'
  import PullDown from '@/common/pulldown/PullDown'
	import * as AlbumModel from '@/model/album'

  import './recommend.styl';
  import 'swiper/dist/css/swiper.css'

  export default {
    components: {
      Scroll, Loading, PullDown
    },
    data() {
      return {
        loading: true,
        slideList: [],
        newAlbums: [],
        sliderSwiper: null,
				pullDownHeight: 0,
      }
    },
		beforeRouteLeave(to, from, next){
			this.$refs.scroll.refresh();
    	next();
		},
    mounted() {
      getCarousel().then((res) => {
        console.log('获取轮播图数据');
        if (res) {
          console.log(res);
          if (res.code === CODE_SUCCESS) {
            this.slideList = res.data.slider;
            this.$nextTick(() => {
              if (!this.sliderSwiper) {
                //初始化轮播图
                this.sliderSwiper = new Swiper('.slider-container', {
                  loop: true,
                  autoplay: 5000,
                  autoplayDisableOnInteraction: false,
                  pagination: '.swiper-pagination',
                })

              }
            })
          }
        }
      });
      this.getNewAlbum();
    },
		methods: {
			toAlbumDetail(album) {
				this.$router.push({name: 'album', params: {id: album.mId}});
			},
			albumCreateByList(list){
				return AlbumModel.createAlbumByList(list)
			},
			handlePullDown({y}){
				if(this.$router.history.current.name === 'recommend' && y > 50){  //修正子路由页面scroll也会请求的问题
					this.getNewAlbum();
				}
			},
			handleScroll({y}){
				this.pullDownHeight = y;
			},
			getNewAlbum(){
				getNewAlbum().then((res) => {
					console.log('获取最新专辑');
					if (res) {
						console.log(res);
						if (res.code === CODE_SUCCESS) {
							//根据发布时间降序
							let albumList = res.albumlib.data.list;
							albumList.sort((a, b) => {
								return new Date(b.public_time).getTime() - new Date(a.public_time).getTime();
							});
							this.loading = false;
							this.newAlbums = albumList;
							this.$refs.scroll.refresh();
						}
					}
				})
			}
		},
  }
</script>
