/**
 * Created by jinpeng on 2017/12/29.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'


Vue.use(Vuex);

const state = {
	showStatus: false,
	playStatus: false,  //是否播放
	song: {},  //当前歌曲
	songs: [],  //歌曲列表
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})
