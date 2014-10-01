---
title: Reducing the size of mp3 files
author: Kev
layout: post
permalink: /2010/11/07/reducing-the-size-of-mp3-files/
syntaxhighlighter_encoded:
  - 1
dsq_needs_sync:
  - 1
categories:
  - Linux
tags:
  - lame
  - mp3
---
If you&#8217;ve ever had a collection of mp3 files that you want to burn to CD for playback in the car or archiving etc, you&#8217;ll likely know how annoying it can be when the collection of mp3 files is just a bit too big to fit on a CD. You end up having to remove a couple of tracks&#8230; While this is probably OK for music (there&#8217;s always a couple of tracks I&#8217;d skip anyway), it&#8217;s not so good for audio books and the like.

One answer to the problem is to reduce the size of the mp3 files themselves. Be warned though that<!--more--> this is not without a down side. Shrinking the mp3 will reduce it&#8217;s sound quality. This is less likely to be a problem for audio books, but you might not want to do this for music.

The program lame is good for this sort of thing. You give it an mp3 file, specify a new (lower) bitrate and an output file and you get a new, smaller mp3.

`lame --mp3input -b 80 input.mp3 output.mp3`

But what if you have a folder full of files? You could type the above command for each file, but that&#8217;s going to be a pain. The simple command below fill loop through a folder of mp3 files converting each one and placing it into a sub folder named converted. To use the command &#8216;as is&#8217; you&#8217;ll need to create the sub folder first and run the command from within the folder that contains your mp3&#8242;s.

`for file in *.mp3 ; do lame --mp3input -b 80 "$file" ./converted/"$file" ; done`

The -b option specifies the bit rate. The smaller the number the smaller the file (and lower quality). An average music track tends to be encoded at between 128 and 256, when audio books are generally lower. Obviously you should check what rate the mp3 is before deciding on a new bit rate. In gnome (Ubuntu) this is easy by right clicking the file and selecting &#8216;properties&#8217;, and then the &#8216;audio&#8217; tab.