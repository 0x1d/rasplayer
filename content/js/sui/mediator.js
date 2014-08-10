define(function() {

	var events = [];

	var on = function(event, callback){
		events[event] = [];
		events[event].push(callback);
	};

	var trigger = function(event, args){
		if(events[event]){
			for (var i = events[event].length - 1; i >= 0; i--) {
				events[event][i](args || {});
			};
		}
	};

	return {
		on: on,
		trigger: trigger
	};

});