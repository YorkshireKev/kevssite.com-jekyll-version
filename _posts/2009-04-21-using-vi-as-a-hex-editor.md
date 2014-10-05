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
Sometimes I find it useful to switch to hex mode when editing a file in vi. The command for switching is not very obvious so thought I'd share&#8230;

So, open a file in vi as usual, hit escape and type:
{% highlight bash %}
`:%!xxd` to switch into hex mode
{% endhighlight %}

And when your done hit escape again and type:
{% highlight bash %}
`:%!xxd -r` to exit from hex mode.
{% endhighlight %}

Okay, so this isn't actaully switching to vi's 'hex mode'; vi doesn't have one. What the above actually does is to stream vi's buffer through the external program 'xxd'.
