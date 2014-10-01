---
title: Copying JVC Everio HDD camcorder recordings with Linux
author: Kev
layout: post
permalink: /2009/03/01/copying-jvc-everio-hdd-camcorder-recordings-with-linux/
dsq_needs_sync:
  - 1
categories:
  - Linux
tags:
  - Camcorder
  - Everio
  - JVC Everio
  - Linux
---
As you might expect, the software that accompanied my Everio HDD camcorder when I bought it was not compatible with Linux. Just as well we don&#8217;t actually need any special software to download recordings onto your favourite OS (yes I *do* mean Linux!)

Plug everything in, USB and the power adapter then switch the camera into PLAY mode.

At this point you should be presented with the usual KDE or GNOME window and be able to view/copy the files in the same way as you would a USB memory stick.

However, there are a couple of drawbacks with this. First, just dragging the files will create a copy on your PC with timestamps of when you copied the videos, not actually filmed them. Second, the video files on your camcorder end in .mod and not .mpg which would be preferable for compatible playback.

So we&#8217;ll be using the command line to copy recording and rename them. There&#8217;s not much to it really&#8230;<!--more-->

Open a terminal and cd into the directory that contains the mount point for the camcorder. In my case this was /media/EVERIO_HDD.  
The video files are nested a little deeper in SD_VIDEO/PRG001.  
(e.g. `cd /media/EVERIO_HDD/SD_VIDEO/PRG001`)

This folder contains two types of files ending in .mod and .moi. We only need the .mod files as these are the actual videos.  
To copy them from the camcorder to your hard drive use something along the line of:

`mkdir /home/my_vids/downloaded_2009-03-01<br />
cp -p *.MOD /home/my_vids/downloaded_2009-03-01/`

This can take a while as the files can be quite large. Note that the -p option tells the cp command to preserve the file timetamps, which will have been set by the camcorder when the recording was made.

I prefer the files to have a suffix of .mpg instead of .MOD. Run the following rename command from within your downloaded folder to convert them.

`cd <code>/home/my_vids/downloaded_2009-03-01<br />
rename 's/.MOD$/.mpg/' *.MOD`

And thats about it. You will still need to delete them from the camcorder (best done from the camcorder menu). Also remember to keep backups...