---
title: Install nsenter from source
author: Kev
layout: post
permalink: /2014/08/05/install-nsenter-from-source/
dsq_needs_sync:
  - 1
categories:
  - Docker
  - Linux
tags:
  - docker
  - nsenter
---
nsenter is a great command line tool for accessing docker containers. Unfortunately  it isn&#8217;t available in Ubuntu 14.04 at the time of writing. Fortunately building it from source is quite simple.

Get the latest version of util-linux from kernel.org
<a href="https://www.kernel.org/pub/linux/utils/util-linux/" target="_blank">https://www.kernel.org/pub/linux/utils/util-linux/</a>

At the time of writing the latest version was v2.25, which is the version used in the examples here.
  
Install the build dependencies
```shell
sudo apt-get install build-essential libncurses5-dev libslang2-dev gettext zlib1g-dev \
libselinux1-dev debhelper lsb-release pkg-config po-debconf autoconf \
automake autopoint libtool python2.7-dev
```

Download the util-linux package source code (this contains nsenter)
```shell
cd /tmp
wget https://www.kernel.org/pub/linux/utils/util-linux/v2.25/util-linux-2.25.tar.gz
tar -xvf util-linux-2.25.tar.gz
```

Now we'll compile the nsenter program
```shell
cd util-linux-2.25
./configure
make nsenter
sudo cp nsenter /usr/local/bin
```

Confirm that nsenter in installed
```shell
nsenter --version
```

should return:
nsenter from util-linux 2.25
