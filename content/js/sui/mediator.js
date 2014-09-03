define(['jquery'], function($) {

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

	var applyModel = function(model){
		
		// bind delegates
		for(var key in model.delegate){
			var component = model.delegate[key];
			(function(component){
				for(var eventName in component){
					var event = component[eventName];
					(function(event){
						for(var bind in event){
							(function(key, eventName, bind){
								$(key).on(eventName, bind, function(){
									event[bind].handler.call({
										trigger: function(data){
											var triggers = typeof(event[bind].trigger) == "function" ? event[bind].trigger() : event[bind].trigger;
											for(var tk in triggers){
												if(triggers[tk].handler){
													triggers[tk].handler(data);
												} else {
													triggers[tk](data);
												}
											}
										}
									}, this);
								});
							})(key, eventName, bind);
						}
					})(event);
				}
			})(component);
		}

		// bind events
		/*
		for(var triggerEvent in model.events){
			var onEvent = model.events[triggerEvent];
			(function(triggerEvent, handler, triggers){
				on(triggerEvent, function(triggerData) { 
					return handler.call({
						trigger : function(data) {
							for(var triggerKey in triggers){
								trigger(triggers[triggerKey], data);
							}
						}
					}, triggerData); 
				});
			})(triggerEvent, onEvent.handler, onEvent.trigger);
		}*/

	};

	return {
		on: on,
		trigger: trigger,
		applyModel : applyModel
	};

});