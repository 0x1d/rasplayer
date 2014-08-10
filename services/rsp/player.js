module.exports = {
    
    resource: '/:action(/*)/',

    GET: function(ctx, http){
    	var service = this;
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
            });
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
        });
    },

    back: function(ctx, http){
		ctx.rasplayer.back(function(tags){
			http.reply(tags);
		});
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

    parseTag : function(tag){
        return {
            artist : tag.artist,
            title : tag.title,
            album : tag.album,
            year : tag.year
        };
    }

};
