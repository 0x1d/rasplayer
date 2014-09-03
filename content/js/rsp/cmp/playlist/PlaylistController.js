define([
	'jquery',
	'sui/mediator',
	'rsp/cmp/playlist/PlaylistView',
	'rsp/cmp/player/PlayerService'
], function($, mediator, view, playerService) {

	var renderPlaylist = function(callback){
		var evt = this;
		playerService.getCurrentPlaylist(function(playlist){
			view.render({ playlist: playlist.reverse() }, evt.trigger ? evt.trigger : callback);
		});
	};

	var onSwipeLeft = function(){
		$(document).on('swl', function(){
			$('.off-canvas-wrap').addClass('move-left');
			renderPlaylist();
		});
	};

	var onSwipeRight = function(){
		$(document).on('swr', function(){
			$('.off-canvas-wrap').removeClass('move-left');
		});
	};

	var queueItem = function(item){
		playerService.queue(item.getAttribute('data-href'), this.trigger);
	};

	var togglePlaylist = function(){
		renderPlaylist();
		this.trigger();
	};

	var bindEvents = function(){
		onSwipeRight();
		onSwipeLeft();
	};
	var run = function(data){
		bindEvents();
		renderPlaylist();
	};
	return {
		run : run,
		renderPlaylist : renderPlaylist,
		queueItem : queueItem
	};
});