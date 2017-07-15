---
title: Installing Android 2.1 onto T-Mobile Pulse
author: Kev
layout: post
permalink: /installing-android-2-1-onto-t-mobile-pulse/
redirect_from: /2010/11/20/installing-android-2-1-onto-t-mobile-pulse/
syntaxhighlighter_encoded:
  - 1
dsq_needs_sync:
  - 1
categories:
  - Android
---
This short guide takes you through the steps needed to install a custom Android 2.1 ROM onto the original T-Mobile Pulse.

The official T-Mobile Android 2.1 ROM was removed from T-Mobiles website because it had a few bugs, the worst of which meant that you&#8217;d lose the odd text message. However the latest &#8216;custom&#8217; ROMS appear to have fixed these problems.<!--more-->

I upgraded my phone using the FLB 1.7 ROM and various guides over at the Modaco forums (<a href="http://www.modaco.com" target="_blank">www.modaco.com</a>). This is a simple step by step guide of how I upgraded my phone. You might want to also check with the forums for additional information, especially <a href="http://android.modaco.com/content/t-mobile-pulse-pulse-modaco-com/311809/the-ultimate-pulse-owners-guide/" target="_blank">this thread</a>.

First off, some background information.

*   As far as I know this guide will only work with the original pulse; the Huawei U8220. Take the battery out to check the model number of your phone.
*   The Pulse has a limited amount of memory which is not enough to run Android 2.1 (this was part of the problem with the official t-mobile release). To fix this you need to run a swap partition on your SD memory card.
*   A class 6 SD card is recommended, however I have this working with a class 4 card.
*   I have an 8GB class 4 card in my phone, but you can get away with using a 1GB card, just make sure its a class 4 or higher for it to be fast enough to run swap.

<span style="color: #ff0000"><strong>BIG FAT WARNING<br /> Installing a custom ROM on your phone will almost certainly invalidate your warranty.</strong><strong><br /> It is also possible that you could brick your phone.<br /> The instructions below are simply a blog of what I did to <em>my</em> phone. There are no guarantees that they will work on <em>your</em> phone. So if you follow these instructions and bad things happen to your phone, don’t blame me!<br /> Remember, the risk of making your phone completely useless is <em>yours</em> not mine.<br /> END OF BIG FAT WARNING</strong></span>

The basic stages we&#8217;re going to perform for upgrading are:

1.  Install the official T-Mobile 2.1 ROM. This is needed because this upgrade modifies the phones internal partition sizes. The custom ROM won&#8217;t work with the original Android 1.5 sizes.
2.  Install a custom recovery boot image
3.  Install the custom Android 2.1 ROM
4.  Configure the ROM to use SWAP and run apps from the SD card.

First off, download the software needed onto your PC.  
[Official T-Mobile Android 2.1 update][1]  
[Recovery boot image][2]  
[FLB 1.7 Custom ROM (aka custom Android 2.1)][3]  
[Fixed terminal emulator][4]

**Back up anything you need to keep from your phone. e.g. sync your contacts with google etc. Copy anything you need to keep from your SD card to your PC because your card will be wiped during the upgrade.**

Note: If you have been running a custom 1.5 ROM with A2SD, it&#8217;s best to re-partition your SD card back to a single FAT32 partition before you start the upgrade. The easiest way to do this is to put your SD card into a card reader and use Gparted.

Right, now you&#8217;ve backed up everything you need, lets start the upgrade&#8230;

Stage1, apply the t-mobile official 2.1 update.

1.  Unzip the Official 2.1 ROM and copy the **DLOAD** folder onto the root of your SD card. By root I mean don&#8217;t put it in any sub-folder on the SD card.
2.  With the SD card back in the phone and the phone powered off, hold down the buttons &#8216;red end call&#8217; + &#8216;volume up&#8217; + &#8216;power&#8217; and wait for the preparing update message.
3.  Confirm that you want to update and then wait for the update to complete. At the end of the update you&#8217;ll get a message saying the phone will restart. For me the phone just hung. If this happens simply remove and re-insert the the battery
4.  Confirm that the 2.1 update has worked, but don&#8217;t go mad and install apps etc because you&#8217;ll be wiping the phone again in a moment.

Stage 2 &#8211; Install recovery boot image.

