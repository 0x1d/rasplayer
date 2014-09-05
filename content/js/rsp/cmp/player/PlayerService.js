define([
	'jquery',
	'rsp/config'
], function($, config) {

	var play = function(path, fromPlaylist, callback){
		$.getJSON(config.service.play + path + '/', {
			playlist: fromPlaylist
		}, function(data){
			if(callback) {
				callback(data);
			}
		});
	};

	var stop = function(){
		$.getJSON(config.service.stop);
	};

	var pause = function(){
		$.getJSON(config.service.pause);
	};

	var resume = function(){
		$.getJSON(config.service.resume);
	};

	var getCurrentPlaylist = function(callback){
		$.getJSON(config.service.playlist, callback);
	};

	var queue = function(path, callback){
		$.getJSON(config.service.queue + path +'/', callback);
	};

	var next = function(callback){
		$.getJSON(config.service.next, callback);
	};

	var back = function(callback){
		$.getJSON(config.service.back, callback);
	};

	var currentTrack = function(callback){
		$.getJSON(config.service.currentTrack, callback);
	};

	var increaseVolume = function(callback){
		$.getJSON(config.service.increaseVolume, callback);
	};

	var decreaseVolume = function(callback){
		$.getJSON(config.service.decreaseVolume, callback);
	};

	return {
		play : play,
		stop : stop,
		pause: pause,
		resume : resume,
		getCurrentPlaylist : getCurrentPlaylist,
		queue : queue,
		next : next,
		back : back,
		currentTrack : currentTrack,
		increaseVolume : increaseVolume,
		decreaseVolume : decreaseVolume
	};
});