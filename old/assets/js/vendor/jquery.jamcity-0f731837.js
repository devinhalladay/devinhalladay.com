/**
*
* jquery.JamCity : v. 2.0.0
* https://github.com/bluetidepro/jquery.JamCity
* Copyright (c) 2012 Zach Reed (http://iamzachreed.com).
* MIT licensed
*
*/
!function(e,t,a,i){"use strict";function n(t,a){this.element=t,this.settings=e.extend({},s,a),this._defaults=s,this._name=m,this.init()}var m="JamCity",s={apiKey:"",username:"",fetch:5,contentType:"recentTracks",artSize:"medium",cssTooltips:!0,cssThemeClass:null,_blankLinks:!0,refreshResults:!0,refreshResultsInterval:6e5,noAlbumArtImg:"http://placehold.it/250x250&text=No Art",noResults:"Sorry, nothing was found...",songsFetched:function(){},htmlBuilt:function(){}};n.prototype={init:function(){var e=this.settings,t=this.element;this.validate(e),this.fetchSongs(t,e)},validate:function(e){return e.apiKey?e.username?!0:(this.debug("Please enter a valid username."),!1):(this.debug("Please enter a valid API key."),!1)},buildLastfmUrl:function(e){var t="http://ws.audioscrobbler.com/2.0/?method=user.get"+e.contentType+"&user="+e.username+"&api_key="+e.apiKey+"&limit="+e.fetch+"&format=json";return t},buildInfoUrl:function(e,t,a){var i="http://ws.audioscrobbler.com/2.0/?method="+e+".getinfo&api_key="+t.apiKey+"&mbid="+a+"&format=json";return i},fetchSongs:function(t,a){var i=this,n={recentTracks:"track",lovedTracks:"track",topAlbums:"album",topTracks:"track",topArtists:"artist",weeklyAlbumChart:"album",weeklyArtistChart:"artist",weeklyTrackChart:"track"},m=[],s=n[a.contentType],r=a.contentType.toLowerCase(),o="http://ws.audioscrobbler.com/2.0/?method=user.get"+a.contentType+"&user="+a.username+"&api_key="+a.apiKey+"&limit="+a.fetch+"&format=json";e.ajax({url:o,type:"GET",context:this,async:!1,error:function(){},dataType:"json",success:function(n){if(n[r]&&"0"===n[r].total)m.push("jamCityError");else{var o=n[r][s],l=o.length-1;e(o).each(function(e,t){var n=i.templateData(a,t);return m.push(n),n.item_nowplaying&&(l-=1),e===l?!1:void 0})}e.isFunction(a.songsFetched)&&(a.songsFetched.call(this),i.buildHTML(m,t,a)),a.refreshResults&&(a.refreshResultsInterval<1e4&&(a.refreshResultsInterval=1e4),setTimeout(function(){e(t).find(".jams__jam").remove(),i.fetchSongs(t,a)},a.refreshResultsInterval))}})},templateData:function(t,a){var i=[];switch(i.item=a,i.item_url=a.url,i.item_mbid=a.mbid,i.item_nowplaying=null,i.item_playcount=null,t.contentType){case"recentTracks":a["@attr"]&&(i.item_nowplaying=a["@attr"].nowplaying),i.item_name="<em>"+a.name+"</em> by "+a.artist["#text"],i.item_album=a.album,i.item_image=a.image;break;case"lovedTracks":i.item_name="'"+a.name+"'  by "+a.artist.name,i.item_album=a.album,i.item_image=a.image;break;case"topAlbums":i.item_name="'"+a.name+"'  by "+a.artist.name,i.item_playcount=a.playcount,i.item_image=a.image;break;case"topTracks":i.item_playcount=a.playcount,i.item_image=a.image,i.item_name="'"+a.name+"'  by "+a.artist.name;break;case"topArtists":i.item_image=a.image,i.item_name=a.name,i.item_playcount=a.playcount;break;case"weeklyAlbumChart":if(i.item_name="'"+a.name+"'  by "+a.artist["#text"],i.item_playcount=a.playcount,i.item_mbid){var n=this.buildInfoUrl("album",t,i.item_mbid);e.ajax({url:n,type:"GET",async:!1,dataType:"json",success:function(e){i.item_image=e.album.image}})}break;case"weeklyArtistChart":if(i.item_playcount=a.playcount,i.item_mbid){var m=this.buildInfoUrl("artist",t,i.item_mbid);e.ajax({url:m,type:"GET",async:!1,dataType:"json",success:function(e){i.item_image=e.artist.image}})}i.item_name=a.name;break;case"weeklyTrackChart":i.item_image=a.image,i.item_name="'"+a.name+"' by "+a.artist["#text"],i.item_playcount=a.playcount}return i},buildHTML:function(t,a,i){var n=null;e(a).append('<p class="jams__jam"></p>'),"jamCityError"==t?e(a).find(".jams__jam").addClass("jamCityError").append("<p>"+i.noResults+"</p>"):e.each(t,function(t,m){return n=m.item_image?m.item_image[4]?m.item_image[4]["#text"]:m.item_image[3]?m.item_image[3]["#text"]:m.item_image[2]?m.item_image[2]["#text"]:m.item_image[1]?m.item_image[1]["#text"]:i.noAlbumArtImg:i.noAlbumArtImg,e(a).find(".jams__jam").append('<a href="'+m.item_url+'">'+m.item_name+"</a>"),t===i.fetch-1?!1:void 0}),e.isFunction(i.htmlBuilt)&&i.htmlBuilt.call(this)},debug:function(e){"object"==typeof console?console.log(e):"object"==typeof opera&&opera.postError(e)}},e.fn[m]=function(t){return this.each(function(){e.data(this,"plugin_"+m)||e.data(this,"plugin_"+m,new n(this,t))})}}(jQuery,window,document);