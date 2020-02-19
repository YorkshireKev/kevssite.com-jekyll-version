---
title: Using cheap arduino clones with macOS Sierra
author: YorkshireKev
layout: post
permalink: /macos-sierra-driver-for-arduino-clones-ch340g/
redirect_from: /2016/12/06/macos-sierra-driver-for-arduino-clones-ch340g/
dsq_needs_sync:
  - 1
---
### Update - Feb 2020
These instructions are no longer required for macOS Mojave 10.14 or later. Updating to the latest macOS version should be enough to make Nanos based on CH340G chipset work. ***In fact, installing these drivers on macOS Mojave 10.14 or later could cause OS issues!***

### Original Post
I recently bought some really cheap Arduino Nanos. These were based on the CH340G chipset. Unfortunately, when I loaded the Arduino editor and tried to push code onto one of them, I discovered that there was no USB serial driver available to select.

The Mac already has Arduino USB drivers pre-installed and I've not had problems uploading code before. It turns out that some of the really cheap nano clones use different serial loaders to those used by genuine arduinos (or more expensive clones). My guess is that this is done to reduce licensing costs.

The Nano clones I bought cost me less than £3 each so I can't really complain if I need to mess about a bit to get them working.

There have also been reports that plugging in a nano clone that is based on any of the CH340 chipsets causes the kernel to panic in macOS Sierra. This appears to be the case if you have installed compatible drivers on a previous version of macOS.

It turned out to be really easy to get these cheap nanos working by installing a compatible USB serial driver. The hardest part was finding a working driver that is compatible with macOS Sierra. The driver I ended up using can be downloaded freely from [this GitHub repository](https://github.com/adrianmihalko/ch340g-ch34g-ch34x-mac-os-x-driver)

> ***Warning:*** Do not install if you have the current macOS Mojave 10.14 or
> later.

The instructions in the above repo explain how to install the drivers. In my case, I didn't have any kernel panic issue to resolve so I didn't need to manually delete any drivers. I simply ran the pkg file and rebooted my MacBook.

After installing the new driver I was able to upload code to both the CH340G based nano clone and the standard nano.