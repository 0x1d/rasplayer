define([
	'jquery',
	'sui/mediator',
	'rsp/cmp/player/ControlView',
	'rsp/cmp/library/LibraryController',
	'rsp/cmp/player/PlayerService'
], function($, mediator, view, library, playerService) {

	var playTrack = function(item, playlist, callback){
		event.preventDefault();
		var href = playlist ? '/'+item.getAttribute('data-trackid') : item.getAttribute('href');
		if(item.getAttribute('data-isfolder') === 'true'){
			library.update(href, this.trigger);
		} else {
			playerService.play(href, playlist, function(id3tag){
				if(callback && callback.trigger){
					callback.trigger(id3tag);
				}
			});
		}
	};

	var playlistItemPlay = function(item){
		event.preventDefault();
		playTrack(item, true, this);
	};

	var renderCurrentTrack = function(id3tag){
		view.renderCurrentTrack(id3tag);
	};

	var refreshControl = function(){
		playerService.currentTrack(function(tag){
			renderCurrentTrack(tag);
		});
	};

	var playNext = function(){
		playerService.next(this.trigger);
	};

	var playLast = function(){
		playerService.back(this.trigger);
	};

	var stop = function(){
		playerService.stop();
		togglePlayButton($('.rsp-control.toggle'));
	};

	var togglePlay = function(btn){
		var btn = $(btn);
		var state = togglePlayButton(btn);
		if(state === 'play'){
			playerService.pause();
		} else {
			playerService.resume();
		}
	};

	var togglePlayButton = function(btn){
		if(btn.hasClass('play')){
			btn.addClass('pause');
			btn.removeClass('play');
			return 'pause';
		} else {
			btn.addClass('play');
			btn.removeClass('pause');
			return 'play';
		}
	};

	var decreaseVolume = function(){
		playerService.decreaseVolume();
    };

    var increaseVolume = function(){
		playerService.increaseVolume();
    };

    var toggleLanguage = function(){
		playerService.toggleLanguage();
    };

    var clearPlaylist = function(){
		playerService.clearPlaylist(this.trigger);
    };

	var run = function(){
		view.render();
		setInterval(function(){
			refreshControl();
		}, 2500);
	};

	return {
		run : run,
		playNext : playNext,
		playLast : playLast,
		stop : stop,
		togglePlay : togglePlay,
		renderCurrentTrack : renderCurrentTrack,
		playTrack : playTrack,
		playlistItemPlay : playlistItemPlay,
		refreshControl : refreshControl,
		increaseVolume : increaseVolume,
		decreaseVolume : decreaseVolume,
		clearPlaylist : clearPlaylist,
		toggleLanguage : toggleLanguage
	};
});
