define([
	'rsp/cmp/player/PlayerController',
	'rsp/cmp/playlist/PlaylistController',
	'rsp/cmp/library/LibraryView'
], function(player, playlist, library){

	var rsp = {
		player : {
			next : {
				handler : player.playNext,
				trigger :  [ player.renderControl, playlist.renderPlaylist ]
			},
			back : {
				handler : player.playLast,
				trigger :  [ player.renderControl, playlist.renderPlaylist ]
			},
			render : {
				handler : player.renderControl
			},
			stop : {
				handler : player.stop,
				trigger : [ player.renderControl ]
			},
			togglePlay : {
				handler : player.togglePlay,
				trigger : [ player.renderControl ]
			},
			increaseVolume : {
				handler : player.increaseVolume
			},
			decreaseVolume : {
				handler : player.decreaseVolume
			},
			clearPlaylist : {
				handler : player.clearPlaylist,
				trigger :  [ player.refreshControl, playlist.renderPlaylist, playlist.renderPlaylist2 ]
			},
			toggleLanguage : {
				handler : player.toggleLanguage
			}
		},
		playlist : {
			render : {
				handler : playlist.renderPlaylist
			},
			show : {
				handler : playlist.renderPlaylist,
				trigger : [ player.refreshControl, player.resize ]
			},
			show2 : {
				handler : playlist.renderPlaylist2,
				trigger : [ player.refreshControl, player.resize ]
			},
			item : {
				click : {
					handler : player.playlistItemPlay,
					trigger : [ player.renderControl, playlist.renderPlaylist ]
				}
			}
		},
		library : {
			item : {
				queue : {
					handler : playlist.queueItem,
					trigger : [ player.resize ]
				},
				click : {
					handler : player.playTrack,
					trigger : [ player.resize ]
				}
			},
			show : {
				handler : library.show
			}
		},
		view : {
			resize : {
				handler : player.resize
			}
		}
	};

	var	delegate = {
			'#rsp-player-control' : {
				click : {
					'.rsp-control.next' : rsp.player.next,
					'.rsp-control.back' : rsp.player.back,
					'.rsp-control.stop' : rsp.player.stop,
					'.rsp-control.play' : rsp.player.togglePlay,
					'.rsp-control.pause' : rsp.player.togglePlay,
					'.rsp-control.volume-up' : rsp.player.increaseVolume,
					'.rsp-control.volume-down' : rsp.player.decreaseVolume,
					'.rsp-control.clear' : rsp.player.clearPlaylist,
					'.rsp-control.language' : rsp.player.toggleLanguage
				}
			},
			'#rsp-library' : {
				click : {
					'.rsp-item-queue' : rsp.library.item.queue,
					'a' : rsp.library.item.click
				}
			},
			'#rsp-playlist' : {
				click : {
					'.rsp-playlist-item' : rsp.playlist.item.click
				}
			},
			'#rsp-menu-playlist' : {
				click : {
					'.rsp-playlist-toggle' : rsp.playlist.show
				}
			},
			'.menubar' : {
				click : {
					'.rsp-show-playlist' : rsp.playlist.show2,
					'.rsp-show-library' : rsp.library.show
				}
			}/*,
			'body' : {
				'swl' : {
					'.inner-wrap' : rsp.playlist.show
				}
			}*/
	};

	return {
		delegate : delegate
	};


});
