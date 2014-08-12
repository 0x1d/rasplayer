define([
	'rsp/cmp/player/PlayerController',
	'rsp/cmp/playlist/PlaylistController'
], function(player, playlist){

	return {

		delegate : {
			'#rsp-player-control' : {
				click : {
					'.rsp-control.next' : 'rsp.player.next',
					'.rsp-control.back' : 'rsp.player.back',
					'.rsp-control.stop' : 'rsp.player.stop',
					'.rsp-control.play' : 'rsp.player.togglePlay',
					'.rsp-control.pause' : 'rsp.player.togglePlay'
				}
			},
			'#rsp-library' : {
				click : {
					'.rsp-item-queue' : 'rsp.library.item.queue'
				}
			},
			'#rsp-playlist' : {
				click : {
					'.rsp-playlist-item' : 'rsp.playlist.item.click'
				}
			}
		},

		events : {
			'rsp.player.next': {
				handler : player.playNext,
				trigger : [ 
					'rsp.playlist.render',
					'rsp.player.control.render' 
				],
			},
			'rsp.player.back': {
				handler : player.playLast,
				trigger : [ 
					'rsp.playlist.render',
					'rsp.player.control.render' 
				],
			},
			'rsp.player.stop': {
				handler : player.stop,
				trigger : [ 'rsp.player.control.render' ],
			},
			'rsp.player.togglePlay': {
				handler : player.togglePlay,
				trigger : [ 'rsp.player.control.render' ],
			},			
			'rsp.player.control.render' : {
				handler : player.renderControl
			},
			'rsp.playlist.render' : {
				handler : playlist.renderPlaylist
			},
			'rsp.playlist.item.click' : {
				handler : player.playlistItemPlay,
				trigger : [ 
					'rsp.playlist.render',
					'rsp.player.control.render'
				]
			},
			'rsp.library.item.queue' : {
				handler : playlist.queueItem,
				trigger : [ 'rsp.resize' ]
			},
			'rsp.resize' : {
				handler : player.resize
			}
		},

	};

});
