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
				ctrl.bindEvents();
			});
		});
	};
	return {
		run : run
	};
});