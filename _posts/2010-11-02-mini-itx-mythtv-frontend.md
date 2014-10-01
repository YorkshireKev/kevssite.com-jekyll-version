---
title: Mini ITX MythTV Frontend
author: Kev
layout: post
permalink: /2010/11/02/mini-itx-mythtv-frontend/
syntaxhighlighter_encoded:
  - 1
dsq_needs_sync:
  - 1
categories:
  - MythTV
tags:
  - ion
  - mini atx
  - mythtv frontend
---
After running my MythTV frontend on an old MicroSoft XBOX for a few years as a &#8216;proof of concept&#8217; I recently got the go ahead from the Missus to replace it with something a little snappier.

The old XBOX did a pretty good job all things considered. But with just 64MB of RAM it was never going to have the most responsive interface in the world, so the time has come to replace it.

After moochas googling for a suitable PC that could live happily in the living room under the telly, I decided to build a fanless mini-itx system in as small a case as I could.

<!--more-->

<img class="alignleft size-full wp-image-310" src="http://www.linuxinstead.com/blog/wp-content/uploads/2010/11/M350_case_1.jpg" alt="" width="300" height="220" />In the end I ordered an Asus AT3IONT-I Deluxe motherboard, a M350 case and 2GB of DDR3 RAM. For the storage I decided I didn&#8217;t need masses for a MythTV frontend, so an 8GB Compact Flash card would do nicely.

The Asus motherboard in it&#8217;s &#8216;Deluxe&#8217; flavour comes supplied with a DC power supply, where the Non-Deluxe version needs an ATX power supply. The advantage of DC power is that the power supply is basically a fanless &#8216;brick&#8217; that sits outside of the case, rather like a Laptop PSU.

The board has a dual core atom 330 processor fitted and a heatsink that covers most of the board. Again, no noisy fans!

On the back of the board are outputs for HDMI and VGA. The VGA output is important for me as I&#8217;m still stuck in the dark ages with a CRT TV, while the 1080P HDMI will come in handy whenI get round to upgrading to one of those new fangled LCD jobbies.

<p style="text-align: center">
  <a href="http://www.linuxinstead.com/blog/wp-content/uploads/2010/11/AT3IONT-I_back1.jpg"><img class="size-medium wp-image-287 aligncenter" src="http://www.linuxinstead.com/blog/wp-content/uploads/2010/11/AT3IONT-I_back1-300x71.jpg" alt="" width="300" height="71" /></a>
</p>

Another piece of hardware needed for the build was a Compact Flash to SATA adapter, so the CF card appears to the system as an 8GB SATA drive. This turned out to be quite a cheap way to go, costing just £5 off ebay. This neat storage solution means that I can remove the CF card and back it up on my desktop PC and also swap the CF card for another when I want to upgrade or re-install, keeping my current installation safe.

## The Software

My MythTV Backend server is based on Ubuntu 9.04, and for now I don&#8217;t want to upgrade it. So I decided that installing Mythbuntu 9.04 onto the new atom frontend was the way to go.

Mythbuntu 9.04 installed without any problems, although video and TV playback was very choppy, even at low resolutions. This version of mythbuntu (as it&#8217;s based on the ubuntu 9.04) did not ship with proprietary Nvidia drivers. However, downloading them from the Nvidia website and running through the installer was a fairly painless experience.

With the Nvidia drivers installed and running, the differences were very noticeable. Video playback was silky smooth, the board ran cooler and the power consumption dropped, now pulling just 16 watts while playing video. Prior to installi[<img class="alignright size-full wp-image-309" src="http://www.linuxinstead.com/blog/wp-content/uploads/2010/11/VGA_converter.jpg" alt="" width="180" height="146" />][1]ng the Nvidia drivers the board pulled 21 watts.

To get VGA output working with my CRT TV, I first tried using a VGA to Svideo lead. For this to work you need to modify the X11 modlines. However, after an evenings faffing about I could only manage to get a black and white picture, and not a very good one at that! So in the end I bought a VGA to TV adapter. Although this &#8216;just works&#8217;, the picture quality is still not that great. A little more effort in setting up X11 is needed&#8230;

Finally, I need to get a remote control working. The motherboard does come with a remote and sensor that plugs into USB. Unfortunately the remote is a little light in the button department and in Linux most of those don&#8217;t work! The motherboard has a COM connector on it, and I plan to use this to make the Hauppuage remote and sensor work.

These normally work with the tuner card, but as this is running in my MythTV backend server I&#8217;ll need to build a small circuit to get them working on the MythTV frontend box. Well, that&#8217;s the plan anyway!!

<img class="alignnone size-full wp-image-313" src="http://www.linuxinstead.com/blog/wp-content/uploads/2010/11/M350_case_2.jpg" alt="" width="300" height="213" /><img class="alignnone size-full wp-image-314" src="http://www.linuxinstead.com/blog/wp-content/uploads/2010/11/M350_case_3.jpg" alt="" width="300" height="181" />

 [1]: http://www.linuxinstead.com/blog/wp-content/uploads/2010/11/VGA_converter.jpg