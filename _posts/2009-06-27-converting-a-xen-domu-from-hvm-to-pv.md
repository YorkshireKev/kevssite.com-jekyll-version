---
title: Converting a XEN DOMU from HVM to PV
author: Kev
layout: post
permalink: /converting-a-xen-domu-from-hvm-to-pv/
redirect_from: /2009/06/27/converting-a-xen-domu-from-hvm-to-pv/
dsq_needs_sync:
  - 1
categories:
  - Xen virtualization
tags:
  - hvm
  - paravirtual
  - pv
  - Xen virtualization
---
For distros that don&#8217;t support XEN compatible installers the easiest way to create a PV (ParaVirtual) DOMU is to install as a HVM (see my other article entry for this) ad then once installed, convert it to a PV DOMU.

There are several reasons why you might want to go with PV instead of HVM. The main two that spring to mind are PV&#8217;s offer better performance/lower overhead and PV DOMU&#8217;s allow PCI passthrough. Although apparently XEN 3.4 can now do PCI passthrough with HVM, as long as you have an Intel chip with vt-d.

This article will start off where my previous &#8220;Installing a XEN hvm DOMU&#8221; left off&#8230;  
<!--more-->

  
The description below uses Ubuntu 9.04. If your using a different distro your mileage may vary.

Most modern kernels will already support XEN PV, but without PCI passthrough. If you don&#8217;t need to pass any PCI devices directly to the DOMU then you can skip this next bit&#8230;

To install a full xen compatible kernel, taken from Debian:  
With the DOMU booted as a HVM, add the following lines to the end of `/etc/apt/sources.list`

    # Added for Debian xen kernel
    deb http://ftp.debian.org/debian/ lenny main
    deb-src http://ftp.debian.org/debian/ lenny main
    deb http://ftp.debian.org/debian/ lenny-proposed-updates main

Now start synaptic from the system/administration menu, and click on the **reload** button to refresh the package lists. Ignore the warning about the new Debian repositories not being verified.  
Now hit search and enter `linux-image-2.6.26-2-xen` and click to install it (it will also install the modules automatically).

Now we need to edit the boot menu, to add a disk option so that pvgrub can find the disk. If you&#8217;ve installed the XEN specific kernel as above then we&#8217;ll also add an entry for that too.  
Edit `/boot/grub/menu.lst`  
To convert the standard kernel copy the code block for the first boot option and then add the root (hd0,0) line (dont just copy the whole lot below, as your uuids will differ)

    title           Ubuntu 9.04, kernel 2.6.28-11-generic<strong>-PV</strong>
    uuid            265b80ca-0896-48a7-913a-6f5df64776bc
    <strong>root (hd0,0)</strong>
    kernel          /boot/vmlinuz-2.6.28-11-generic root=UUID=265b80ca-0896-48a7-913a-6f5df64776bc ro quiet splash
    initrd          /boot/initrd.img-2.6.28-11-generic
    quiet

And for the Debian XEN kernel:

    title           Ubuntu 9.04, kernel 2.6.26-2<strong>-xen</strong>
    uuid            265b80ca-0896-48a7-913a-6f5df64776bc
    <strong>root (hd0,0)</strong>
    kernel          /boot/<strong>vmlinuz-2.6.26-2-xen-amd64</strong> root=UUID=265b80ca-0896-48a7-913a-6f5df64776bc ro quiet splash
    initrd          /boot/<strong>initrd.img-2.6.26-2-xen-amd64</strong>
    quiet

Note that the above xen kernel and initrd are for the 64bit version, use 2.6.26-2-686 for 32bit.

While you at it you might want to install `openssh-server` so that you can shell onto the DOMU later.  
You may also consider going with a fixed IP address so that you can find your DOMU when you want to shell onto it!  
edit `/etc/network/interfaces`

    # The primary network interface
    auto eth0
    iface eth0 inet static
    address 192.168.1.xxx
    netmask 255.255.255.0
    gateway 192.168.1.1

Now we&#8217;re ready to change the config file on the DOM0, so shut down the DOMU.

Edit you XEN DOMU config file and replace:

    kernel = "/usr/lib/xen/boot/hvmloader"
    builder='hvm' 

with:

    kernel = "/usr/lib/xen/boot/pv-grub-x86_64.gz"
    extra = "(hd0,0)/boot/grub/menu.lst"

Restart your DOMU and it should boot into a PV kernel. Now you can do neat things like PCI passthrough! (I&#8217;ll knock up another blog for that&#8230;)