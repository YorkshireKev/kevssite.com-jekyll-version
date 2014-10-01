---
title: XEN DOM0 support in mainline kernel at last!
author: Kev
layout: post
permalink: /2011/02/03/xen-dom0-in-mainline-kernel/
syntaxhighlighter_encoded:
  - 1
dsq_needs_sync:
  - 1
categories:
  - Linux
  - Xen virtualization
---
The XEN developers ad community have been trying fr years to get DOM0 support into the Linux mainline kernel. On January 5th 2011 it finally happened when Linux kernel 2.6.37 was released.

Okay, so it&#8217;s only basic support at this stage, but it does represent a significant milestone in the hypervisors history.<!--more-->

DOM0 is the first domain (virtual machine) started by the XEN hypervisor and has privileged access to the computer hardware and drivers.

DOMU support was added to mainline kernel some time ago through the PARAVIRT_OPS API. However until now the DOM0 had to use a specially modified version of the Linux kernel.

So what? I hear you ask&#8230; Well the hope is that with DOM0 support available in the stock kernel, Linux distributions will start adding XEN virtualization as an option to along side KVM etc. Combined with all the advantages of having the latest kernel in DOM0, such as disk mirroring, really could deliver enterprise class computing in a cheap, open and community driven package. Now there&#8217;s a thought&#8230;