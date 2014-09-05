var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');
var ps = require('pause-stream')();
var id3 = require('id3js');
var child_process = require('child_process');
var exec = child_process.exec;

var Rasplayer = function(){

  var rasplayer = this;

  var omx = require('omx-manager'); //omx-manager
  var speaker;
  var currentStream;
  var decoder;
  var currentPlaylist = [];
  var currentTrack = -1;
  var currentTrackTag = {};
  var manualStop = false;

  this.play = function(file, tagsCallback, manual){
    // stop current stream if already one running
    if(manual){
      this.stop();
    } else {
      manualStop = false;
    }
    // play the stream
    omx.play(file);
    // parse id3tag
    if(tagsCallback && file.indexOf('mp3') > -1){
      id3({ file: file, type: id3.OPEN_LOCAL }, function(err, id3tag) {
        var tag = parseTag(id3tag);
        currentTrackTag = tag;
        tagsCallback(tag);
      });
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
          if(!omx.isPlaying()){
            currentTrack = currentPlaylist.length - 1;
            player.play(file, function(){});
          }
        });
    } catch(error) {
      console.log('error while reading id3tag ' + error);
      var trackId = currentPlaylist.length;
      currentPlaylist.push({
        id: trackId,
        name : 'unknown',
        path: file
      });
    }
  };

  this.playFromPlaylist = function(trackId, callback){
    currentTrack = trackId;
    //console.log(currentPlaylist[trackId]);
    this.play(currentPlaylist[trackId].path, callback, true);
  };

  this.playStream = function(readable){
    currentStream = readable;
    currentStream.pipe(new lame.Decoder()).on('format', route);
    this.trackFinished(readable);
  };

  this.stop = function(){
    manualStop = true;
    omx.stop();
    // hack for unterminated child processes
    exec('pkill omxplayer');
  };

  this.resume = function(){
    omx.play();
  };

  this.pause = function(){
    omx.pause();
  };

  this.next = function(callback, manual){
    if(currentTrack < currentPlaylist.length){
      currentTrack++;
      if(currentPlaylist[currentTrack]){
        this.play(currentPlaylist[currentTrack].path, callback, manual);
      }
    }
  };

  this.back = function(callback, manual){
    if(currentTrack > 0){
      currentTrack--;
      if(currentPlaylist[currentTrack]){
        this.play(currentPlaylist[currentTrack].path, callback, manual);
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

  this.trackFinished = function(){
    var rasplayer = this;
    omx.on('end', function(){
      if(!manualStop){
        rasplayer.next(function(){},false);
      } else {
        manualStop = false;
      }
    });
  };

  this.increaseVolume = function(){
    omx.increaseVolume();
  };

  this.decreaseVolume = function(){
    omx.decreaseVolume();
  };

  // private methods
  var parseTag = function(tag){
      return {
          artist : tag.artist,
          title : tag.title,
          album : tag.album,
          year : tag.year
      };
  };

  (function registerOmxEvents(){
    rasplayer.trackFinished();
    omx.enableHangingHandler();
  })();

}
module.exports = Rasplayer;