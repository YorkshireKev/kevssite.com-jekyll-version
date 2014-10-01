---
title: Using vi as a hex editor
author: Kev
layout: post
permalink: /2009/04/21/using-vi-as-a-hex-editor/
syntaxhighlighter_encoded:
  - 1
dsq_thread_id:
  - 1763114083
dsq_needs_sync:
  - 1
categories:
  - Linux
tags:
  - hex
  - vi
---
Sometimes I find it useful to switch to hex mode when editing a file in vi. The command for switching is not very obvious so thought I&#8217;d share&#8230;

So, open a file in vi as usual, hit escape and type:  
`:%!xxd` to switch into hex mode

And when your done hit escape again and type:  
`:%!xxd -r` to exit from hex mode.

Okay, so this isn&#8217;t actaully switching to vi&#8217;s &#8216;hex mode&#8217;; vi doesn&#8217;t have one. What the above actually does is to stream vi&#8217;s buffer through the external program &#8216;xxd&#8217;.