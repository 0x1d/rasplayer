var config = require('./config/app');
var slimple = require('slimple'); 
var Rasplayer = require('./rsp/rasplayer');

var app = {
    context : {
        rasplayer : {}
    },
    run: function(){
        this.context.rasplayer = new Rasplayer();
        slimple.run(config, this.context);
    }
};

app.run();