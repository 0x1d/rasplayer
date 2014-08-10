define([
	'rsp/cmp/player/ControlView',
	'rsp/cmp/player/PlayerController'
], function(view, ctrl) {
	var run = function(){
		view.render({}, function(){
			ctrl.run();
		});
	};
	return {
		run : run
	};
});