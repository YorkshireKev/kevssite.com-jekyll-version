---
title: K9COPY crashing on Ubuntu 10.10
author: Kev
layout: post
permalink: /k9copy-crashing-on-ubuntu-10-10/
redirect_from: /2011/03/27/k9copy-crashing-on-ubuntu-10-10/
syntaxhighlighter_encoded:
  - 1
dsq_needs_sync:
  - 1
categories:
  - Linux
tags:
  - dvd
---
I recently gave K9COPY a try, it&#8217;s supposed to be the Linux equivalent of DVDshrink for Windows. It certainly looked the part, but when I ran it with a disk I wanted to back up it ran for a short while and then crashed <img src="http://www.kevssite.com/wp-includes/images/smilies/icon_sad.gif" alt=":-(" class="wp-smiley" /> 

Looking at the output of dmesg revealed that the disk was having trouble reading the encrypted disk:  
`[235.097347] sr 5:0:0:0: [sr0] Add. Sense: Read of scrambled sector without authentication<!--more-->`

It was at this point I realised that I had not yet installed the restricted media packages (also needed to play DVD films). So&#8230;  
`sudo apt-get update && sudo apt-get install libdvdread4<br />
sudo /usr/share/doc/libdvdread4/install-css.sh`

&#8220;That should do it&#8221; I thought! But no luck, it still didn&#8217;t work. I searched synaptic and installed some other packages that looked like they should help but still nothing&#8230; The disk would not play or back-up.

In the end deleted the contents of `~/.dvdcss` and amazingly, it worked!

So if you&#8217;ve followed the Ubuntu instructions and still can&#8217;t play or back up a movie DVD then you might want to give this a try. I&#8217;m posting it here because it&#8217;s not an obvious solution and I&#8217;m sure I wont remember it next time I re-install my system.