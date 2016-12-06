---
title: Using cheap arduino clones with macOS Sierra
author: YorkshireKev
layout: post
permalink: /2016/12/06/macos-sierra-driver-for-arduino-clones-ch340g/
dsq_needs_sync:
  - 1
---
I recently bought some really cheap Arduino Nanos. These were based on the CH340G chipset. Unfortunately when I loaded the Arduino editor and tried to push code onto one of them, I discovered that there was no usb serial driver available to select.

The Mac already has Arduino usb drivers pre-installed and I've not had problems uploading code before. It turns out that some of the really cheap nano clones use different serial loaders to those used by genuine arduinos (or more expensive clones). My guess is that this is done to reduce licensing costs.

The Nano clones I bought cost me less than £3 each so I can't really complain if I need to mess about a bit to get them working.

There have also been reports that plugging in a nano clone that is based on any of the CH340 chipsets causes the kernel to panic in macOS Sierra. This appears to be the case if you have installed compatible drivers on a previous version of macOS.

It turned out to be really easy to get these cheap nanos working by installing a compatible usb serial driver. The hardest part was finding a working driver that is compatible with macOS Sierra. The driver I ended up using can be downloaded freely from [this GitHub repository](https://github.com/adrianmihalko/ch340g-ch34g-ch34x-mac-os-x-driver)

The instructions in the above repo explain how to install the drivers. In my case I didn't have any kernel panic issue to resolve so I didn't need to manually delete any drivers. I simply ran the pkg file and rebooted my MacBook.

After installing the new driver I was able to upload code to both the CH340G based nano clone and the standard nano.