1.  Unzip the recovery image onto you PC and navigate to the folder. Make the file install-recovery-linux.sh executable (i.e. **chmod +x install-recovery-linux.sh**)
2.  With your phone powered off hold down the buttons &#8216;red end call&#8217; + &#8216;volume down&#8217; + &#8216;power&#8217;. The screen should go blue.
3.  Connect the USB cable to the phone and PC
4.  On the PC as root run install-recovery-linux.sh (e.g. in ubuntu cd to the folder containing the superboot files and type sudo ./install-recovery-linux.sh). When you get the successful message you can reboot the phone (i.e. remove/re-insert the battery. You&#8217;ll probably have to remove the USB cable too).

Stage3 &#8211; Install the custom FLB Android 2.1 ROM

1.  Boot into the recovery menu by holding down the buttons &#8216;red end call&#8217; + &#8216;menu&#8217; + &#8216;power&#8217; and wait until the recovery menu appears (after 10 seconds or so).
2.  Plug the USB cable into the phone and PC.
3.  Using the track-ball scroll down to the option &#8216;USB toggle&#8217; and press the track-ball to select.
4.  The SD card should now mount on your Linux PC. Copy the custom rom zip file (flbmod_v1.7.zip) to the root of the sd card. Don&#8217;t unzip it, just copy the zip file.
5.  Once the zip file has been copied, press the green button to toggle the USB back to off.
6.  Use the track-ball and select the &#8216;Wipe&#8217; option. Choose the First option (Factory reset) and confirm. Once the wipe has completed return to the main menu (with the &#8216;home&#8217; button).  
    ** **
7.  ** **Now select &#8216;Flash ZIP from SD card&#8217;. Select the custom rom you wish to flash, confirm and then wait for the installation to complete.
8.  Return to the main menu and select &#8216;Partition SD card&#8217;.
9.  Using the &#8216;volume up/down&#8217; buttons to change the sizes and &#8216;green&#8217; to confirm set the swap to either 32 or 64mb. I went for 64mb (don&#8217;t go any bigger because it will slow the phone down). Then a suitable size for the ext2 partition. The ext2 partition is where the apps will be installed. 512mb is OK, 1024 is better if you have a big enough SD card!
10. Return to the main menu end select the &#8216;reboot&#8217; option.
11. Be patient! it takes ages for the phone to start up on the first reboot!

Stage 4 &#8211; Configure the ROM to use the SD card for apps.

<span style="color: #ff0000">Although there are apps to SD (a2sd) options in the recovery menu, you should not use them. They are for an older version of a2sd and will cause problems if used on the version included in the Android 2.1 ROM.</span>

1.  Open the terminal emulator app. When I did this the app crashed with a force close. If this happens to you then you&#8217;ll need to install the fixed version you downloaded earlier. Copy the file to the FAT32 (data) partition of your SD card (this can be done from the USB option in the recovery menu or in the usual Android fashion)  and navigate to it using es file explorer from the installed apps menu. You can unzip and then navigate to &#8230;fixterm/system/app and tap on Term.apk and install it.
2.  In the terminal emulator app type **su -** to switch to the root user.
3.  Now type **a2sd check** to list all the current settings. If you scroll through the output you should see that swap is running, but the apps and dalvik cache are on the internal storage.
4.  To move the apps to the SD card type **a2sd reinstall**. Your phone will then reboot to apply the settings (again, the first boot takes a while)
5.  To move the dalvik cache to the SD card type **a2sd cachesd**. Again, your phone will restart to apply the settings. Please note that unless you have a very fast SD card (class 6+) you should leave the cache on the internal memory. If you have the cache on the SD card and need to move it back to the internal storage type a2sd nocache. <span style="color: #ff0000">Warning: There is another setting, a2sd cachepart. <strong>DO NOT</strong> USE THIS SETTING! it will stop your phone from booting and you&#8217;ll have to wipe your phone and start again.</span>
6.  That&#8217;s it. You should now be able to enjoy Android 2.1 on your Pulse. I recommend that you now boot into the recovery menu and make a nandroid backup of your phone before&#8230;

Extra.

After using the above upgrade for a short while I noticed my phone would slow down after about 10-15 minutes of heavy use. This appears to be because pages are being moved to/from swap in high volume. To fix this I reduced the swappiness from the default of 60% down to 20% with the command **a2sd swappy20** (as root in terminal emulator app) I also set the memory &#8216;task killer&#8217; setting to moderate with the command **a2sd lowmem-moderate**. Then manually restarted the phone.

Tip: to check the current value of swappiness type **cat /proc/sys/vm/swappiness**

 [1]: http://support.t-mobile.co.uk/library/TMOBILE/handsets/Pulse/Android%202.1/Pulse%20Android21.zip
 [2]: http://www.linuxinstead.com/blog/wp-content/uploads/2010/11/1.5.2-pulse-amonrarecovery.zip
 [3]: http://www.flibblesan.co.uk/android/flbmod/flbmod_v1.7.zip
 [4]: http://flibblesan.co.uk/android/flbmod/flbmod_v1.7_termfix.zip