define(function() {
	var config = {
		music : {
			path: '/media'
		},
		service: {
			play: '/rsp/play',
			pause: '/rsp/pause/',
			resume: '/rsp/resume/',
			stop: '/rsp/stop/',
			next: '/rsp/next/',
			back: '/rsp/back/',
			queue: '/rsp/queue',
			playlist: '/rsp/playlist/',
			currentTrack: '/rsp/currentTrack/',
			increaseVolume: '/rsp/increaseVolume/',
			decreaseVolume: '/rsp/decreaseVolume/',
			toggleLanguage : '/rsp/toggleLanguage/',
			clearPlaylist : '/rsp/clearPlaylist/'
		}
	};
	return config;
});
