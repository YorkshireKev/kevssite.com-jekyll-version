---
title: How to speed up a slow SSH login
author: Kev
layout: post
permalink: /2013/10/10/how-to-speed-up-a-slow-ssh-login/
dsq_needs_sync:
  - 1
categories:
  - Cloud
  - Linux
tags:
  - login
  - server
  - ssh
---
I recently started using the excellent digital ocean for some of my cloud server hosting. When logging into my servers there was quite a delay, often a minute or more, before the password prompt appeared. I was getting the same delay when I use SSH keys for authentication too.<!--more-->

I've had to solve this problem before on several occasions, but I always end up re-investigating the cause. So this time I thought it was about time I made a note of how  to fix the problem.

Right! First off let's see where the delay is by logging on the the server with the ssh debugging enabled. This is done by using the -v switch:
```shell
ssh -v root@server-ip-address
```

This shows conversation that the ssh client is having with the server as it negotiates a suitable authentication method.

For me, whenever I see long pauses in the login it's always because ssh hangs whenever it checks for GSSAPI. Apparently GSSAPI stands for <a title="Wikipedia" href="http://en.wikipedia.org/wiki/Generic_Security_Services_Application_Program_Interface" target="_blank">Generic Security Service Application Program Interface</a>.

So, the ssh debug info generally scrolls by pretty swiftly until it gets to:

```shellsession
debug1: Next authentication method: gssapi-with-mic
```

Then ssh just hangs for a while before reporting something along the lines of
```shellsession
debug1: Unspecified GSS failure
```

The fix is to simple disable GSSAPI as an ssh authentication option. This is done by editing the ssh server configuration file:
```shell
/etc/ssh/sshd_config
```

Search for the line:
```shellsession
GSSAPIAuthentication yes
```

and change yes to no; i.e.:
```shellsession
GSSAPIAuthentication no
```

After applying and saving the above change you'll need to restart the sshd daemon. On most systems this can be done by typing:
```shell
service sshd restart
```

Now next time you connect to your server with ssh, it should all happen much faster.

<span style="color: #ff6600">Update</span> &#8211; Alternative (client side work-around)  
An alternative to fixing the server side, you also switch GSSAPIAuthentication off as an authentication option every time you connect. Note that this will only affect that single connection, so you'll need to specifiy the option every time you connect.
```shell
ssh -o GSSAPIAuthentication=no root@server-ip-address
```
