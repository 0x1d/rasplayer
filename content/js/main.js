require.config({
	paths: {
		'baseUrl': 'js',
		'jquery': 'vendor/jquery',
		'mustache': 'vendor/mustache',
		'foundation' : 'vendor/foundation.min'
	},
	shim: {
		'foundation': {
            deps: ['jquery'],
            exports: '$'
        }
	}
});

require([
	'rsp/App'
], function(Rasplayer){
	var app = new Rasplayer();
});