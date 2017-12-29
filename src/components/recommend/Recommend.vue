<template>
  <Scroll :refresh="refreshScroll">

    <div class="music-recommend">
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
          <album-item v-for="(item, index) in newAlbums"
                      @click.native="toAlbumDetail(item)"
                      :info="item" :key="index">
          </album-item>
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
  import AlbumItem from './Album-item.vue'

  import './recommend.styl';
  import 'swiper/dist/css/swiper.css'

  export default {
    components: {
      AlbumItem, Scroll, Loading
    },
    data() {
      return {
        loading: true,
        slideList: [],
        newAlbums: [],
        refreshScroll: false,
        sliderSwiper: null,
      }
    },
    methods: {
      toAlbumDetail(album) {
        let url = this.$route.path + '/' + album.album_mid;
        this.$router.push({name: 'album', params: {id: album.album_mid}});
      }
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
            this.refreshScroll = true;
          }
        }
      })
    }
  }
</script>
