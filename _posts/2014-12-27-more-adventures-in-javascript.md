---
title: More adventures in JavaScript
description: The classic zx spectrum game lightcycles recreated in JavaScript.
author: Kev
layout: post
permalink: /more-adventures-in-javascript/
redirect_from: /2014/12/27/more-adventures-in-javascript/
dsq_needs_sync:
  - 1
---
Having not written much client side JavaScript for at least a couple of years I thought I'd re-introduce myself to the language, and to the html5 canvas element.

I decided to spend a few hours building a html5 version of the old ZX Spectrum Classic, Lightcycles (1983), which itself was based on Tron. This isn't exactly a faithful reproduction, it's more inspired by my memory of the game than it is a conversion of it.

The object of the game is simple enough. You can either play against the computer or against another player. 2 play mode is done old school style and requires both players to share the keyboard - no online network gameplay here!

The aim of the game is to race and trap your opponent. Keep blocking them until they crash into either the edge of the grid or a laser trail.

![ZX Spectrum](/images/lightcycles-zx.gif "Original ZX Spectrum version of Light Cycles by PSS")
[![HTML5 Canvas](/images/lightcycles-canvas.png "HTML5 Canvas version of LightCycles - Click to play!")](/stuff/lightcycles/lightcycles.html)

If you fancy a quick game, [click here to play html5 LightCycles.](/stuff/lightcycles/lightcycles.html) The sourcecode is [available on GitHub.](https://github.com/YorkshireKev/LightCycles)

A few things I learnt while writing this simple game:

- Named global objects are a good way to minimising global variable leakage.
- Property names of objects don't minify/uglify at all, only the object name gets mangled.
- Drawing to the canvas is slower and takes more CPU resources than I had expected.

To get round the CPU load I kept two in memory arrays for the game grid and only drew the differences between the current and last frame to the canvas. I also checked against the grid array for collisions, as checking the canvas directly is even more expensive than drawing to it. There is probably a better way than to draw boxes for each pixel, but I wanted the display to scale to match the screen resolution.

All in all, I had en enjoyable afternoon writing the game. It's no masterpiece for sure, but it was a useful JavaScript refresher!