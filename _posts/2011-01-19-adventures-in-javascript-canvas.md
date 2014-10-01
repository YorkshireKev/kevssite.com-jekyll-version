---
title: Adventures in JavaScript Canvas
author: Kev
layout: post
permalink: /2011/01/19/adventures-in-javascript-canvas/
dsq_thread_id:
  - 1763097584
dsq_needs_sync:
  - 1
categories:
  - Programming
  - Retro Computing
tags:
  - html5
  - JavaScript
---
I&#8217;ve been reading a lot about HTML5 recently and it looks like the browser could soon become the dominant application platform. So, I thought I&#8217;d have a look at the new canvas element and delve into some JavaScript.

To get me started I&#8217;ve decided to write a (very) simple version of an old classic zx Spectrum  game: Jumping Jack.<!--more-->

At the time of writing this only works in browsers that support the new canvas html element. So yay for Firefox and boo to Internet Explorer.

Click the thumbnail below to run the game. You can the right click or something to view the code.<figure id="attachment_29" style="width: 200px;" class="wp-caption alignnone">

<a href="http://www.kevssite.com/kevscode/jumpingjack" target="_self"><img class="size-full wp-image-29" src="http://www.kevssite.com/wp-content/uploads/2012/05/jj-thumbnail.png" alt="An experiment in html5 canvas" width="200" height="140" /></a><figcaption class="wp-caption-text">Click to launch the... erm, 'game'</figcaption></figure> 
If you&#8217;re going to use my code as a learning reference then you should note that I&#8217;m not a JavaScript programmer and, even then I cut a few corners to speed things up. This simple game is the result of an afternoons tinkering, so don&#8217;t expect much!

While the canvas element looks great for simple 2d drawing, the html5 feature that really excites me is WebGL. When its finally available it should be a game changer&#8230;