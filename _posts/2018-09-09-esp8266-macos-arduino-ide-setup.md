---
title: ESP8266 MacOS Arduino IDE Setup
description: ESP8266 MacOS Arduino IDE Setup
author: YorkshireKev
layout: post
permalink: /esp8266-macos-arduino-ide-setup
dsq_needs_sync:
  - 1
---
The ESP8266 isn’t an official Arduino, but the community has created a package so that it can be programmed from the Arduino IDE, and allow it to use the Arduino libraries.

This blog post describes how I set up my development environment on my Macbook Pro running High Sierra.

The first thing to do is to  download  and install the IDE. At the time of writing the latest version was 1.8.6

Once the IDE is installed, open the editor and then open preferences (under the Arduino menu) and paste this URL into the ‘Additional Boards Manager URLs’ field.

http://arduino.esp8266.com/stable/package_esp8266com_index.json

![](images/esp8266-macos-arduino-ide-setup/screenshot-2018-09-09-at-18.28.05.png "screenshot")

Next, we need to install the package so that we can use it. Go to the tools menu, select board manager and install the ESP8266 community package. The latest version should do!

In theory that’s all there is to setting up a development environment to support the ESP8266. However, when I tried to push a program to the board the USB-Serial port did not recognise the connected device.

After a bit of internet searching I found some posts suggesting that the serial chips used on most of these cheap Chinese made development boards require drivers. Mine contained a CP2102 but other common boards can use a CH340G

I found a  [great page](https://arduino-esp8266.readthedocs.io/en/2.4.2/faq/a01-espcomm_sync-failed.html)  that shows the chips used on various boards. I’ve copied the main image below for quick reference:

![](images/esp8266-macos-arduino-ide-setup/example-esp8266-boards-with-usb.png)

For me I needed the CP210x drivers for ESP8266 serial com usb to uart bridge. They can be  [downloaded from this silabs website page](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers).

However, this still didn’t work for me! It turns out that my mac was blocking the driver being loaded into the kernel. There was no warning or notification about the driver being blocked, so it took me a while to figure this out! To fix this you need to go to setting, then click on the security & privacy icon. At the bottom of the panel it says the driver is blocked. Click on the allow button and hey presto, it now works!

![](images/esp8266-macos-arduino-ide-setup/esp8266-security-icon-mac.png)

After allowing the driver to be loaded into the kernel, everything worked just fine for me.

## Still having problems?

Here are a few extra things you could try.

Make sure you use a decent USB cable! This caught me out and took half an evening for me to figure out. I returned to a project and could not get the IDE to detect my ESP board. I re-installed the drivers and checked the above security settings but still it would not detect the USB serial. I eventually switched USB cables and guess what, it worked!

The other common serial chip used on cheap Arduino clones is the CH340. You can download drivers from this  [git repository](https://github.com/adrianmihalko/ch340g-ch34g-ch34x-mac-os-x-driver). You can also get them from the  [originating Chinese website.](http://www.wch.cn/download/CH341SER_MAC_ZIP.html) Remember, you may also need to allow this driver to load in the security & privacy dialog.

I had also read that the FTDI drivers might need to be updated. These can be downloaded from [http://www.ftdichip.com/Drivers/VCP.htm](http://www.ftdichip.com/Drivers/VCP.htm)