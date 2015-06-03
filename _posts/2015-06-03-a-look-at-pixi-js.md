---
title: A look at Pixi.js
author: Kev
layout: post
permalink: /2015/06/03/a-look-at-pixi-js/
dsq_needs_sync:
  - 1
---
I've been experimenting with the html canvas element recently by writing some simple 2D games. One challenge is making a canvas based game fit nicely on the screen given the vast variety in browser resolutions. 2D games tend to be made up of images and I found that scaling these images so that they fill the browser window was both slow and ugly.

This got me thinking about WebGL. Is it possible to use a 3D WebGL library to render a 2D game and gain the scaling and performance advantages of the GPU? At first I looked at three.js, which is probably the most popular WebGL library. But in doing my research I discovered a dedicated 2D JavaScript WebGL library called [Pixi.js](http://www.pixijs.com/).

Pixi.js provides a JavaScript API for 2D rendering, sprites and scaling using WebGL and will automatically fall back to the canvas rendering if WebGL is not available. This sounded ideal so I figured I'd give it a closer look.

After studying some of the examples on the Pixi.js website I created a few dodgy looking demos (these are safely hiddeen away in a dark corner of my hard drive to save me some embarrassment). Now that I had a basic understanding of how Pixi.js worked I thought I'd have a go at writing a simple 2D game.

You can take a look at the game I created by visiting the [game page](/bloxed). The source code is available on [my github page](https://github.com/YorkshireKev/bloxed).

![Bloxed](/images/bloxed.png)

I found the Pixi.js api to be extremely well thought out and predictable to use. Performance seems good, even on my ageing AMDx2 Desktop PC. Scaling the graphics to match the browser window was a little trickier that I expected as I soon realised that I'd have to make adjustments to keep the correct aspect ratio of my badly drawn graphics. Just scaling to the browser window size tends to stretch the image.

Considering that this was my first serious attempt with Pixi.js and that I'm still getting to grips with JavaScript, all in all I'm quite pleased with the result.