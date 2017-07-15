---
title: How to set up a Linux RAID mirror
author: Kev
layout: post
permalink: /how-to-set-up-a-linux-raid-mirror/
redirect_from: /2009/04/28/how-to-set-up-a-linux-raid-mirror/
dsq_needs_sync:
  - 1
categories:
  - Linux
tags:
  - raid
  - raid 1
  - software raid
---
This is a quick guide to setting up a Linux software RAID mirror (aka RAID 1).

There are a couple of toolsets for managing raid on Linux, raidtools and mdadm. This guide will use mdadm because imho it has better commands and features for monitoring.

Right, first you&#8217;ll need a couple of disk partitions of about the same size. These should be on separate disks or you&#8217;ll be defeating the point of raid mirroring <img src="http://www.kevssite.com/wp-includes/images/smilies/icon_wink.gif" alt=";-)" class="wp-smiley" />  
<!--more-->

  
Raid disks appear under /dev as md0, md1 etc.  
A quick way to check the status of your raid devices is to type `cat /proc/mdstat`

On my system this shows:  
md1 : active raid1 sda2[0] sdb2[1]  
96320 blocks \[2/2\] \[UU\]

md0 : active raid1 sda1[0] sdb1[1]  
29294400 blocks \[2/2\] \[UU\]

Because on my system md0 and md1 are already in use, I will create this new raid as md2.

So lets assume that you have 2 partitions; /dev/sda3 and /dev/sdb3. The following command will create a raid device as /dev/md2.  
`mdadm --create --verbose /dev/md2 --level=mirror --raid-devices=2 /dev/sda3 /dev/sdb3`

If all went well you can confirm the size/details of your new raid device:  
`mdadm --detail /dev/md2`  
/dev/md2:  
Version : 00.90  
Creation Time : Wed Apr 22 21:34:44 2009  
Raid Level : raid1  
Array Size : 458993024 (437.73 GiB 470.01 GB)  
Used Dev Size : 458993024 (437.73 GiB 470.01 GB)  
Raid Devices : 2  
Total Devices : 2  
Preferred Minor : 2  
Persistence : Superblock is persistent

Update Time : Wed Apr 22 21:34:44 2009  
State : clean  
Active Devices : 2  
Working Devices : 2  
Failed Devices : 0  
Spare Devices : 0

UUID : e893056a:5de3d066:4bca1532:59cc93a2 (local to host xenmaster)  
Events : 0.1

Number Major Minor RaidDevice State  
0 8 3 0 active sync /dev/sda3  
1 8 19 1 active sync /dev/sdb3

And you cat check that it is running:  
`cat /proc/mdstat`  
md2 : active (auto-read-only) raid1 sdb3[1] sda3[0]  
458993024 blocks \[2/2\] \[UU\]  
resync=PENDING

md1 : active raid1 sda2[0] sdb2[1]  
96320 blocks \[2/2\] \[UU\]

md0 : active raid1 sda1[0] sdb1[1]  
29294400 blocks \[2/2\] \[UU\]

In my case you can see that the raid pair is not synced yet. After about 10 minutes or so re-issuing the command shows that the raid pair are now syncing (alternatively you can try running the raid to kick start the sync by issuing `mdadm --run /dev/md2`):  
`cat /proc/mdstat`  
md2 : active raid1 sdb3[1] sda3[0]  
458993024 blocks \[2/2\] \[UU\]  
[=>...................] resync = 7.6% (35247744/458993024) finish=73.2min speed=96456K/sec

and `mdadm -detail /dev/md2`  
/dev/md2:  
Version : 00.90  
Creation Time : Wed Apr 22 21:34:44 2009  
Raid Level : raid1  
Array Size : 458993024 (437.73 GiB 470.01 GB)  
Used Dev Size : 458993024 (437.73 GiB 470.01 GB)  
Raid Devices : 2  
Total Devices : 2  
Preferred Minor : 2  
Persistence : Superblock is persistent

Update Time : Wed Apr 22 22:10:29 2009  
State : active, resyncing  
Active Devices : 2  
Working Devices : 2  
Failed Devices : 0  
Spare Devices : 0

**Rebuild Status : 9% complete**

UUID : e893056a:5de3d066:4bca1532:59cc93a2 (local to host xenmaster)  
Events : 0.3

Number Major Minor RaidDevice State  
0 8 3 0 active sync /dev/sda3  
1 8 19 1 active sync /dev/sdb3

At this point is should be possible to mount and use the raid device and even format it while it is being rebuilt. However, I want to put LVM on it so I&#8217;ll wait until the sync is complete&#8230;

Please note that the new raid device will most likely sow in /proc/mdstat as active (auto-read-only) until you either mount it or create an LVM volume on it (i.e. use it).

And that&#8217;s it really. You use /dev/md2 as you would any disk partition such as /dev/sda1 to format, mount or use as a PV for LVM.