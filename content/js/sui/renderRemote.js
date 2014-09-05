define([
	'jquery',
	'mustache'
], function($, mustache) {
	return function(config){
		var file = config.template, 
			data = config.data, 
			target = config.target, 
			callback = config.callback;
		$.get(file, function(template) { 
			var output = mustache.render(template, data);
			$(target).html(output);
			if(callback){
				callback(output);
			}
		});
	};
});