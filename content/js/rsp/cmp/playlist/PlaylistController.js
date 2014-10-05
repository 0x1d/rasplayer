define([
	'jquery',
	'sui/mediator',
	'rsp/cmp/playlist/PlaylistView',
	'rsp/cmp/player/PlayerService',
    'rsp/cmp/toast/Toast'
], function($, mediator, view, playerService, toast) {

	var playlistRefresh;
	var showPlaylist = false;

	var renderPlaylist = function(callback){
		var evt = this;
		playerService.getCurrentPlaylist(function(playlist){
			view.render({ playlist: playlist.reverse() }, null, '#content');
		});

	};

	var queueItem = function(item){
        var context = this;
		var element = $(item);
        toast.notify(element.parent().find('a').text(),{
            top: element.position().top - 10,
            'margin-right': '10px'
        });
		playerService.queue(item.getAttribute('data-href'), this.trigger);
	};

	var togglePlaylist = function(){
		renderPlaylist();
		this.trigger();
	};

	var run = function(data){
		mediator.on('rsp.ui.playlist.stopRefresh', function(){
			clearInterval(playlistRefresh)
		});
		mediator.on('rsp.ui.playlist.refresh', function(){
			playlistRefresh = setInterval(function(){
				renderPlaylist();
			}, 2500);
		});
		
	};

	var show = function(){
		renderPlaylist();
		mediator.trigger('rsp.ui.playlist.refresh');
		mediator.trigger('rsp.ui.state.change', {
			state : 'content.playlist'
		});
	};

	return {
		show : show,
		run : run,
		renderPlaylist : renderPlaylist,
		queueItem : queueItem
	};
});