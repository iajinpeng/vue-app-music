/**
 * Created by jinpeng on 2017/12/29.
 */

import * as types from './mutation-types'

export default {
	[types.SHOW_PLAYER] (state, {showStatus}){
		state.showStatus = showStatus
	},

	[types.CHANGE_SONG] (state, {song}){
		state.song = song
	},

	[types.SET_SONGS] (state, {songs}){
		state.songs = songs
	},

	[types.REMOVE_SONG_FROM_LIST] (state, {id}){
		state.songs.filter(song => song.id !== id)
	}
}
