---
title: Mounting LVM backed XEN disk partitions in DOM0
author: Kev
layout: post
permalink: /mounting-lvm-backed-xen-disk-partitions-in-dom0/
redirect_from: /2010/10/27/mounting-lvm-backed-xen-disk-partitions-in-dom0/
syntaxhighlighter_encoded:
  - 1
dsq_needs_sync:
  - 1
categories:
  - Xen virtualization
tags:
  - dom0
  - domu
  - LVM
  - Xen virtualization
---
Sometimes you might need to mount a DOMU&#8217;s disk in DOM0, so that you can edit files, or even recover them in the event that your DOMU is broken and fails to boot.  
<!--more-->

  
kpartx is a handy command line tool that creates device maps from partition tables. So it can be used to create device mappings (in /dev/mapper/) for file and LVM backed DOM0 disks. In this short guide, I&#8217;ll be using LVM backed disks for examples&#8230;

The following assumes that the logical volume is called naslv and is in volume group datavg. Amend these to fit your system.

list partitions in an LVM logic volume:  
`kpartx -l /dev/mapper/datavg-naslv`

Example output:  
`datavg-naslv1 : 0 208782 /dev/mapper/datavg-naslv 63<br />
datavg-naslv2 : 0 2088450 /dev/mapper/datavg-naslv 208845<br />
datavg-naslv3 : 0 6088635 /dev/mapper/datavg-naslv 2297295`

As you can see, each partition is number is added to the end of the device name. A this stage we&#8217;ve just listed them, the device mapper has not been amended yet.

Now we add the partitions to the device mapper list, so that they can be mounted:  
`kpartx -a /dev/mapper/datavg-naslv`

Check that they have been added to device mapper:  
`ls -l /dev/mapper/datavg-naslv*`

example output:  
`brw-rw---- 1 root disk 253, 9 2010-07-10 10:06 /dev/mapper/datavg-naslv<br />
brw-rw---- 1 root disk 253, 11 2010-07-10 21:10 /dev/mapper/datavg-naslv1<br />
brw-rw---- 1 root disk 253, 12 2010-07-10 21:10 /dev/mapper/datavg-naslv2<br />
brw-rw---- 1 root disk 253, 13 2010-07-10 21:10 /dev/mapper/datavg-naslv3`

Now mount the required partition (filesytem) so that you can read/edit the files it contains:  
`mount /dev/mapper/datavg-naslv3 /mnt/xvda3`

When done, unmount the partition (filesystem):  
`umount /mnt/xvda3`

Now to tidy up and remove the partitions we added to the device mapper list:  
`kpartx -d /dev/mapper/datavg-naslv`

Confirm everything is back to pre faffing state:  
`ls -l /dev/mapper/datavg-naslv*`

example output:  
`brw-rw---- 1 root disk 253, 9 2010-07-10 10:06 /dev/mapper/datavg-naslv`