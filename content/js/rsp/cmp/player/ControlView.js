define([
	'sui/sui',
	'text!rsp/cmp/player/control.tpl',
	'text!rsp/cmp/player/current.tpl'
], function(sui, controlTemplate, currenTemplate) {
	var renderCurrentTrack = function(data, callback){
		sui.render({
			template: currenTemplate, 
			data: data, 
			target: '#rsp-player-current',
			callback: callback
		});
	};

	var render = function(data, callback){
		sui.render({
			template: controlTemplate, 
			data: data, 
			target: '#rsp-player-control',
			callback: callback
		});
	};

	return {
		render : render,
		renderCurrentTrack : renderCurrentTrack
	};
});