---
title: Xen 4.1 released
author: Kev
layout: post
permalink: /xen-4-1-released/
redirect_from: /2011/03/25/xen-4-1-released/
syntaxhighlighter_encoded:
  - 1
dsq_needs_sync:
  - 1
categories:
  - Xen virtualization
tags:
  - Xen virtualization
---
Today saw the release of Xen 4.1. Major changes include support for greater than 255 CPUs, a new credit scheduler and CPU pools.

However, the most significant change to those that use Xen will be the new XL toolstack which replaces XM/XEND and will ultimately replace xcp&#8217;s xapi and libvirt.<!--more-->

There&#8217;s no need to panic just yet though because XM is still included in Xen 4.1 and sits alongside XL.

Further details can be found in the Xen 4.1 release notes:  
<http://blog.xen.org/index.php/2011/03/25/xen-4-1-releases/>

It&#8217;s good to see Xen moving forward and continuing to converge with Linux mainline kernel. What I&#8217;d really like to see though, is a pre-built up to date Xen Distro and a decent web based management front end. Now *that* would cause sleepless nights over at VMware HQ&#8230;