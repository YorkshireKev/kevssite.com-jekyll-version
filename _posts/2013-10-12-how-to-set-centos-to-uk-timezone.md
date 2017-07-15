---
title: How to set Centos to UK timezone
author: Kev
layout: post
permalink: /how-to-set-centos-to-uk-timezone/
redirect_from: /2013/10/12/how-to-set-centos-to-uk-timezone/
dsq_needs_sync:
  - 1
categories:
  - Linux
tags:
  - centos
---
A quick' cut and paste' tip for setting the timezone on Centos / Red Hat Linux.

To set it for the UK, as the **root** user, enter the following:
{% highlight bash %}
ln -sf /usr/share/zoneinfo/Europe/London /etc/localtime
{% endhighlight %}
All of the different timezones can be found in /usr/share/zoneinfo under various subdirectories, e.g. Europe, Africa etc. To set the appropriate timezone just replace the symbolic link at /etc/localtime to point the the relevant timezone file. In the example above the symbolic link, /etc/localtime is updated to point to the London timezone file.
