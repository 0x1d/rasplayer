define(function() {
	var config = {
		music : {
			path: '/mnt/smbdisk'
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
			currentTrack: '/rsp/currentTrack/'
		}
	};
	return config;
});