define([
	'rsp/cmp/player/PlayerController',
	'rsp/cmp/playlist/PlaylistController'
], function(player, playlist){

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
			}
		},
		playlist : {
			render : {
				handler : playlist.renderPlaylist
			},
			show : {
				handler : playlist.renderPlaylist,
				trigger : [ player.refreshControl ]
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
					handler : player.playTrack
				}
			}
		},
		view : {
			resize : player.resize
		}
	};

	var	delegate = {
			'#rsp-player-control' : {
				click : {
					'.rsp-control.next' : rsp.player.next,
					'.rsp-control.back' : rsp.player.back,
					'.rsp-control.stop' : rsp.player.stop,
					'.rsp-control.play' : rsp.player.togglePlay,
					'.rsp-control.pause' : rsp.player.togglePlay
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
