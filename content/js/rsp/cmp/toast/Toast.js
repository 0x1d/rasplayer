define([
    'jquery'
], function($) {

	var notify = function(msg, position){
        var box = $('.rsp-toast');
        if(box.length == 0){
            box = $('<div>', {
                class: 'rsp-toast alert-box info radius'
            }).appendTo('body');
        }
        box.html('<b>Item queued</b><br>' + msg);
        if(position) {
            box.css(position);
        } 
        box.show().delay(1500).fadeOut();
	};
    
	return {
		notify : notify
	};
});