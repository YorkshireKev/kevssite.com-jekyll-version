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
Sometimes, when setting up and debugging a container it is extremely useful to be able to &#8216;shell into&#8217; the container to get a closer look at what&#8217;s going on.

This is a quick guide on how to get shell console access into a running Docker container.<!--more-->

First you need to ensure that nsenter is installed on the host server. Nsenter allows us to enter the Linux namespace that a Docker container is running in.

On my Ubuntu server I couldn&#8217;t find nsenter in the package manager (maybe util-linux is too old?) so I built it from source.

[See my other blog post for instructions on compiling nsenter from source.][1]

First, we need to get the process id of the running container. This can be obtained by running docker inspect against the container we want to access. e.g.

    sudo docker inspect mycontainer

    
    "State": {
    "ExitCode": 0,
    "FinishedAt": "0001-01-01T00:00:00Z",
    "Paused": false,
    <strong>"Pid": 4614,</strong>
    "Running": true,
    "StartedAt": "2014-08-04T20:14:30.785206674Z"
    },

Note the Pid field in the State section (4614 in the example above).

    sudo nsenter -m -u -p -n -i -t {PID}

Where {PID} is the process ID taken from the above docker inspect output. e.g.

    sudo nsenter -m -u -p -n -i -t  4614

You should now have a shell inside the container, and be able to stop & start programs, check out the filesystem, permissions and even install extra applications. Just remember that if you kill the program that the docker RUN command started then the container will exit.

When you&#8217;re done snooping around the container, just type exit or Ctrl-d to exit from the container. The container will continue to run and any changes you made within the container will still be in there. Cool or what?

 [1]: http://www.kevssite.com/2014/08/05/install-nsenter-from-source/ "Install nsenter from source"