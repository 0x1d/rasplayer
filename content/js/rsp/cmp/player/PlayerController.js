define([
	'jquery',
	'sui/mediator',
	'rsp/cmp/player/ControlView',
	'rsp/cmp/library/LibraryController',
	'rsp/cmp/player/PlayerService'
], function($, mediator, view, library, playerService) {

	var playTrack = function(item, playlist){
		var href = playlist ? '/'+item.getAttribute('data-trackid') : item.getAttribute('href');
		if(item.getAttribute('data-isfolder') === 'true'){
			library.update(href);
		} else {
			playerService.play(href, playlist, function(id3tag){
				mediator.trigger('rsp.player.track.play', id3tag);
				renderControl(id3tag);
				onRerender();
				//$('.off-canvas-wrap').addClass('move-left');
			});
		}
		window.scrollTo(0,0);
	};

	var renderControl = function(id3tag){
		view.render(id3tag, function(){
			//bindEvents();
			//mediator.trigger('rsp.player.playlist.rerender');
		});
	};

	var onRerenderControl = function(id3tag){
		mediator.on('rsp.player.control.rerender', function(){
			playerService.currentTrack(function(tag){
				renderControl(tag);
			});
		});
	};

	var onRerender = function(){
		mediator.on('rsp.rerender', function(){
			var rightHeight = $('#rsp-right').height();
			var libraryHeight = $('#rsp-library').height();
			var contentHeight = rightHeight > libraryHeight ? rightHeight : libraryHeight;
			$('.main-section').css("height", contentHeight);
			window.scrollTo(0,0);
		});
	};

	var onPlaylistItemClick = function(){
		mediator.on('rsp.playlist.item.click', function(item){
			playTrack(item, true);
		});
	};

	var onLibraryItemClick = function(){
		mediator.on('rsp.library.item.click', function(item){
			playTrack(item);
		});
	};

	var onStopCLick = function(){
		$('#rsp-player-control').on('click', '.rsp-control.stop', function(){
			playerService.stop();
			togglePlay($('.rsp-control.toggle'));
		});
	};

	var onNextClick = function(){
		$('#rsp-player-control').on('click', '.rsp-control.next', function(){		
			playerService.next(renderControl);
		});
	};

	var onBackClick = function(){
		$('#rsp-player-control').on('click', '.rsp-control.back', function(){
			playerService.back(renderControl);
		});
	};

	var onTogglePlay = function(){
		$('#rsp-player-control').on('click', '.rsp-control.play, .rsp-control.pause', function(){
			var btn = $(this);
			var state = togglePlay(btn);
			if(state === 'play'){
				playerService.pause();
			} else {
				playerService.resume();
			}
		});
	};

	var togglePlay = function(btn){
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
		onStopCLick();
		onTogglePlay();
		onNextClick();
		onBackClick();
		onPlaylistItemClick();
		onRerender();
		onRerenderControl();
	};

	var run = function(){
		bindEvents();
	};

	return {
		run : run
	};
});
