define([
	'rsp/cmp/library/LibraryView',
	'rsp/cmp/library/FileService',
	'rsp/cmp/library/LibraryController',
	'rsp/config'
], function(view, fs, ctrl, config) {
	var run = function(){
		var path = config.music.path;
		fs.list(path, function(folder){
			folder.parent = path;
			view.render(folder, function(){
                $('.rsp-item-queue[data-isfolder="true"]:first').hide();
			});
		});
	};
	return {
		run : run
	};
});