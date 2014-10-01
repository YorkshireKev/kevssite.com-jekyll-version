---
title: Compiling bumptech Stud on Centos 6
author: Kev
layout: post
permalink: /2013/03/17/compiling-bumptech-stud-on-centos-6/
dsq_needs_sync:
  - 1
categories:
  - Linux
tags:
  - centos
  - stud
---
<a href="https://github.com/bumptech/stud" target="_blank">Stud</a> is the &#8220;Scalable TLS Unwrapping Daemon&#8221; written by bumptech and used by 85million bump users. I use it to offload SSL connections in front of haproxy for really scalable websites. It&#8217;s not so much that I need to scale massively, but it does allow me to run on really small (i.e. cheap) servers. I&#8217;m aware that the development branch of HAproxy now supports SSL directly, but as yet I have not seen any performance tests so for now I will stick with stud.

I have previously built stud on Debian Linux and the build process is really simple; make and then make install (once openssl-devel in installed and or course the utilities gcc and make too!)

But I&#8217;ve recently moved over to Centos as my server OS of choice and ran into some problems whilst building stud. The error reported when I ran make was file ev.h not found.<!--more-->So, I used yum to install libevent/libevent-devel, but I still got the same error! It turns out that libev and libevent are not the same thing!

I had to manually download and install libev/libev-devel because they are not in the yum repository.

The versions I installed can be downloaded from here:

`<a href="http://dl.fedoraproject.org/pub/epel/6/x86_64/libev-4.03-3.el6.x86_64.rpm" target="_blank">http://dl.fedoraproject.org/pub/epel/6/x86_64/libev-4.03-3.el6.x86_64.rpm</a><br />
<a href="http://dl.fedoraproject.org/pub/epel/6/x86_64/libev-devel-4.03-3.el6.x86_64.rpm" target="_blank">http://dl.fedoraproject.org/pub/epel/6/x86_64/libev-devel-4.03-3.el6.x86_64.rpm</a>`

The above libs are for Centos 6 64 bit (I&#8217;m running Centos 6.4 64bit). Other versions can be found on the same site, <a href="http://pkgs.org/" target="_blank">http://pkgs.org/</a>

I installed tham using the yum command: `yum localinstall libev-devel-4.03-3.el6.x86_64.rpm libev-4.03-3.el6.x86_64.rpm<br />
`  
Even after installing libev the make still failed. It seems that the header files were not installed to the correct place.

I simply copied the following file into the common libs folder:

`cp /usr/include/libev/ev.h /usr/include<br />
`  
Now, finally, I was able to make and install stud!