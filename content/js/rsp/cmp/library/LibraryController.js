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
                //$('.rsp-item-queue[data-isfolder="true"]:first').hide();
				if(callback){
					callback();
				}
			});
		});
	};

	var show = function(){
		mediator.trigger('rsp.ui.state.change', {
			state : 'content.library'
		});
		mediator.trigger('rsp.ui.playlist.stopRefresh');
		view.show();
	};

    return {
		update : update,
		show : show
	};
});