---
title: Connect to PostgreSQL using an SSH tunnel
author: Kev
layout: post
permalink: /2014/01/04/connect-to-postgresql-using-an-ssh-tunnel/
dsq_needs_sync:
  - 1
categories:
  - Linux
tags:
  - postgres
  - postgresql
  - ssh tunnel
---
Using an SSH tunnel is a great way to administer remote services without having to directly expose them to the internet. You basically forward a port from your local machine (e.g. your Linux desktop) to a port on the remote server. You can then connect to the port on localhost and the magic of ssh will forward the port securely to the remote machine. To the remote server you've connected locally on localhost!

I wanted to run pgAdminIII on my local machine and connect to my remote Postgres server, so I decided that using an ssh tunnel would be safer alternative than allowing postgres connections through my server firewall. To set up a simple tunnel you can run something like the following on your client (e.g. desktop) PC:
```shell
ssh -L 2222:localhost:5432 user@server-ip
```

The above will bind to port 2222 locally, and appear as port 5432 on the remote server. The localhost bit between the two port numbers is how the connection will appear on the remote server. The last bit, user@server-ip, is the regular user connection used to ssh to the server. This is the local Linux user that will make the connection locally on the remote server.

Once the above tunnel is set up you would connect to localhost on port 2222. On the remote server the user will connect to port 5432, the default postgres listening port.

For many setups the above tunnel is enough to allow you to work remotely, and securely. But for some you will need to ensure that PostgreSQL is configured to allow local network connections and that it will authenticate users as specified on the connection.

For example, if I connect as user fred, but the database user/role I need to use is called bob, then I need to specify user bob on the database login. By default Postgres won't allow this, and expects the Linux user bob, not fred, to connect.

To fix this we can add a couple of lines to the postgres config file: pg_hba.conf

This can be a tricky file to find, on my Centos 6 server it is located in the directory `/var/lib/pgsql/9.3/data` (note you will need to change 9.3 to the version you are running).

So, open pg_hba.conf and then add the following lines:
```shell
host         all       all   localhost  md5
local        all       all              md5
```

What the two lines above do is allow any user to connect to any database on localhost, or via a local socket connection using password authentication.

For the above config changes to take effect we need to restart postgres.
```shell
service postgresql-9.3 restart
```

Now we can test our connection. First we can test that we have a working user on the remote server by running the following command using directly on the ***remote*** server. Note you should run this command using any user *except* the user postgres (the Linux user postgres should be able to connect even without the above changes).
```shell
psql -h localhost -p 5432 -U postgres
```

If that worked, then we can test via the SSH tunnel. On the client machine (the one you made the ssh tunnel from), open a new terminal and run the following command:
```shell
psql -h localhost -p 2222 -U postgres
```

Remember, port 2222 is the local port we defined that will pop out on the remote server as port 5432.

Now any time you want to connect to your remote postgres server, simply start an ssh tunnel, and connect locally using port 2222. So for my use of pgAdminIII I simply enter localhost and port 2222 on the admin panel!
