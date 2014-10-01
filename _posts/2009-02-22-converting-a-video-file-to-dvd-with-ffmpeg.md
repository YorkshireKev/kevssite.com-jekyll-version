---
title: Converting a video file to DVD with ffmpeg
author: Kev
layout: post
permalink: /2009/02/22/converting-a-video-file-to-dvd-with-ffmpeg/
syntaxhighlighter_encoded:
  - 1
dsq_needs_sync:
  - 1
categories:
  - Linux
tags:
  - convert
  - dvd
  - ffmpeg
---
There are many GUI programs that allow you to convert avi/divx/xvid files into DVD format, such as DeVeDe, but I somehow prefer to use command line tools. I know, I&#8217;m just weird like that!

There are 3 basic steps in creating a simple DVD:

1.  Convert the video files
2.  create the DVD structure
3.  Burn the DVD

So, to convert a file to a DVD compatible format use something like:

`ffmpeg -i "non dvd format input video.avi" -y -target pal-dvd -sameq -aspect 16:9 output.mpg`

Next we need to create the DVD structure. We&#8217;ll use dvdauthor for this.  
Rather than pass eveything into dvdauthor via the command line, it&#8217;s easier to put the settings into an xml file.<!--more-->

So, create a file (e.g. dvd.xml) and paste the lines below into it. This is about as simple a DVD structure as you can get, giving you a simple auto play disc that contains only one movie and no chapters.

`<dvdauthor><br />
<vmgm /><br />
<titleset><br />
<titles><br />
<pgc><br />
<vob file="output.mpg"/><br />
</pgc><br />
</titles><br />
</titleset><br />
</dvdauthor><br />
`

then create a folder to put the structure in:

`mkdir dvd`

and then run dvdauthor, referencing the xml file created above:

`dvdauthor -o dvd -x dvd.xml`

Note that on newer versions of dvdauthor, you may need to create an export variable for the video format before you run the above command. So if you get an error run:  
`export VIDEO_FORMAT=NTSC`  
or  
`export VIDEO_FORMAT=PAL`

Once dvdauthor has done it&#8217;s magic you can test the DVD structure before burning t disc with mplayer:

`mplayer dvd:// -dvd-device ./dvd`

Now all that remains is to burn the dvd folder to a DVD disc so it will play on a standard under the telly DVD player. For this we&#8217;ll use growisofs:

`growisofs -dvd-compat -Z /dev/hdc -dvd-video ./dvd/`

Remember to change /dev/hdc to whatever your dvdrw device is. You need to use the device, not the mount point (hint: it&#8217;ll be /dev/something, not /media).