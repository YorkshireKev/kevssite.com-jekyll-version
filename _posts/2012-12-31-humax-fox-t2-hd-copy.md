---
title: Copy Humax HDR-FOX T2 HD recording to USB
author: admin
layout: post
permalink: /2012/12/31/humax-fox-t2-hd-copy/
dsq_needs_sync:
  - 1
categories:
  - Linux
  - Viewpoint
tags:
  - humax
  - pvr
---
My Humax freeview recorder (a HDR-FOX T2 with 1tb drive) has recently started to show signs that it might be about to fail. The Hard drive is getting louder when recording and my most recent recordings pause periodically, often with the screen going blank and displaying the message &#8216;encrypted video cannot be show&#8217; (or something to that effect). At first the pauses were infrequent and short, but more recently they&#8217;ve been getting much worse often missing a minute or more of the recording per &#8216;glitch&#8217;. The hard drive test found in the setting menu is also failing now too.<!--more-->

So, I emailed Humax and after a week without a reply I thought I&#8217;d give them a call&#8230;

I was expecting a replacement, or at least a repair, but no. It seems that the problem could be tuning (really?!?) or I might need to format the hard drive. Only when I&#8217;ve done both of these things will a replacement be considered.

Of course this does highlight a problem with consumer hard drive recorders. If the drive fails you lose all your recordings even with a replacement unit. I&#8217;m now regretting replacing my RAID 1 mythtv setup&#8230;

So, formatting the drive will obviously wipe out all of my recordings. So I hooked up a USB hard disk and started copying the content off the humax. For SD recordings they are decrypted as they copy over to the USB drive. Unfortunately HD recordings don&#8217;t get decrypted. Some sort of DRM fluff n nonsense I think.

Now, I don&#8217;t think this would be a problem if I copy them back onto the humax for viewing, but if the format does not work and the drive is faulty then copying them onto a new humax wont work. Bah!

There is a Windows program called foxy that can be used to modify the binary metadata file of a HD recording so that it will be decrypted when copied to a USB drive (just like SD recordings are). But I could not get this to work on Linux.

I intend to write a simple(ish) program to do the same thing on Linux as this sounds like a useful backup tool to have. But I&#8217;m not sure if I&#8217;m going to stick with the Humax. It just depends if the drive is faulty or not. My thinking is that if the drive is faulty then I&#8217;ll get a replacement and that&#8217;s that. But if formatting the drive does fix the problem then this highlights a major issue for me. I don&#8217;t fancy having to &#8216;wipe&#8217; my recording once or twice a year just to keep the thing going!

Here is how I removed the encrypted flag manually using Ubuntu Linux.

<span style="color: #ff0000;"><strong>BIG FAT WARNING<br /> Editing files could make your </strong><strong>recordings unplayable, and could even invalidate your warranty. I&#8217;m not even sure if backing up HD content is even allowed.<br /> The instructions below are simply a blog of what I did to <em>my</em> humax files. There are no guarantees that they will work on <em>your</em> humax files. So if you follow these instructions and bad things happen to your humax recorder and/or recordings, don&#8217;t blame me!<br /> Remember, the risk of corrupting or damaging  your humax hard drive recorder is <em>yours</em> not mine.<br /> END OF BIG FAT WARNING</strong></span>

1.  Make sure you can FTP to your Humax box (RTFM on how to enable FTP). Hint: the default username is humaxftp and the password is 0000 which is your pin in case you&#8217;ve changed it <img src="http://www.kevssite.com/wp-includes/images/smilies/icon_smile.gif" alt=":)" class="wp-smiley" /> 
2.  There are four files for each recording. The one we&#8217;re interested in has the extension .hmt
3.  Copy the .hmt file to your PC. Then simply use a hex editor to modify the file. I suggest you make a backup copy of the file before editing it.
4.  The byte we need to change is at offset 0x3DC and will contain either 00 or 02 if the recording is encrypted (actually all files are encrypted, I guess the flag really means decryption allowed). Using the hex editor change this to 04 and then save the file.
5.  Now copy the file back to the humax box. When you navigate to the recording on the humax box you should no longer see &#8216;enc&#8217; next to the HD symbol.

<a href="http://www.linuxinstead.com/blog/2012/12/31/humax-fox-t2-hd-copy/screenshot-from-2012-12-31-203511/" rel="attachment wp-att-516"><img class="alignnone size-medium wp-image-516" title="Bliss hex editor" src="http://www.linuxinstead.com/blog/wp-content/uploads/2012/12/Screenshot-from-2012-12-31-203511-300x156.png" alt="editing a .hmt file" width="300" height="156" /></a>

Thanks to myhumax.org for information on hmt files. The hex editor I used is called Bless Hex Editor.