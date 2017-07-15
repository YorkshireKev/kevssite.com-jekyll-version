---
title: HP Deskjet F2180 stops after printing half of a page
author: Kev
layout: post
permalink: /hp-deskjet-f2180-stops-after-half-page-print/
redirect_from: /2009/08/30/hp-deskjet-f2180-stops-after-half-page-print/
syntaxhighlighter_encoded:
  - 1
dsq_needs_sync:
  - 1
categories:
  - Linux
---
I&#8217;ve just installed the 64bit version of Ubuntu 9.04 onto my main desktop PC. Everything was going well until I wanted to print a document.  
No, my printer was correctly detected and when I clicked &#8216;print&#8217; the printer burst into life as expected. But after printing about half of the first page the printer just stopped. My printer is a HP Deskjet F2100 series (F2180 to be precise).

I tried everything, google didn&#8217;t throw up anything useful, I installed later HP drivers but noting fixed it.

After a lot of head scratching ad experimenting I did notice something odd. The USB device as owned by a user I did not have permissions for. I wasn&#8217;t expecting this to be the cause of the problem because if it was due to permissions then surely the printer would not print at all?!? 

I was wrong, and adding myself to the group that owned the USB device has fixed it. As this seemed quite off the wall I thought I&#8217;d share&#8230;  
<!--more-->

  
So, first, see where the printer is connected:  
[sourcecode language="bash"]lsusb  
Bus 001 Device 003: ID 0dda:2027 Integrated Circuit Solution, Inc. USB 2.0 Card Reader  
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub  
Bus 002 Device 003: ID 03f0:7d04 Hewlett-Packard Deskjet F2100 Printer series  
Bus 002 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub[/sourcecode]

So its bus 002, device 003.

Next lets have a look at that device:  
[sourcecode language="bash"]ls -l /dev/bus/usb/002/003  
crw-rw&#8212;-+ 1 lp lp 189, 130 2009-08-30 17:25 /dev/bus/usb/002/003[/sourcecode]

So the group is lp  
Next add the group lp to any users that need access to the printer. Remember to user the -a switch to append to the existing group list.

[sourcecode language="bash"]usermod -aG lp userid[/sourcecode]

You&#8217;ll then need to log off and back on for the permissions to take effect.