<ul class="off-canvas-list">
	<li><label>Playlist</label></li>
	{{#playlist}}
		<li data-playing="{{playing}}"><a href="{{path}}" data-trackid="{{id}}" class="rsp-playlist-item">{{name}}</a></li>
	{{/playlist}}
</ul>