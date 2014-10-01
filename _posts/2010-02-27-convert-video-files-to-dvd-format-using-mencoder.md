---
title: Convert video files to DVD format using mencoder
author: Kev
layout: post
permalink: /2010/02/27/convert-video-files-to-dvd-format-using-mencoder/
syntaxhighlighter_encoded:
  - 1
dsq_needs_sync:
  - 1
categories:
  - Linux
---
To convert most video files into DVD compatible mpg files, mencoder is a good option.

The following will convert to PAL widescreen format.<!--more-->

`mencoder -oac lavc -ovc lavc -of mpeg -mpegopts format=dvd -vf<br />
scale=720:576,harddup -srate 48000 -af lavcresample=48000 -lavcopts vcodec=mpeg2video:vrc_buf_size=1835:vrc_maxrate=9800:vbitrate=5000:<br />
keyint=15:aspect=16/9:acodec=ac3:abitrate=192 -ofps 25 -o "OUTPUT.mpg" "INPUT.avi"`

You might want to consider using ffmpeg as an alternative. On some files I&#8217;ve had glitching as a result of converting with mencoder.