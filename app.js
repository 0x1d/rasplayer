var config = require('./config/app');
var slimple = require('slimple'); 
var Rasplayer = require('./rsp/rasplayer');
//var cec = require('./rsp/cec');

var app = {
    context : {
        rasplayer : {},
        cec : {}
    },
    run: function(){
        this.context.rasplayer = new Rasplayer();
        //cec(this.context.rasplayer);
        slimple.run(config, this.context);
    }
};

app.run();
