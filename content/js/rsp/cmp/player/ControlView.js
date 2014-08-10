define([
	'sui/sui',
	'text!rsp/cmp/player/control.tpl'
], function(sui, template) {
	var render = function(data, callback){
		sui.render({
			template: template, 
			data: data, 
			target: '#rsp-player-control',
			callback: callback
		});
	};
	return {
		render : render
	};
});