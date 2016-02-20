---
title: Console access into a running Docker container
author: Kev
layout: post
permalink: /2014/08/05/console-access-into-a-running-docker-container/
dsq_needs_sync:
  - 1
categories:
  - Cloud
  - Docker
  - Linux
tags:
  - docker
  - nsenter
---
Sometimes, when setting up and debugging a container it is extremely useful to be able to 'shell into' the container to get a closer look at what's going on.

This is a quick guide on how to get shell console access into a running Docker container.

>UPDATE. If you are running docker version 1.3 or greater then you should use docker exec instead (see docker man pages for more info). The only use case that still requires the use of nsenter is where the user assigned to the container prevents you from doing tasks inside. e.g. where root access is needed but the container is not running as root.

First you need to ensure that nsenter is installed on the host server. Nsenter allows us to enter the Linux namespace that a Docker container is running in.

On my Ubuntu server I couldn't find nsenter in the package manager (maybe util-linux is too old?) so I built it from source.

[See my other blog post for instructions on compiling nsenter from source.][1]

First, we need to get the process id of the running container. This can be obtained by running docker inspect against the container we want to access. e.g.

{% highlight bash %}
sudo docker inspect mycontainer
{% endhighlight %}

{% highlight json %}
    "State": {
    "ExitCode": 0,
    "FinishedAt": "0001-01-01T00:00:00Z",
    "Paused": false,
    "Pid": 4614,
    "Running": true,
    "StartedAt": "2014-08-04T20:14:30.785206674Z"
    }
{% endhighlight %}

Note the Pid field in the State section (4614 in the example above).
{% highlight bash %}
    sudo nsenter -m -u -p -n -i -t {PID}
{% endhighlight %}

Where {PID} is the process ID taken from the above docker inspect output. e.g.
{% highlight bash %}
    sudo nsenter -m -u -p -n -i -t  4614
{% endhighlight %}

You should now have a shell inside the container, and be able to stop & start programs, check out the filesystem, permissions and even install extra applications. Just remember that if you kill the program that the docker RUN command started then the container will exit.

When you're done snooping around the container, just type exit or Ctrl-d to exit from the container. The container will continue to run and any changes you made within the container will still be in there. Cool or what?

 [1]: http://www.kevssite.com/2014/08/05/install-nsenter-from-source/ "Install nsenter from source"

