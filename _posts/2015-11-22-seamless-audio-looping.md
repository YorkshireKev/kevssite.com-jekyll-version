---
title: Seamless audio looping in html5 JavaScript
author: YorkshireKev
layout: post
permalink: /seamless-audio-looping/
redirect_from: /2015/11/22/seamless-audio-looping/
dsq_needs_sync:
  - 1
---
For my latest javascript/threejs experiment I created a retro 1980's inspired demo, which renders hundreds of sprites in a pseudo 3D style that was common in the Atari ST and Amiga demos of the late 80's.

Of course, no retro demo would be complete without a retro soundtrack. For my [Retro Particle Demo](/retro-particle-demo) this would be a short track that loops continuously.

My initial attempt used the html5 audio tag:
{% highlight html %}
<audio id="demomusic" src="audio/music.mp3" type="audio/mpeg" loop></audio>
{% endhighlight %}

The above tag will load the mp3 file, but not start it playing (you'd need to add autoplay attribute for that). I didn't want the track to start playing until the demo was loaded, so no autoplay for me.

The loop tag tells the browser to keep playing the track over and over again, which didn't work out so well as I will explain below.

Starting the track from my JavaScript code was simple enough. Just call the play method:
{% highlight javascript %}
document.getElementById("demomusic").play();
{% endhighlight %}

Looped music can get a bit annoying after a while so I added the option to mute the sound. The following onclick event toggles the music on/off by calling the pause and play methods of html5 audio.
{% highlight javascript %}
  document.getElementById("music").onclick = function () {
    if (mute === true) {
      document.getElementById('demomusic').play();
      mute = false;
    } else {
      document.getElementById('demomusic').pause();
      mute = true;
    }
  };
{% endhighlight %}

While the html5 audio tag works quite well it does have one annoying aspect: there is a slight delay/pause in-between loops.

While looking for a fix to this I learnt that part of the 'pause' problem is caused by using mp3 as the audio file format. Apparently there is a bug (or maybe its a feature!) in the mp3 spec that adds a few ms of silence at the start of the track. If you load a track into an editor like audacity you can see the gap. You can edit the track to remove the silence, but it'll be back when you re-load it. I recommend using the ogg format instead of mp3 as ogg does not add any silence to the start of the track. Switching to the ogg format certainly made an improvement but there was *still* a small pause between loops.

Incidentally just converting from mp3 to ogg won't remove the silence automatically. You'll need to load the mp3 into an editor, remove the gap from the start of the file, then export the track in the ogg format.

So it looks like for now the html5 audio tag is not suitable for seamless looping.

###Goodbye html5 audo tag, hello web audio!###

There is a newer 'web audio' api supported by most modern browsers. This looks to have a much richer feature set than html5 audio and does not suffer from pauses in looped playback (as long as you don't use mp3 for the reasons described above). Web audio is more complicated to implement though.

Thankfully there are a number of JavaScript frameworks to simplify things. My personal favourite is the excellent howler.js

Howler.js defaults to the Web Audio API but will fall back to html5 audio for browsers that don't support the web audio api.

To use howler.js, add the JavaScript library in your html and don't forget to remove the html5 audio tag. The audio files will be referenced in the javascript file instead:
{% highlight javascript %}
var music = new Howl({
    urls: ['audio/music.ogg'],
    autoplay: false,
    loop: true
  });
  var mute = false;
{% endhighlight %}

The rest of the JavaScript is pretty similar to that used for html5 audio.

To start the track playing:
{% highlight javascript %}
music.play();
{% endhighlight %}

and the pause/play function now looks like this:
{% highlight javascript %}
document.getElementById("music").onclick = function () {
    if (mute === true) {
      music.play();
      mute = false;
    } else {
      music.pause();
      mute = true;
    }
  };
{% endhighlight %}

There is *so* much more that howler.js can do than seamlessly looping music. Check out the [howler.js website](http://howlerjs.com/) for details.