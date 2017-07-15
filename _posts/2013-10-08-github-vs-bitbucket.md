---
title: Github vs Bitbucket
author: Kev
layout: post
permalink: /github-vs-bitbucket/
redirect_from: /2013/10/08/github-vs-bitbucket/
dsq_needs_sync:
  - 1
dsq_thread_id:
  - 1837250956
categories:
  - Linux
  - Programming
  - Viewpoint
tags:
  - Bitbucket
  - Git
  - Github
  - source code
  - Subversion
---
By far the most popular source control system in use today is <a title="git-scm website" href="http://git-scm.com/" target="_blank">Git</a>. It was only about 6 months ago I made the switch from subversion for my personal code projects, and the only regret I have is that I didn&#8217;t do it earlier!

I&#8217;m lucky enough to experience code management at both ends of the spectrum. In my spare time I tinker with personal projects (some public but mostly private stuff). At work &#8216;enterprise&#8217; would definitely be an appropriate description of our source code management.

With the advent of cloud computing, source control can no longer be kept neatly behind corporate firewalls.Of course you could stick a Subversion server or Git repository in your DMZ, but really, the correct answer is hosting.![][1]

There are many source-code hosting providers to choose from, but in this post I&#8217;m going to look at the two most popular Git hosting solutions: <a title="githubs website" href="http://github.com/" target="_blank">Github</a> and <a title="bitbucket website" href="http://bitbucket.org" target="_blank">Bitbucket</a>.<!--more-->

Both Github and Bitbucket offer public and private repositories, wiki and issue tracking. So which one is best? Well, like most things in IT (and in life too I guess), it depends&#8230;

Even though both offer very similar same feature sets the main deciding factor will be based on whether you&#8217;re looking for public or private repository hosting.

Github is by far the most popular of the two with around 4 million users compared to Bitbucket with 1 million. Github currently has a much stronger community than Bitbucket, and that community is all about collaborative coding and open source projects. The Github slogan sums it up quite nicely: social coding.

Both Bitbucket and Github offer unlimited public repositories for free, but if you need a home for your open source project code, you really should look no further than Github. That&#8217;s where everyone else hosts their open source code, and so should you.

So while public repositories are free, it&#8217;s the different pricing models for private repositories that separate the two, especially when choosing for enterprise hosting.

Basically the difference is this; Github allows unlimited users, but charge for the number of private repositories you have. Bitbucket allows for unlimited private repositories, but charge for the number of users you have.

If you only have a few private repositories then the cost would be pretty similar, although it&#8217;s worth noting that the first 5 Bitbucket users are free. So if you&#8217;re a small team or fly solo then a free Bitbucket account with unlimited private repositories is a no brainer!

It seems to me that Bitbucket was designed with a bias towards business and enterprise users rather than open source developers. It can integrate with other Altassian products, specifically Jira and Confluence, Altassian&#8217;s excellent enterprise issue tracking and collaboration software. But even without these add-ons Bitbucket just feels somehow more professional than Github.

Some PAS (Platform as a Service) solutions  such as Heroku currently integrate better with Github, but I think this will change as enterprises continue to adopt and turn to the cloud. It isn&#8217;t difficult to use Bitbucket with Heroku, it&#8217;s just Git after all, but you can link your github account to Heroku which can simplify things a bit.

In the end your choice will likely come down to cost. If you need private repositories then you&#8217;ll need to work out the cost of each platform based on the number of private repositories you&#8217;ll need and the number of developers/users that will need access.

Personally I have found that the number of private repositories we need continues to rise, but the number of developers/users less so. This makes Bitbucket a more cost effective option in our case. I realise that this is more of a preference, but I do prefer the more business-like feel of Bitbucket when it comes to hosting private projects.

## TL;DR

Both Github and Bitbucket are excellent Git repository hosting solutions, and really the best choice is to use them both. For Open Source I use Github every time. When I need private repositories Bitbucket is my tool of choice.

Sometimes however, I still use Github for private repositories, but this is mainly when a PAS integrates better with GitHub than with Bitbucket (This is getting much less frequent as the popularity of Bitbucket grows).

One thing is clear though. If you&#8217;re not using Git for source and version control then I urge you to seriously consider switching. As PAS (Platform as a Service) becomes ever more pervasive, Git is becoming a pre-requisite for code deployment to the Cloud. And besides, once you switch you might just discover *why* Git is the most popular version control system on the planet.

 [1]: http://www.kevssite.com/wp-includes/js/tinymce/plugins/wordpress/img/trans.gif "More..."