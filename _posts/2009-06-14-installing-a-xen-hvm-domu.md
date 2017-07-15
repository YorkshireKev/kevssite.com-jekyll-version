---
title: Installing a XEN hvm DOMU
author: Kev
layout: post
permalink: /installing-a-xen-hvm-domu/
redirect_from: /2009/06/14/installing-a-xen-hvm-domu/
syntaxhighlighter_encoded:
  - 1
dsq_needs_sync:
  - 1
categories:
  - Linux
  - Xen virtualization
tags:
  - domu
  - hvm
  - Xen virtualization
---
For this to work your CPU and motherboard needs to support vt (intel) or amd-v. You can check this by looking at the flags in /proc/cpuinfo. Your looking for either vmx or svm on the flags line.

If you&#8217;re doing this from your DOM0 then these flags may not actually show up. Instead type `xm info` and look for &#8216;hvm&#8217; on the virt_caps line.

For my hvm install, i&#8217;ll be installing Ubuntu 9.04 Desktop Linux.  
I have copied the live CD ISO onto my XEN DOM0 and will be installing directly from the iso rather than burning the CD. I have also created a 10GB LVM logical volume to act as the disk for my new DOMU.  
<!--more-->

  
The following config file is used to boot the live cd (iso image). It lives in /etc/xen and as this is to become a myth frontend i&#8217;ve rather imaginatively called it mythfronted!  
/etc/xen/mythfrontend:

    kernel = "/usr/lib/xen/boot/hvmloader"
    builder='hvm'
    memory = 512
    name = "mythfrontend"
    vif = [ 'type=ioemu, bridge=eth0' ]
    disk = ['file:/xenimages/ISO/ubuntu-9.04-desktop-i386.iso,hda:cdrom,r', 'phy:/dev/mapper/datavg-mythfrontendlv,sda,w', ]
    boot="d"
    
    sdl=0
    vnc=1
    vnclisten="0.0.0.0"
    vncpasswd='password'
    stdvga=0
    serial='pty'
    usbdevice='tablet'

I find that setting usbdevice to tablet rather than mouse gives better results with a mouse than setting it to mouse.

Once you have your config file created and matching your system (i.e. pointing to the cd or iso, and file of lvm for hard disk) then we&#8217;re good to boot it:  
`xm create mythfrontend`

If all went well then we should see it running in `xm list`

Now we need to connect to it&#8217;s display with vnc.  
If this is the first DOMU to use vmc as a framebuffer then you should be able to run `vnc ` to get access to the display. In the config above I have defined a password to be entered.

If you need to specify the port, then typing `netstat -tap` should let you see which port (probably 5900 ish).

Once you have connected to via VNC you will then be able to run the installer as usual. This should work for installing Windows as well as Linux.  
<a rel="attachment wp-att-273" href="http://www.linuxinstead.com/blog/2009/06/14/installing-a-xen-hvm-domu/ubuntu_installing/"><img class="size-full wp-image-273 alignnone" title="ubuntu_installing" src="http://www.linuxinstead.com/blog/wp-content/uploads/2009/06/ubuntu_installing.png" alt="" width="400" height="311" /></a>

After the install has completed, shutdown the new DOMU, because we need to edit the config file to remove the cd iso image and allow it to boot from it&#8217;s hard disk.

This basically means removing the cd-rom/iso section in the disk= parameter, change the device name for the hard disk from sda to xvda and removing boot=&#8221;d&#8221; completely. This should leave our config looking something like this:

    kernel = "/usr/lib/xen/boot/hvmloader"
    builder='hvm'
    memory = 512
    name = "mythfrontend"
    vif = [ 'type=ioemu, bridge=eth0' ]
    disk = [ 'phy:/dev/mapper/datavg-mythfrontendlv,xvda,w', ]
    
    sdl=0
    vnc=1
    vnclisten="0.0.0.0"
    vncpasswd='password'
    stdvga=0
    serial='pty'
    usbdevice='tablet'

Now just start the DOMU with `xm create mythfrontend`  
And that&#8217;s it!