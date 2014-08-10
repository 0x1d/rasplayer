define([
	'foundation',
	'sui/sui',
	'rsp/cmp/player/Control',
	'rsp/cmp/playlist/Playlist',
	'rsp/cmp/library/Library'
], function($, sui, Control, Playlist, Library) {

	var Rasplayer = function(){

		$(document).ready(function(){
			sui.swipe.init();
			Control.run();
			Playlist.run();
			Library.run();
			$(document).foundation();
			$('body').show();
		});
	};

    return Rasplayer;

});