define([
	'jquery',
	'mustache'
], function($, mustache) {
	return function(config){
		var file = config.template, 
			data = config.data, 
			target = config.target, 
			callback = config.callback;

		var output = mustache.render(file, data);
		$(target).html(output);
		if(callback){
			callback(output);
		}
	};
});