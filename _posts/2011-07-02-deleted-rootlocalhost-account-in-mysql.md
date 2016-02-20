---
title: Deleted root@localhost account in MySQL
author: Kev
layout: post
permalink: /2011/07/02/deleted-rootlocalhost-account-in-mysql/
syntaxhighlighter_encoded:
  - 1
dsq_thread_id:
  - 1763211808
dsq_needs_sync:
  - 1
categories:
  - Linux
tags:
  - mysql
---
Like the fool I am, whilst messing about with user privileges in phpMyAdmin I managed to delete the root account. Suddenly I found myself with no access to any of my databases <img src="http://www.kevssite.com/wp-includes/images/smilies/icon_sad.gif" alt=":(" class="wp-smiley" /> 

It took a while to figure out how to re-create the root@localhost user, so here&#8217;s how I did it.<!--more-->

1.  Shut down mysql server
2.  Start the msql server up with skip-grant-tables option
3.  Log in to mysql
4.  Change to the mysql database
5.  Create the root user
6.  Re-start mysql server

For those that like a cut n paste approach, these are the commands:
```shell
service mysqld stop
mysqld_safe --skip-grant-tables &
mysql
use mysql
create user root@localhost;
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' with grant option;
commit;
FLUSH PRIVILEGES;
exit
service mysqld restart
```

You can confirm that the root account has been created (or is indeed missing!) by listing entries on the user table:  
```shell
use mysql;
select Host,User from user;
```

Good luck!  
Kev.
