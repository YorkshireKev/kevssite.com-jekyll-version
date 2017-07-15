---
title: Add a GIT remote as https instead of ssh
author: Kev
layout: post
permalink: /add-a-git-remote-as-https-instead-of-ssh/
redirect_from: /2013/11/24/add-a-git-remote-as-https-instead-of-ssh/
dsq_needs_sync:
  - 1
categories:
  - Cloud
  - Linux
tags:
  - Bitbucket
  - Git
---
Using Bitbucket from a network that does not allow ssh (port 22) connections means that doing a git push or pull using the standard git ssh remote won't work.
{% highlight bash %}
git remote add origin https://USERNAME@bitbucket.org/USERNAME/REPOSITORY.git
{% endhighlight %}

Where `USERNAME` is your user/login name and `REPOSITORY` is the name of the repository you want to access.

If you don't want to enter your password every time you connect to the remote you can include the password in the remote url:
{% highlight bash %}
git remote add origin https://USERNAME:PASSWORD@bitbucket.org/USERNAME/REPOSITORY.git
{% endhighlight %}

But note that the remote URL, and thus your password, is shown on screen when you run git push etc.
