var fs = require('fs');
var id3 = require('id3js');
var child_process = require('child_process');
var exec = child_process.exec;

var Rasplayer = function(){

  var ctx;
  var rasplayer = this;
  var omx = require('omx-manager');
  var currentPlaylist = [];
  var currentTrack = -1;
  var currentTrackTag = {};
  var manualStop = false;

  this.setContext = function(context){
    ctx = context;
  };

  this.play = function(file, tagsCallback, manual){
    // stop current stream if already one running
    if(manual){
      this.stop();
    } else {
      manualStop = false;
    }
    // play the stream
    omx.play(file);
    var whatsPlaying;
    // parse id3tag
    if(tagsCallback && file.indexOf('mp3') > -1){
        id3({ file: file, type: id3.OPEN_LOCAL }, function(err, id3tag) {
            var tag = parseTag(id3tag);
            currentTrackTag = tag;
            tagsCallback(tag);
            whatsPlaying = tag.artist + ' ' + tag.title;
            ctx.event.emit('rsp.play', whatsPlaying); 
        });
    } else if(tagsCallback) {
        var filename = parseFilename(file);
        tagsCallback(filename);
        whatsPlaying = filename;
        ctx.event.emit('rsp.play', whatsPlaying); 
    }
  };

  this.queue = function(file){
    var player = this;
    try{
        if(file.indexOf('.mp3') > -1) {
          id3({ file: file, type: id3.OPEN_LOCAL }, function(err, tags) {
              var trackId = currentPlaylist.length;
              var trackName = tags.artist + ' - ' + tags.title;
              currentPlaylist.push({
                id: trackId,
                name : trackName,
                path: file
              });
              if(!omx.isPlaying()){
                currentTrack = currentPlaylist.length - 1;
                player.play(file, function(){});
              }
            });
        } else {
            var filename = parseFilename(file);
            var trackId = currentPlaylist.length;
            currentPlaylist.push({
                id: trackId,
                name : filename,
                path: file
            });
        }
    } catch(error) {
      console.log('error while queue file ' + error);
    }
  };

  this.playFromPlaylist = function(trackId, callback){
    currentTrack = trackId;
    this.play(currentPlaylist[trackId].path, callback, true);
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

  this.forward = function(){
    this.next(function(){}, true);
  };

  this.back = function(callback, manual){
    if(currentTrack > 0){
      currentTrack--;
      if(currentPlaylist[currentTrack]){
        this.play(currentPlaylist[currentTrack].path, callback, manual);
      }
    }
  };

  this.backward = function(){
      this.back(function(){}, true);
  };

  this['Fast forward'] = function(){
    omx.seekForward();
  };

  this.rewind = function(){
    omx.seekBackward();
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

  this.toggleLanguage = function(){
    omx.nextAudioStream();
  };

  this.clearPlaylist = function(){
    currentPlaylist = [];
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
    
  var parseFilename = function(file) {
    return file.replace(/^.*[\\\/]/, '');
  };

  // event handlers
  (function registerOmxEvents(){
    rasplayer.trackFinished();
    omx.enableHangingHandler();
  })();

}
module.exports = Rasplayer;