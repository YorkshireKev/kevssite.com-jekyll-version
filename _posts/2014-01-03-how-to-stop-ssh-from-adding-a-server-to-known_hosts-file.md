---
title: How to stop ssh from adding a server to known_hosts file
author: Kev
layout: post
permalink: /how-to-stop-ssh-from-adding-a-server-to-known_hosts-file/
redirect_from: /2014/01/03/how-to-stop-ssh-from-adding-a-server-to-known_hosts-file/
dsq_needs_sync:
  - 1
categories:
  - Cloud
  - Linux
---
If you do a fair amount of tinkering on cloud servers, such as EC2 or Digital Ocean, then you'll have noticed that each time you start a server it gets a new IP address allocated. Then when you next log on to the server via ssh the server gets added to your known_hosts file.

Before long your known_host file has dozens, if not hundreds of entries for servers that you've long shut down and discarded.

At first I would edit the known host file and remove the server entry once I'd done with the server, but this got tiresome after a while.  So, I decided that for the servers I'm just messing about on I'd rather not add the server into the known_hosts file at all.<!--more-->Warning! Before proceeding you should be aware that the reason the remote server is added to the known host file is to prevent man-in-the-middle attacks. So preventing the entry being added will compromise your security. This is why I only do this for the temporary servers that know I'll be deleting shortly. I suggest you do the same!

To prevent the server being added to the known\_hosts file we can simply tell ssh to use a different known\_hosts file. I use the black hole /dev/null as in the example below.
{% highlight bash %}
ssh -q -o UserKnownHostsFile=/dev/null user@hostname/IP-address
{% endhighlight %}

The next problem to overcome is that everytime you connect ssh will warn you that the server identity cannot be verified and you have to type 'yes' to continue. This is because the server is not listed in your known_host file and so ssh acts at though every connection is the first connection. To fix this we can switch off host checking (again, another security compromise!). The example below shows the ssh command with both options set. The -q option just stops ssh from throwing out warning messages.
{% highlight bash %}
ssh -q -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no user@hostname/IP-address
{% endhighlight %}
