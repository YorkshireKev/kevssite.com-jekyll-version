---
title: Add a Linux swap file
author: Kev
layout: post
permalink: /2013/10/13/add-a-linux-swap-file/
dsq_needs_sync:
  - 1
categories:
  - Cloud
  - Linux
tags:
  - swapfile
---
I notice that not all cloud hosted Linux servers have a swap enabled. When I spin up a new Centos based server on Digital Ocean for example, there is no swap space.

Usually you'd use a dedicated disk partition for swap, but when you only have the one disk allocated to your cloud server this is not an option. A good alternative is to create and use a file for your swap space. Here's a quick guide on how to do it.

Before we start, make sure you're logged in as root.

First, let's confirm that there is indeed no swap space. We'll do this by using the free command:
{% highlight bash %}
<pre>free -m
{% endhighlight %}

<em>output:</em>
{% highlight console %}
total       used       free     shared    buffers     cached
Mem:           499         47        451          0          4         23
-/+ buffers/cache:         19        480
Swap:            0          0          0</pre>
{% endhighlight %}

Note that swap is zero, confirming that there is no swap space in use on this server.

Next, we'll create a file of the size that we want our swap to be. I know that there are many many opinions on how big swap should be, but I find for a small could server a good option is to make it the same size as the amount of RAM. So, my server has about half a gig of ram, so that's the size of the swap file I'll create here.

There are a couple of ways to create an empty file of a specific size. Good old dd is my favourite, but it can be a bit slow if the file is large. Alternatively you can use `fallocate` which is much faster as it does not write data to the disk like dd does. For example, creating a 512 MB swap file with dd:
{% highlight bash %}
dd if=/dev/zero of=/swapfile bs=1M count=512
{% endhighlight %}

or fallocate:
{% highlight bash %}
fallocate -l 512M /swapfile
{% endhighlight %}
Once the file is created, we must change its permissions so that it it not world readable:

{% highlight bash %}
chmod 600 /swapfile
{% endhighlight %}

Next, format the file as a swap file:
{% highlight bash %}
mkswap /swapfile
{% endhighlight %}
<em>example output:</em>
{% highlight console %}
/swapfile: warning: don't erase bootbits sectors
on whole disk. Use -f to force.
Setting up swapspace version 1, size = 524284 KiB
no label, UUID=67ab43a1-d567-4275-abe1-09d190dd0d39
{% endhighlight %}

Now activate our new swapfile:
{% highlight bash %}
swapon /swapfile
{% endhighlight %}

Run the free command again to check that its all working:
{% highlight bash %}
free -m
{% endhighlight %}
<em>output:</em>
{% highlight console %}
total       used       free     shared    buffers     cached
Mem:           499        491          7          0          2        463
-/+ buffers/cache:         26        472
Swap:          511          0        511
{% endhighlight %}

To make sure that the swapfile is used after a server reboot we need to add an entry for it to `/etc/fstab: Edit <code>/etc/fstab` and add the following line to the end of the file:
{% highlight console %}
/swapfile none swap defaults 0 0
{% endhighlight %}
And that's it! Your server now has some Linux swap space.
