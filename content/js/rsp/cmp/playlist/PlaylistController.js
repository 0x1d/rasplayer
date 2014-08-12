define([
	'jquery',
	'sui/mediator',
	'rsp/cmp/playlist/PlaylistView',
	'rsp/cmp/player/PlayerService'
], function($, mediator, view, playerService) {

	var renderPlaylist = function(callback){
		playerService.getCurrentPlaylist(function(playlist){
			view.render({ playlist: playlist.reverse() });
		});
	};

	var onRerenderPlaylist = function(){
		mediator.on('rsp.player.playlist.rerender', function(callback){
			renderPlaylist(callback);
		});
	};

	var onPlayTrack = function(){
		mediator.on('rsp.player.track.play', function(){
			renderPlaylist();
		});
	};

	/*var onTrackClick = function(){
		$('#rsp-playlist').on('click', 'a', function(event){
			event.preventDefault();
			mediator.trigger('rsp.playlist.item.click',this);
		});
	};*/

	var onSwipeLeft = function(){
		$(document).on('swl', function(){
			$('.off-canvas-wrap').addClass('move-left');
			renderPlaylist();
			mediator.trigger('rsp.player.control.rerender');
		});
	};

	var onSwipeRight = function(){
		$(document).on('swr', function(){
			$('.off-canvas-wrap').removeClass('move-left');
		});
	};

	var queueItem = function(item){
		//mediator.on('rsp.library.item.queue', function(item){
			playerService.queue(item.getAttribute('data-href'), this.trigger);
		//});
	};

	var onTogglePlaylist = function(){
		$('.right-off-canvas-toggle').on('click', function(){
			renderPlaylist();
			mediator.trigger('rsp.player.control.rerender');
		});
	};

	var bindEvents = function(){
		onPlayTrack();
		//onTrackClick();
		onSwipeRight();
		onSwipeLeft();
		//onItemQueue();
		onTogglePlaylist();
		onRerenderPlaylist();
	};
	var run = function(data){
		renderPlaylist();
		bindEvents();
	};
	return {
		run : run,
		renderPlaylist : renderPlaylist,
		queueItem : queueItem
	};
});