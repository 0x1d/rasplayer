require.config({
	paths: {
		'baseUrl': 'js',
		'jquery': 'vendor/jquery',
		'mustache': 'vendor/mustache'
	}
});

require([
	'rsp/App'
], function(Rasplayer){
	var app = new Rasplayer();
});