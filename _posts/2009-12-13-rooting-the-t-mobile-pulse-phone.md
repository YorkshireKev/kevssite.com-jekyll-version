---
title: Rooting the T Mobile Pulse phone
author: Kev
layout: post
permalink: /rooting-the-t-mobile-pulse-phone/
redirect_from: /2009/12/13/rooting-the-t-mobile-pulse-phone/
syntaxhighlighter_encoded:
  - 1
dsq_needs_sync:
  - 1
categories:
  - Android
tags:
  - Android
  - phone
  - rooting
  - t mobile
---
I decided it was time to change my mobile phone. Being a Linux nerd I decided to opt for an Android based phone.  
There are quite a number to choose from. The HTC Hero being the most popular, but at the time this would have cost me £360 of my hard earned cash.  
T-Mobile have released an &#8216;own brand&#8217; phone, the pulse, manufactured by Huawei. At the time of writing you can get one for under £150.

The pulses spec is very similar to that of the hero, but with slightly less memory, leaving just 60mb left to install new apps into. For reasons best known to google, android apps cannot be installed onto the SD card which is a real shame not least for the apps market in general.<!--more-->

Please note that rooting a phone will not, by itself, allow you to install apps onto the SD card. For that you also need to modify the ROM, or replace it with a custom ROM.

<span style="color: #ff0000;"><strong>BIG FAT WARNING<br /> Rooting your phone will almost certainly invalidate your warranty.</strong><strong><br /> It is also possible that you could brick your phone.<br /> The instructions below are simply a blog of what I did to <em>my</em> phone. There are no guarantees that they will work on <em>your</em> phone. So if you follow these instructions and bad things happen to your phone, don&#8217;t blame me!<br /> Remember, the risk of making your phone completely useless is <em>yours</em> not mine.<br /> END OF BIG FAT WARNING</strong></span>

Getting root access on the phone is fairly simple.

First download <a href="http://android.modaco.com/content/t-mobile-pulse-pulse-modaco-com/294178/11-12-1-4-rooting-the-pulse-introducing-superboot/" target="_blank">superboot</a> and <a href="http://android.modaco.com/content/t-mobile-pulse-pulse-modaco-com/294290/14-12-1-5-2-installing-the-patched-recovery-image-on-your-device/" target="_blank">Amon RA</a> from the [modaco website][1].

Unzip the two files into separate folders and chmod the files install-superboot-linux.sh and install-recovery-linux.sh to make them executable (e.g. chmod u+x filename).

Switch the phone off (&#8220;power off&#8221;)

Hold Volume Down and the red button and switch the phone on.

This should bring you to the USB FastBoot screen. Now attach the USB cable to the phone and PC.

As root run install-superboot-linux.sh (e.g. in ubuntu cd to the folder containing the superboot files and type sudo ./install-superboot-linux.sh)

This is enough to give you root access. However, if you also want the ability to make backups of your phone and/or install custom roms then you can also install the recovery image:

As root run install-recovery-linux.sh (e.g. in ubuntu cd to the folder containing the superboot files and type sudo ./install-recovery-linux.sh)

Once you get the successful message you can restart the phone. I waited a couple of mins, &#8220;just in case&#8221;. The only way I could find to get out of the fastboot screen was to remove the battery.

And that&#8217;s about it.

To test that you have root access you need to install a ssh client, such as ConnectBot and shell onto localhost. When you do an su to gain root access, a pop-up window should ask you if you want to allow root access or not.

If you&#8217;ve also installed the recover image then you use the quickboot icon that should now be in your apps list. This will re-boot your phone into the recovery menu where you can backup and restore images as well as a few other options.

 [1]: http://android.modaco.com/