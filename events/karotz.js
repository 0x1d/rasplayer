var request = require('request');

var config = {
	endpoints : {
		baseUrl : 'http://192.168.2.100',
		tts : '/cgi-bin/tts'
	}
};

var karotz = {
	url : function(api){
		return config.endpoints.baseUrl + config.endpoints[api];
	},
	tts :  {
		say : function(text) {
			text = text.replace(/\s/g, "%20");
			var url = karotz.url('tts') 
				+ '?voice=graham'
				+ '&nocache=1'
				+ '&text=now%20playing%20' 
				+ text;
			request.get(url);
		}
	}
};

module.exports = {
  
  name: 'rsp.play',
  invoke: function(ctx, data){
      ctx.log.info("rsp.play " + data);
      //karotz.tts.say(data);
  }
    
};