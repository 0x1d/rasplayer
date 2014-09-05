define([
	'jquery'
], function($) {
	var list = function(path, callback){
		$.getJSON('/fs' + path, function(data){
			callback({
				folder : data
			});
		});
	};
	return {
		list : list
	};
});