---
title: Installing Xen 3.3.1 from source on Debian 5.0 (Lenny)
author: Kev
layout: post
permalink: /2009/04/07/installing-xen-33-from-source-on-debian-50-lenny/
syntaxhighlighter_encoded:
  - 1
dsq_needs_sync:
  - 1
categories:
  - Xen virtualization
tags:
  - debian
  - lenny
  - xen 3.3.1
  - xen compile
  - Xen virtualization
---
This is how I built my Xen server.

First install Debian 5.0 (Lenny). This should also work on 4 (Etch) too.

Everything is done on the command line as root.

To build Xen from source you&#8217;ll need as fair number of dependencies. The easiest way to install them is by using the apt-get install command as below:  
`apt-get install bcc bin86 gawk bridge-utils iproute libcurl3 libcurl4-openssl-dev bzip2 module-init-tools transfig tgif texinfo pciutils-dev mercurial build-essential make gcc libc6-dev zlib1g-dev python python-dev python-twisted libncurses5-dev patch libvncserver-dev libsdl-dev libjpeg62-dev`

If you installed the 64bit version of Debian then you&#8217;ll also need gcc-multilib for the compile to work:  
`apt-get install gcc-multilib`  
<!--more-->

  
Next create a temporary folder and download the Xen source code:  
`mkdir xentemp<br />
cd xentemp<br />
wget http://bits.xensource.com/oss-xen/release/3.3.1/xen-3.3.1.tar.gz`

Now extract the soucecode from the downloaded archive:  
`tar -xzf xen-3.3.1.tar.gz<br />
cd xen-3.3.1`

Right, now on with the compile (this will take a while&#8230;):  
`make world`  
*Note, if you want USB and PCI passthrough to answer Y when prompted.*

Assuming that the above compile went ok:  
`make dist`

And now install the newly compiled kernel and tools into the system:  
`./install.sh`

Ensure the xen deamon starts and stops with the rest of the system:  
`update-rc.d xend defaults 20 21<br />
update-rc.d xendomains defaults 21 20`

Create the module dependencies stuff:  
`depmod 2.6.18.8-xen`

Update/create initramfs for the new kernel:  
`update-initramfs -c -k 2.6.18.8-xen `

Add the new kernel to your grub boot menu:  
`update-grub`

Reboot the system and hope that it works!  
`reboot`

Now have a xen kernel:  
`uname-a`  
Should show a xen kernel at version 2.6.18

However on my gigabyte motherboard I was getting some boot time errors:  
*2.6.18 exception Emask 0&#215;40 SAct 0&#215;0 SErr 0&#215;800 action 0&#215;2*

A quick google confirmed that this was due to the old kernel version, 2.6.18 and my motherboard.  
So to fix the error I used synaptic to install latest xen kernel from lenny repositories&#8230;

`uname -a`  
2.6.26-1-xen-amd64 #1 SMP Fri Mar 13 21:39:38 UTC 2009 x86_64 GNU/Linux  
This resolved the error and still leaves me with xen 3.3.1

Type `xm info` to confirm xen version

And that&#8217;s it!