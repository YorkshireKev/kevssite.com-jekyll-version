---
title: HAPROXY quick setup
author: Kev
layout: post
permalink: /2012/05/27/haproxy-quick-setup/
syntaxhighlighter_encoded:
  - 1
dsq_needs_sync:
  - 1
categories:
  - Linux
tags:
  - haproxy
  - reverse proxy
  - router
---
I recently set up HA proxy on one of my Debian 6 (squeeze) servers.

There were a few rather annoying &#8216;gotchas&#8217; that took a while to figure out, so I&#8217;m documenting them in case I ever have to set up HAproxy again.  
<!--more-->

  
The basic install was done using `apt-get install haproxy`

This does create all the init scripts needed, but rather annoyingly they won&#8217;t work until you change the config file` /etc/default/haproxy` and change the ENABLED variable to `ENABLED=1`

Next up is logging. Haproxy logs via rsyslog, which needs to be configured.  
First, create a folder to hold the logfiles: `mkdir /var/log/haproxy`  
In the haproxy config, we&#8217;ll tell it to log to local0, add to `/etc/haproxy/haproxy.cfg`:  
`global<br />
log /dev/log local0 info<br />
log /dev/log local0 notice<br />
`  
(see below for a full example of haproxy.cfg)

Next, we will configure rsyslog to catch the logs and write to the log files. Thanks to [debuntu.org][1] for this information.

Create a file `/etc/rsyslog.d/haproxy.conf` and insert the following code into it:  
`if ($programname == 'haproxy' and $syslogseverity-text == 'info') then -/var/log/haproxy/haproxy-info.log<br />
& ~<br />
if ($programname == 'haproxy' and $syslogseverity-text == 'notice') then -/var/log/haproxy/haproxy-notice.log<br />
& ~`

Now we&#8217;ll configure logrotate to keep our logfiles in some kind of order. create a file `/etc/logrotate.d/haproxy` and insert the following code into it:  
`/var/log/haproxy/*.log {<br />
weekly<br />
missingok<br />
rotate 7<br />
compress<br />
delaycompress<br />
notifempty<br />
create 640 root adm<br />
sharedscripts<br />
postrotate<br />
/etc/init.d/haproxy reload > /dev/null<br />
endscript<br />
}`  
This will keep seven weeks of logs.

And finally we can configure the load balancer itself. This is really specific to your requirements, so the official documentation is a good place to start here. However, a very simple example is shown below.

`<br />
# Listen on port 80 and rout all traffic to localhost port 20002 except the usl is /echo/ then route to port 20001`

&nbsp;

`global<br />
log /dev/log local0 info<br />
log /dev/log local0 notice<br />
maxconn 4096<br />
user haproxy<br />
group haproxy<br />
daemon`

`defaults<br />
log global<br />
mode http<br />
option httplog<br />
option dontlognull<br />
retries 3<br />
option redispatch<br />
maxconn 2000<br />
contimeout 5000<br />
clitimeout 50000<br />
srvtimeout 50000`

backend hello  
server hellosvr 127.0.0.1:20002

backend echo  
server echosvr 127.0.0.1:20001

frontend http_in  
bind *:80  
default_backend hello  
acl rec\_echo path\_beg /echo/  
use\_backend echo if rec\_echo

&nbsp;

` errorfile 400 /etc/haproxy/errors/400.http<br />
errorfile 403 /etc/haproxy/errors/403.http<br />
errorfile 408 /etc/haproxy/errors/408.http<br />
errorfile 500 /etc/haproxy/errors/500.http<br />
errorfile 502 /etc/haproxy/errors/502.http<br />
errorfile 503 /etc/haproxy/errors/503.http<br />
errorfile 504 /etc/haproxy/errors/504.http<br />
`

 [1]: http://www.debuntu.org/how-log-haproxy-messages-only-once