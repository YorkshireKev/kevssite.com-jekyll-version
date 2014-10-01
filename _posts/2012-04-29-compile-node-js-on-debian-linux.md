---
title: Compile Node.js on Debian and Ubuntu Linux
author: Kev
layout: post
permalink: /2012/04/29/compile-node-js-on-debian-linux/
syntaxhighlighter_encoded:
  - 1
dsq_needs_sync:
  - 1
categories:
  - Linux
  - Node.js
tags:
  - build
  - compile
  - debian
  - Node.js
---
Building Node.js on Linux is fairly simple, as there are few dependencies. This is how I did it on Debain 6 (Squeeze). At the time of writing the current release of Node.js was 0.6.15. You&#8217;ll need to adjust the intructions below to reflect the version you&#8217;re building.

Update: I have also successfully tested these instructions with node.js 0.6.17 on Ubuntu 12.04.

<!--more-->

*   Download the Node.js source, e.g. `wget http://nodejs.org/dist/v0.6.15/node-v0.6.15.tar.gz`

*   Extract the files: `tar -xvf node-v0.6.15.tar.gz`

*   cd into the newly extracted node.js folder: `cd node-v0.6.15`

*   If you don&#8217;t have the essential build tools install then you&#8217;ll need to install them. As root run `apt-get install build-essential`
*   You&#8217;ll also need python, if if you don&#8217;t already have it installed, as root run` apt-get install python`

*   We&#8217;ll also need to build in SSL support, so let&#8217;s install the openssl libs: as root run `apt-get install libssl-dev`

At this point we can run ./configure and proceed with the node.js build. You&#8217;ll see that configure will report that openssl is not found, but the build will still work. This is because configure uses pks-config to check for openssl. If the this bothers you then run (as root) `apt-get install pkg-config` and ./configure will then find openssl.

Right, that&#8217;s the pre-compile stuff done, lets get on and compile node.js! From this point it&#8217;s all standard Linux build commands: ./configure, make and make install. So&#8230;

*   run `./configure` (can be either root or a regular user)

*   Then `make` (again, either as root or a regular user)

*   and finally, as root run `make install` to install node into the system folders.

All done, so lets just check Node.js has been successfully installed. Type `node --version`

Now all you need to do is start writing some event driven JavaScript code&#8230; Over to you!