---
title: ffmpeg freeview to pal-dvd audio fix
author: Kev
layout: post
permalink: /2011/02/12/ffmpeg-freeview-to-pal-dvd-audio-fix/
syntaxhighlighter_encoded:
  - 1
dsq_needs_sync:
  - 1
categories:
  - Linux
tags:
  - dvd
  - ffmpeg
---
I was converting a TV show I&#8217;d  to DVD format using ffmpeg, but the resulting file had the wrong audio channel. At first I thought it had no audio at all, but then I noticed it had a voice over occasionally explaining what was happening; &#8220;so-n-so has just entered the room&#8230;&#8221;.

It appears that ffmpeg had selected the wrong audio stream. For some reason, it had had selected the second audio stream instead of the first. The fix is simple enough, you can manually set the streams to use with the -map option. The command below works well for UK freeview.<!--more-->

`ffmpeg -i "input.mpg" -y -target pal-dvd -map 0.0:0.0 -map 0.1:0.1 -ac 2 -aspect 16:9 output.mpg`

You&#8217;ll notice there are two -map parameters. The first one, **-map 0.0:0.0** is for the video stream (almost always the fist stream). The second one, ** -map 0.1:0.1** maps the second stream (the first audio stream, remember the first stream is the video) to the second stream (1st audio stream) of the output file. This fixes the audio problem&#8230; well almost!

The next problem I found was that the audio was in mono. This is fixed by telling ffmpeg there are two audio channels wit the parameter **-ac 2**.

How do you know which audio channel to set? The easiest way is to run ffmpeg without the -map option and note the streams it gives in the summary before it starts displaying it&#8217;s progress. You can then ctrl-c to quit. Example output shown below:

> Duration: 02:03:57.24, start: 89212.169567, bitrate: 2944 kb/s  
> Program 1  
> Stream #0.0[0x200]: Video: mpeg2video, yuv420p, 704&#215;576 [PAR 16:11 DAR 16:9], 15000 kb/s, 25 fps, 25 tbr, 90k tbn, 50 tbc  
> **Stream #0.1\[0x28a\](eng): Audio: mp2, 48000 Hz, 2 channels, s16, 192 kb/s**  
> Stream #0.2\[0x294\](eng): Audio: mp2, 48000 Hz, 1 channels, s16, 64 kb/s  
> Stream #0.3\[0x401\](eng): Subtitle: dvbsub  
> Stream #0.4[0x87b]: Data: 0x000b  
> Stream #0.5[0x943]: Data: 0x000b

So it you were to see that the stereo audio is stream 0.3 for example, you&#8217;d then use **-map 0.0:0.0 -map 0.3:0.1** to map it to stream 0.1 of the output file. The first -map is still needed to specify the video, you&#8217;ll get an error without it.