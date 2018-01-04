/**
 * Created by jinpeng on 2017/12/29.
 */

import * as types from './mutation-types'

export default {
	[types.SHOW_PLAYER] (state, showStatus){
		state.showStatus = showStatus
	},

	[types.IS_PLAY] (state, playStatus){
		state.playStatus = playStatus
	},

	[types.CHANGE_SONG] (state, song){
		state.song = song
	},

	[types.SET_SONGS] (state, songs){
		state.songs = songs;
	},

	[types.REMOVE_SONG_FROM_LIST] (state, id){
		state.songs = state.songs.filter(song => song.id !== id)
	},

	[types.ADD_SONGS] (state, songs){
		state.songs = unique(state.songs.concat(songs));
	}
}

function unique(arr) {  //根据id去重
	var result = [], isRepeated;
	for (var i = 0; i < arr.length; i++) {
		isRepeated = false;
		for (var j = 0; j < result.length; j++) {
			if (arr[i].id === result[j].id) {
				isRepeated = true;
				break;
			}
		}
		if (!isRepeated) {
			result.push(arr[i]);
		}
	}
	return result;
}
