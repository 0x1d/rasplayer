define([
	'sui/render',
	'sui/renderRemote',
	'sui/swipe'
], function(render, renderRemote, swipe) {
	return {
		swipe : swipe,
		renderRemote : renderRemote,
		render : render
	};
});