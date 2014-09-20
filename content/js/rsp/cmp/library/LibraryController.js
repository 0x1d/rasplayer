define([
	'sui/mediator',
	'rsp/cmp/library/LibraryView',
	'rsp/cmp/library/FileService'
], function(mediator, view, fs) {

	var update = function(path){
		fs.list(path, function(folder){
			folder.parent = path;
			view.render(folder, function(){
                window.scrollTo(0,0);
                $('.rsp-item-queue[data-isfolder="true"]:first').hide();
				mediator.trigger('rsp.resize');
			});
		});
	};

    return {
		update : update
	};
});