module.exports = {
    
    resource: '/:action(/*)/',

    GET: function(ctx, http){
    	var service = this;
        ctx.rasplayer.setContext(ctx);
    	service[http.data.action](ctx, http);
    },

    play: function(ctx, http){
        var service = this;
        var track = decodeURI(http.data.splat[0]);
        if(http.data.playlist == 'true'){
            ctx.rasplayer.playFromPlaylist(track, function getTags(tag){
                http.reply(service.parseTag(tag));
            });
        } else {
            ctx.rasplayer.play('/'+track, function getTags(tag){
                http.reply(service.parseTag(tag));
            }, true);
        }
    },

    pause: function(ctx, http){
        ctx.rasplayer.pause();
        http.reply(http.data);
    },

    resume: function(ctx, http){
        ctx.rasplayer.resume();
        http.reply(http.data);
    },

    stop : function(ctx, http){
    	ctx.rasplayer.stop();
    	http.reply({});
    },

    next : function(ctx, http){
        ctx.rasplayer.next(function(tags){
        	http.reply(tags);
        }, true);
    },

    back: function(ctx, http){
		ctx.rasplayer.back(function(tags){
			http.reply(tags);
		}, true);
    },

    playlist: function(ctx, http){
        http.reply(ctx.rasplayer.getCurrentPlaylist());
    },

    queue: function(ctx, http){
        ctx.rasplayer.queue('/'+decodeURI(http.data.splat[0]));
        http.reply({});
    },

    currentTrack: function(ctx, http){
    	http.reply(ctx.rasplayer.getCurrentTrackTag());
    },

    increaseVolume: function(ctx, http){
        ctx.rasplayer.increaseVolume();
        http.reply({});
    },

    decreaseVolume: function(ctx, http){
        ctx.rasplayer.decreaseVolume();
        http.reply({});
    },

    toggleLanguage: function(ctx, http){
        ctx.rasplayer.toggleLanguage();
        http.reply({});
    },

    clearPlaylist: function(ctx, http){
        ctx.rasplayer.clearPlaylist();
        http.reply({});
    },

    parseTag : function(tag){
        return {
            artist : tag.artist,
            title : tag.title,
            album : tag.album,
            year : tag.year
        };
    },

    getTrackName : function(tag){
        if(tag.artist){
            return tag.artist + ' ' + tag.title;
        } else {
            return tag;
        }
    }

};
