define([
	'rsp/cmp/player/PlayerController',
	'rsp/cmp/playlist/PlaylistController',
	'rsp/cmp/library/LibraryController'
], function(player, playlist, library){

	var rsp = {
		player : {
			next : {
				handler : player.playNext,
				trigger :  [ player.renderControl ]
			},
			back : {
				handler : player.playLast,
				trigger :  [ player.renderControl ]
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
				trigger :  [ player.refreshControl ]
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
				handler : playlist.show,
				trigger : [ player.refreshControl ]
			},
			item : {
				click : {
					handler : player.playlistItemPlay,
					trigger : [ player.refreshControl, playlist.renderPlaylist ]
				}
			}
		},
		library : {
			item : {
				queue : {
					handler : playlist.queueItem
				},
				click : {
					handler : player.playTrack
				}
			},
			show : {
				handler : library.show
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
			'#content' : {
				click : {
					'.rsp-item-queue' : rsp.library.item.queue,
					'.rsp-library-item' : rsp.library.item.click,
					'.rsp-playlist-item' : rsp.playlist.item.click
				}
			},
			'.menubar' : {
				click : {
					'.rsp-show-playlist' : rsp.playlist.show,
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
