---
title: Downloading from DV firewire 1394 camcorder with dvgrab
author: Kev
layout: post
permalink: /dv-firewire-1394-camcorder-with-dvgrab/
redirect_from: /2012/08/25/dv-firewire-1394-camcorder-with-dvgrab/
dsq_needs_sync:
  - 1
categories:
  - Linux
tags:
  - 1394
  - Camcorder
  - dvgrab
  - firewire
---
I&#8217;ve always had trouble downloading footage from my old DV camcorder using desktop tools like Kino, with it often locking up when I leave it to download a full tape.

I prefer to use OpenShot for editing, so all I really need is a simple tool to allow me to download footage from the camcorder. I&#8217;ve recently discovered the command line tool dvgrab, and it works wonderfully!<!--more-->

Once installed (`apt-get install dvgrab` on debian/ubuntu) the following command will rewind the tape and start to import footage. A new file will be created for each &#8216;break&#8217; on the tape. The files are written with the recordings date/time as the filename and a prefix as specified on the command. Just remember to cd to the folder you want to have the files written to before running the command.

`dvgrab -a -format raw -rewind -t holiday-`

Where holiday- should be replaced by whatever you want to have as a prefix on each filename.