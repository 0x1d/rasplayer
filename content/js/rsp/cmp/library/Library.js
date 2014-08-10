define([
	'rsp/cmp/library/LibraryView',
	'rsp/cmp/library/FileService',
	'rsp/cmp/library/LibraryController'
], function(view, fs, ctrl) {
	var run = function(){
		var path = '/mnt/smbdisk';
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