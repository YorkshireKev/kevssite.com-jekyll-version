---
title: Useful Docker Commands
author: YorkshireKev
layout: post
permalink: /2016/12/02/useful-docker-commands/
dsq_needs_sync:
  - 1
---
These are a bunch of docker commands that I find useful for keeping things tidy. 

Remove all orphaned images. _These are the images tagged as \<none\>._
{% highlight bash %}
docker images -q --filter "dangling=true" | xargs docker rmi
{% endhighlight %}

Delete/remove all stopped containers. Note that -v option; it will also delete any persistent volumes that belong to the stopped containers.
{% highlight bash %}
docker ps -aq --filter "status=exited" | xargs docker rm -v && docker ps -aq --filter "status=created" | xargs docker rm -v
{% endhighlight %}