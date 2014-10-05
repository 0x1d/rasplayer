define([
	'sui/sui',
	'text!rsp/cmp/playlist/playlist.tpl'
], function(sui, template) {
	var render = function(data, callback, target){
		sui.render({
			template: template, 
			data: data, 
			target: target ? target : '#content',
			callback: callback
		});
	};
	return {
		render : render
	};
});