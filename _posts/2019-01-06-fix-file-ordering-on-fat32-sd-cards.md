---
title: Fix file ordering on fat32 sd cards
description: How to fix the file listing order on fat32 sd cards
author: YorkshireKev
layout: post
permalink: /fix-file-ordering-on-fat32-sd-cards/
dsq_needs_sync:
  - 1
---
I recently started using cassette tape emulators to load games on my retro zx Spectrum and C64 (search casduino and tapduino if you’re interested in these). Basically these work by holding the tape images as files on an SD or Micro SD card and the casduino then plays them as audio into the old computers as though a tape deck was connected. They work great but one issue I found was that the files did not list in the expected order when viewing through the casduino menu.

It turns out that the FAT filesystem (FAT12, FAT16 and FAT32) list directories in the order that files were written to the filesystem, and it is the OS that re-orders them.

For systems that don’t sort the files before displaying, like casduino and some car audio players, it can be difficult to find the file you’re after when they are not in alphabetical order.

After a fair amount of searching I discovered an open source program called fatsort written by Boris Leidner. Fatsort is a command line utility that modifies the order of directories and files on a FAT formatted SD card.

The instructions on fatsort’s website [https://fatsort.sourceforge.io/](https://fatsort.sourceforge.io/) has instructions for compiling and installing from sourcecode, but for Linux users there is a pre-built version in most distribution repositories and Mac users can install using brew.

Using the command is fairly simple with the trickiest part being identifying the sd card device so we can point fatsort at it.

# Step 1 – Locate the SD card. #
On both Linux and Mac you can use the mount command to find the device of the SD card. Insert the SD card and let it mount as usual. Then type mount to see where the card was mounted.

{% highlight bash %}
mount
/dev/disk1s1 on / (apfs, local, journaled)
devfs on /dev (devfs, local, nobrowse)
/dev/disk1s4 on /private/var/vm (apfs, local, noexec, journaled, noatime, nobrowse)
map -hosts on /net (autofs, nosuid, automounted, nobrowse)
map auto_home on /home (autofs, automounted, nobrowse)
/dev/disk1s2 on /Volumes/Preboot 1 (apfs, local, journaled, nobrowse)
//Time%20Machine%20User@synology-nas._afpovertcp._tcp.local./Time%20Machine%20Folder on /Volumes/Time Machine Folder (afpfs, nobrowse)
/dev/disk3s1 on /Volumes/ZX_SPECTRUM (msdos, local, nodev, nosuid, noowners)
$
{% endhighlight %}
Your output will differ from mine, but you should be able to spot your sd card. In the example above (on my Mac) the ZX_Spectrum SD card was mounted as /Volumes/ZX_SPECTRUM. The bit we’re interested in the the device path of the mounted sd card. In the example above this is /dev/disk3s1. Take a note of the device path (e.g. /dev/disk3s1 in the above example) or copy it to the clipboard as we’ll need it later. Linux output will be very similar.

# Step 2 – Unmount the SD card #
Next we need to unmount the sd card before we can run fatsort on the device. You can do this by using the umount command or simply use the remove/eject options from the desktop.

{% highlight bash %}
sudo umount /Volumes/ZX_SPECTRUM
{% endhighlight %}

# Step 3 – Run fatsort #
Now we are ready to run fatsort.

{% highlight bash %}
fatsort {device path}
{% endhighlight %}
{% highlight bash %}
..using the above example device would look like this.
fatsort /dev/disk3s1
{% endhighlight %}
And that’s it! After a few seconds the filesystem should be converted into alphanumeric order. There are various options to refine how the sort will operate (use fatsort -h or man fatsort for details). However, the default options were just fine for me.