define([
	'sui/mediator',
	'rsp/cmp/library/LibraryView',
	'rsp/cmp/library/FileService'
], function(mediator, view, fs) {

	var update = function(path){
		fs.list(path, function(folder){
			folder.parent = path;
			view.render(folder, function(){
				mediator.trigger('rsp.resize');
			});
		});
	};

	var onItemClick = function(){
		/*$('#rsp-library').on('click', 'a', function(event){
			event.preventDefault();
			mediator.trigger('rsp.library.item.click', this);
		});*/
	};

	var onItemQueue = function(){
		/*$('#rsp-library').on('click', '.rsp-item-queue', function(event){
			event.preventDefault();
			mediator.trigger('rsp.library.item.queue', this);
		});*/
	}

	var bindEvents = function(){
		onItemClick();
		onItemQueue();
	};

	return {
		bindEvents : bindEvents,
		update : update
	};
});