---
title: Manually creating a Xen DOMU instance
author: Kev
layout: post
permalink: /2009/04/13/manually-creating-a-xen-domu-instance/
syntaxhighlighter_encoded:
  - 1
categories:
  - Linux
  - Xen virtualization
tags:
  - domu
  - Xen virtualization
---
If you&#8217;ve followed my guide to installing xen from source then you might now be wondering how to create your first VM.  
This guide will show you how to manually create and install a VM (known as a DOMU instance in Xen) without any additional tools such as virt-manager, virt-install or virsh. These tools can help the novice, but are quite limiting when it comes to the advance features of xen.

For this example I&#8217;ll be installing CentOS5, but this should work for any red-hat based distro (please note there is a bug in fedora10 that stops it booting under xen). This example also uses the paravirtual kernel so it will work even if your CPU does not support AMD-V or intel-VT.

Right, down to business. The first thing we need to do is create a file to user as the hard disk for the DOMU. There are other options for providing hard disks to a DOMU, and I&#8217;ll cover some of them in a later guide but for this install I&#8217;ll be using a file.

The command below will create an 8GB file that will be used as an 8GB drive. The whole file will be written to disk in one go so may take a short while to complete.  
`dd if=/dev/zero of=/xenimages/test01/disk1.img oflag=direct bs=1M count=8192`  
<!--more-->

  
Alternatively, you can use the command below to create the same size file as a sparse file. What this does is create the file, but only take up disk space as the file is used. In this case the file will only really take about 1mb of disk initially and grow as you use it.  
`dd if=/dev/zero of=/xenimages/test01/disk1.img oflag=direct bs=1M seek=8191 count=1`  
There are pros and cons of using sparse files. On one hand they only take as much disk as is actually used, on the other hand the file can become fragmented and you could run out of real disk if you overcommit space.

Next up we&#8217;ll mount the install CD and export it over nfs so that xen can use it as a network install.  
`mkdir /tmp/centos52<br />
mount /dev/hda /tmp/centos52 -o loop,ro`  
Just to check the mount went OK: `ls /tmp/centos52` should show the files.  
Now run the export:  
`exportfs *:/tmp/centos5`

Now we&#8217;ll create the xen config file for our new instance. The default location for xen config files is /var/xen so that&#8217;s where ours will go.  
I&#8217;m going to call my VM test01, so I&#8217;ll create a file /var/xen/test01 that contains the following initial configuration:

    kernel = "/tmp/centos52/images/xen/vmlinuz"
    ramdisk = "/tmp/centos52/images/xen/initrd.img"
    name = "test01"
    memory = "256"
    ## disk = [ 'tap:aio:/xenimages/test01/disk1.img,xvda,w', ]
    disk = [ 'file:/xenimages/test01/disk1.img,xvda,w', ]
    vif = [ 'bridge=eth0', ]
    vcpus=1
    on_reboot = "destroy"
    on_crash = "destroy"

Note that if you are installing from a different machine from your xen machine the you will need to nfs mount the install disk in order for the above config to kick off the installer. e.g.  
`mount IP address:/tmp/centos52 /tmp/centos52`

So, lets boot the new instance and start the installer.  
`xm create test01`  
After a moment or two the console should return with something like &#8220;Started domain test01&#8243;.

Now lets connect to the console and proceed with the install:  
`xm console test01`

Or if you prefer the previous two commands can be combined into one: `xm create test01 -c`.

From here on you should work through the standard text mode installer.  
The points to note are:

*   ** For installation image select &#8220;NFS image&#8221;.** Then in the later nfs panel enter your PC&#8217;s IP address for the servername and /tmp/centos52 (or wherever you mounted the cd) as the directory.
*   I also specified a manual IP address for my VM. I selected my routers IP for the gateway and dns server, so that I can access the internet from the VM later.
*   The hard drive is named **xvda**, as specified in the config file. This will need to be partitioned and formatted by the installer.

The rest of the install is fairly straight forward. If in doubt just go with the defaults, although it&#8217;s probably a good idea to set a manual IP address in your subnet range so that you can easily ssh onto the VM.  
Note that to release the console from your VM hold down **Ctlr** and press the **]** key.

When the install is complete the new domain will need to be shut down (you&#8217;ll be prompted to &#8216;restart&#8217; by the installer, this will in fact shut down the VM because we set the on_reboot option to destroy), and then the xen config file must be modified to allow the new VM to boot.  
So, edit the config file that we created earlier and comment out the kernel and ramdisk lines. You should also change the on\_crash and on\_reboot actions to restart.  
So the edited config file now looks like this:

    <strong>## kernel = "/tmp/centos52/images/xen/vmlinuz"
    ## ramdisk = "/tmp/centos52/images/xen/initrd.img"</strong>
    name = "test01"
    memory = "256"
    ## disk = [ 'tap:aio:/xenimages/test01/disk1.img,xvda,w', ]
    disk = [ 'file:/xenimages/test01/disk1.img,xvda,w', ]
    vif = [ 'bridge=eth0', ]
    vcpus=1
    <strong>on_reboot = "restart"
    on_crash = "restart"</strong>

Finally we can boot the new VM instance:  
`xm create test01 -c`  
and log in as root. You should also be able to ssh onto it from your network.

And that&#8217;s about it!  
One last note. If you want the VM to start and stop with your xen server, just move the config file into the auto sub folder (or create a symbolic link to it).