define([
	'sui/sui',
	'text!rsp/cmp/library/library.tpl',
	'jquery'
], function(sui, template, $) {

	var currentView;

	var render = function(folder, callback){
		sui.render({
			template: template, 
			data: folder, 
			target: '#rsp-library',
			callback: function(output){
				currentView = output;
				callback(output);
			}
		});
	};

	var show = function() {
		$('#rsp-library').html(currentView);
	};

	return {
		render : render,
		show : show
	};
});