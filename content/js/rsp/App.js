define([
	'foundation',
	'sui/mediator',
	'sui/sui',
	'rsp/cmp/player/Control',
	'rsp/cmp/playlist/Playlist',
	'rsp/cmp/library/Library',
	'rsp/EventModel'
], function($, mediator, sui, Control, Playlist, Library, eventModel) {

	var Rasplayer = function(){

		$(document).ready(function(){
			sui.swipe.init();
			Control.run();
			Playlist.run();
			Library.run();

			mediator.applyModel(eventModel);

			$(document).foundation();
			$('body').show();
		});
	};

    return Rasplayer;

});