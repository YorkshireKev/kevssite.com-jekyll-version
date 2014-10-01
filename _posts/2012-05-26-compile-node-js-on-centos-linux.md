---
title: Compile node.js on Centos Linux
author: Kev
layout: post
permalink: /2012/05/26/compile-node-js-on-centos-linux/
syntaxhighlighter_encoded:
  - 1
dsq_needs_sync:
  - 1
categories:
  - Linux
  - Node.js
tags:
  - build
  - centos
  - compile
  - Node.js
---
This is a quick how to with the steps used to compile Node.js on Centos Linux.

These steps were successfully executed on Centos 6.2 x86 with node 0.6.18  
<!--more-->

  
First, download the sourcecode from www.nodejs.org and extract it:  
`tar -xvf node-v0.6.18.tar.gz`

Next, if you don&#8217;t have the development tools already installed you&#8217;ll need to install them (as root):  
`yum groupinstall 'Development Tools'`

&#8230;and you should also install openssl too (as root):  
`yum install openssl-devel`

Now we can start the build process.

`./configure`

If all loks well, lets compile node.js:  
`make`

And finally to install it into system, as root run:  
`make install`

If all that went well you should have a working node.js installation. Type `node --version` to see if it works.