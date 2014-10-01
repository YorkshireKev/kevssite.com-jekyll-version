---
title: Acer Aspire S3 UltraBook and Ubuntu 14.04
author: Kev
layout: post
permalink: /2014/07/07/acer-aspire-s3-ultrabook-and-ubuntu-14-04/
dsq_needs_sync:
  - 1
categories:
  - Linux
  - Viewpoint
tags:
  - acer s3
  - aspire
  - laptop
  - ubuntu
---
So, we&#8217;re a Linux users&#8230; We appreciate the power and flexibility of open source and we like that our development PC runs the same software as our servers. While building a desktop PC and installing Ubuntu on it is great n&#8217; all, I wanted my next Linux desktop to be a little more portable. Coding in the garden anyone? yes please!

Now, I really like the look of Apple&#8217;s macbook air. But apple&#8217;s wonder machine is out of my budget and I&#8217;d also have had to switch from Linux to MacOX.

So, after a bit of research and a bit of time on eBay, I found myself to be the owner of a used Acre Aspire S3 UltraBook. All in, cost me less than a quarter of the price of a macbook air.<!--more-->

The Aspire came pre-installed with Windows, but my plan was to replace that with Ubuntu 14.04 (the lastest Ubuntu at the time of writing).

The aspire has no optical media, so the first thing is to copy the Ubuntu installation image onto a USB stick, and install from that. Note that you can&#8217;t just copy the .iso file onto the USB, as that won&#8217;t boot.

I have a Linux desktop already, so I simply downloaded Ubuntu onto that and copied it to a USB stick using the dd command:

    sudo dd if=/path/to/ubuntu-14.04-desktop-amd64.iso of=/dev/sdX bs=4096

Where /dev/sdX is the USB device. Please be careful and tripple check you are entering the correct device (dmesg can help by telling that you just plugged in a USB device). If you accidentally overwrite your root hard drive, don&#8217;t blame me!

Next plug the USB into the  S3 and switch on. I strongly recommend running on mains power while installing Ubuntu.

To boot from USB, you&#8217;ll need to press F2 when at startup and either change the boot order, or enable the boot select menu option.

Once Ubuntu has booted up, the installation is pretty standard. The only issue I had was that the installer does not seem to have an option to connect to a hidden wifi to allow it to install updates as it goes. However, this did not cause any problems as an internet connection is not actually need during install and I was easily able to update once the install had completed.<figure id="attachment_610" style="width: 300px;" class="wp-caption alignnone">

<img class="size-medium wp-image-610" src="http://www.kevssite.com/wp-content/uploads/2014/07/acer-s3-300x229.png" alt="Linux powered ultrabook!" width="300" height="229" /><figcaption class="wp-caption-text">Linux powered ultrabook!</figcaption></figure> 
I should note that my S3 did not come with the built in 20gb SSD storage, so I can&#8217;t say how easy it is to install to that. My install was made to the 500gb &#8216;normal&#8217; hard drive, replacingWindows.

Once the install had completed the S3 would not boot correctly. It dropped into the busybox command shell with an error saying that the root disk could not be found. Interestingly it all looks to be where it should, and if I typed exit from busybox Ubunto continued to boot and loaded the desktop.

After a bit of experimentation with rootdelay and rootwait, which didn&#8217;t make any difference, I found that the issue was with using disk uuid was causing the boot problem (I&#8217;m still not sure why though). To fix the problem edit the default grub boot config:

    sudo vi /etc/default/grub

and uncomment the line :

    GRUB_DISABLE_LINUX_UUID=true

while we&#8217;re editing the grub config, we might as well make the screen backlight buttons work correctly, as by default they look like they work, but don&#8217;t actually change the screen brightness.

Find the line that starts GRUB\_CMDLINE\_LINUX_DEFAULT= and change it so it looks like this:

    GRUB_CMDLINE_LINUX_DEFAULT="quiet splash acpi_osi=Linux acpi_backlight=vendor"

Then save the file and run grub-update to make the changes take effect at system start.

    sudo update-grub

The only problem left is that the screen brightness always starts at 100%, meaning that you&#8217;d have to manually reduce it every time you started the system. The following line will change the brightness to a specific value on each reboot.

Edit /etc/rc/local and add the following line, just before the exit 0 line at the bottom of the file.

    intel_backlight 20

The above will set the brightness to 20%, just change the number to whatever you want it to be. Note that setting it to 0 will make the screen black and unreadable.

The only niggle I did find was that when resuming from suspend (i.e. close the lid to suspend, then open it to resume) the screen would be black with just the cursor showing. At first I thought the machine had locked up because the cursor didn&#8217;t move, but it turns out that it is just slow to resume and did come back eventually.

I found it easier if I turned screen lock off from the brightness and lock setting in system settings. Then I can just open the lid and wait maybe 30 seconds for the desktop to appear. The downside to this is that I don&#8217;t have to enter my password when resuming, but this isn&#8217;t a problem for me.

Another issue I found is that sometimes Wifi does not re-connect after resume. Restarting network-manger quickly restores connection.

    sudo restart network-manager

For most of the time the system is totally silent. The internal fan does come on when when the system is having to do some work, but when web-browsing and text editing I hardly ever hear it start.

Battery life is somewhat shorter that the 6 hours advertised, typically I get 3:30 hours. This might be because the battery is not new and past its prime though.

With the above changes applied Ubuntu runs really nicely on the Acer Aspire S3. So far everything seems to work, including hardware accelerated 3D. The multi-touch touchpad works out of the box.

All in all, a really nice Linux laptop at a bargain price. What&#8217;s not to like?