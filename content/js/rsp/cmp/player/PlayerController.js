define([
	'jquery',
	'sui/mediator',
	'rsp/cmp/player/ControlView',
	'rsp/cmp/library/LibraryController',
	'rsp/cmp/player/PlayerService'
], function($, mediator, view, library, playerService) {

	var playTrack = function(item, playlist, callback){
		var href = playlist ? '/'+item.getAttribute('data-trackid') : item.getAttribute('href');
		if(item.getAttribute('data-isfolder') === 'true'){
			library.update(href);
		} else {
			playerService.play(href, playlist, function(id3tag){
				//mediator.trigger('rsp.player.track.play', id3tag);
				//renderControl(id3tag);
				callback.trigger(id3tag);
				//onRerender();
				//$('.off-canvas-wrap').addClass('move-left');
			});
		}
		window.scrollTo(0,0);
	};

	var playlistItemPlay = function(item){
		event.preventDefault();
		playTrack(item, true, this);
	};

	var renderControl = function(id3tag){
		view.render(id3tag);
	};

	var onRerenderControl = function(id3tag){
		mediator.on('rsp.player.control.rerender', function(){
			playerService.currentTrack(function(tag){
				renderControl(tag);
			});
		});
	};

	var resize = function(){
		//mediator.on('rsp.rerender', function(){
			var rightHeight = $('#rsp-right').height();
			var libraryHeight = $('#rsp-library').height();
			var contentHeight = rightHeight > libraryHeight ? rightHeight : libraryHeight;
			$('.main-section').css("height", contentHeight);
			window.scrollTo(0,0);
		//});
	};

	var onPlaylistItemClick = function(){
		/*mediator.on('rsp.playlist.item.click', function(item){
			playTrack(item, true);
		});*/
	};

	var onLibraryItemClick = function(){
		mediator.on('rsp.library.item.click', function(item){
			playTrack(item);
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
		//$('#rsp-player-control').on('click', '.rsp-control.play, .rsp-control.pause', function(){
			var btn = $(btn);
			var state = togglePlayButton(btn);
			if(state === 'play'){
				playerService.pause();
			} else {
				playerService.resume();
			}
		//});
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

	var bindEvents = function(){
		onLibraryItemClick();
		onPlaylistItemClick();
		//onRerender();
		onRerenderControl();
	};

	var run = function(){
		bindEvents();
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
		resize : resize
	};
});
