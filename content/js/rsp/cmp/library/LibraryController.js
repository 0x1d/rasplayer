define([
	'sui/mediator',
	'rsp/cmp/library/LibraryView',
	'rsp/cmp/library/FileService'
], function(mediator, view, fs) {

	var update = function(path, callback){
		fs.list(path, function(folder){
			folder.parent = path;
			view.render(folder, function(){
                window.scrollTo(0,0);
                $('.rsp-item-queue[data-isfolder="true"]:first').hide();
				//mediator.trigger('rsp.resize');
				if(callback){
					callback();
				}
			});
		});
	};

    return {
		update : update
	};
});