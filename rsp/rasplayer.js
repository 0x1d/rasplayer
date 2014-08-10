var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');
var ps = require('pause-stream')();
var id3 = require('id3js');

var Rasplayer = function(){

  var speaker;
  var currentStream;
  var decoder;
  var currentPlaylist = [];
  var currentTrack = -1;
  var currentTrackTag = {};

  this.play = function(file, tagsCallback){
    // stop current stream if already one running
    if(currentStream){
      this.stop();
    }
    // play the stream
    var stream = fs.createReadStream(file);
    if(file.indexOf('mp3') > -1){
      this.playStream(stream);  
      // get the id3 tags
      if(tagsCallback){
        id3({ file: file, type: id3.OPEN_LOCAL }, function(err, id3tag) {
          var tag = parseTag(id3tag);
          currentTrackTag = tag;
          tagsCallback(tag);
        });
      }
    } else if(file.indexOf('wav') > -1){
      this.playWavStream(stream);
    }
  };

  this.queue = function(file){
    var player = this;
    try{
      id3({ file: file, type: id3.OPEN_LOCAL }, function(err, tags) {
          var trackId = currentPlaylist.length;
          currentPlaylist.push({
            id: trackId,
            name : tags.artist + ' - ' + tags.title,
            path: file
          });
          if(!currentStream){
            currentTrack = currentPlaylist.length - 1;
            player.play(file, function(){});
          }
        });
    } catch(error) {
      console.log('error while reading id3tag ' + error);
      var trackId = currentPlaylist.length;
      currentPlaylist.push({
        id: trackId,
        name : 'null',
        path: file
      });
    }
  };

  this.playFromPlaylist = function(trackId, callback){
    currentTrack = trackId;
    //console.log(currentPlaylist[trackId]);
    this.play(currentPlaylist[trackId].path, callback);
  };

  this.playStream = function(readable){
    currentStream = readable;
    currentStream.pipe(new lame.Decoder()).on('format', route);
    this.trackFinished(readable);
  };
  this.playWavStream = function(readable){
    currentStream = readable;
    speaker = new Speaker();
    currentStream.pipe(speaker);
    this.trackFinished(readable);
  };

  this.stop = function(){
    if(currentStream){
      currentStream.unpipe(speaker);
      currentStream.destroy();
      speaker.close();
      currentStream = null;
    }
  };

  this.resume = function(){
    if(currentStream){
      currentStream.pipe(ps.resume());
    }
  };

  this.pause = function(){
    if(currentStream){
      currentStream.pipe(ps.pause());
    }
  };

  this.next = function(callback){
    if(currentTrack < currentPlaylist.length){
      currentTrack++;
      if(currentPlaylist[currentTrack]){
        this.play(currentPlaylist[currentTrack].path, callback);
      }
    }
  };

  this.back = function(callback){
    if(currentTrack > 0){
      currentTrack--;
      if(currentPlaylist[currentTrack]){
        this.play(currentPlaylist[currentTrack].path, callback);
      }
    }
  };

  this.getCurrentPlaylist = function(){
    if(currentPlaylist.length > 0){
      for(var k in currentPlaylist){
        currentPlaylist[k].playing = false;
      }
      if(currentPlaylist[currentTrack]){
        currentPlaylist[currentTrack].playing = true;
      }
    }
    return currentPlaylist;
  };

  this.getCurrentTrackTag = function(){
    return currentTrackTag || {};
  };

  this.resetCurrentPlaylist = function(){
    currentPlaylist = [];
    currentTrack = 0;
  };

  this.trackFinished = function(stream){
    var rasplayer = this;
    stream.on('end', function(){
      //console.log('TRACK FINISHED');
      rasplayer.stop();
      rasplayer.next();
    });
  };

  var route = function(format){
    speaker = new Speaker(format);
    this.pipe(speaker);
  };

  var parseTag = function(tag){
      return {
          artist : tag.artist,
          title : tag.title,
          album : tag.album,
          year : tag.year
      };
  };
}
module.exports = Rasplayer;