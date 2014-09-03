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
			library.update(href);
		} else {
			playerService.play(href, playlist, function(id3tag){
				callback.trigger(id3tag);
			});
		}
	};

	var playlistItemPlay = function(item){
		event.preventDefault();
		playTrack(item, true, this);
	};

	var renderControl = function(id3tag){
		view.render(id3tag);
	};

	var refreshControl = function(id3tag){
		playerService.currentTrack(function(tag){
			renderControl(tag);
		});
	};

	var resize = function(){
		var rightHeight = $('#rsp-right').height();
		var libraryHeight = $('#rsp-library').height();
		var contentHeight = rightHeight > libraryHeight ? rightHeight : libraryHeight;
		$('.main-section').css("height", contentHeight);
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

	var run = function(){
	};

	return {
		run : run,
		playNext : playNext,
		playLast : playLast,
		stop : stop,
		togglePlay : togglePlay,
		renderControl : renderControl,
		playTrack : playTrack,
		playlistItemPlay : playlistItemPlay,
		resize : resize,
		refreshControl : refreshControl
	};
});
