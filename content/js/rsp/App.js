define([
	'jquery',
	'sui/mediator',
	'sui/sui',
	'rsp/cmp/player/Control',
	'rsp/cmp/playlist/Playlist',
	'rsp/cmp/library/Library',
	'rsp/EventModel'
], function($, mediator, sui, Control, Playlist, Library, eventModel) {

	var Rasplayer = function(){
		var uiState = '';
		$(document).ready(function(){
			Control.run();
			Playlist.run();
			Library.run();
			mediator.applyModel(eventModel);
			
			mediator.on('rsp.ui.state.change', function(newState){
				uiState = newState;
			});

			$('body').show();
		});
	};

    return Rasplayer;

});