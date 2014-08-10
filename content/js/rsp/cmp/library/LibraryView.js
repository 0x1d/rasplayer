define([
	'sui/sui',
	'text!rsp/cmp/library/library.tpl'
], function(sui, template) {
	var render = function(folder, callback){
		sui.render({
			template: template, 
			data: folder, 
			target: '#rsp-library',
			callback: callback
		});
	};
	return {
		render : render
	};
});