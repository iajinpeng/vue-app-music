/**
 * Created by jinpeng on 2017/12/29.
 */

import * as types from './mutation-types'

export const showPlayer = ({commit}, showStatus) => {
	commit(types.SHOW_PLAYER, showStatus)
}

export const autoPlay = ({commit}, playStatus) => {
	commit(types.IS_PLAY, playStatus)
}

export const changeSong = ({commit}, song) => {
	commit(types.CHANGE_SONG, song)
}

export const removeSong = ({commit}, id) => {
	commit(types.REMOVE_SONG_FROM_LIST, id)
}

export const setSongs = ({commit}, songs) => {
	commit(types.SET_SONGS, songs)
}

export const addSongs = ({commit}, songs) => {
	commit(types.ADD_SONGS, songs)
}

export const selectAndAutoplay = ({commit}, songs) => {  //选择歌曲自动播放
	if(Array.isArray(songs)){
		commit(types.ADD_SONGS, songs);
		commit(types.CHANGE_SONG, songs[0]);
	}else{
		commit(types.ADD_SONGS, [songs]);
		commit(types.CHANGE_SONG, songs);
	}
	commit(types.SHOW_PLAYER, true);
	commit(types.IS_PLAY, true);
}
