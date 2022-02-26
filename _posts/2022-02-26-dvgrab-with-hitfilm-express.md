---
title: Exporting footage with dvgrab to edit with fxhome HitFilm Express
author: Kev
layout: post
permalink: /dvgrab-with-hitfilm-express/
categories:
  - linux
tags:
  - fxhome
  - hitfilm
  - dvgrab
---
While tidying the loft I came across my old JVC Mini DV Camcorder that I purchased in about 2001. I was looking to recycle an old, unused PC that was also in the loft when it occurred to me that the old PC had a firewire card installed. A quick check confirmed that the firewire card would not fit into my regular PC, so hanging on to this old PC for a while longer was my best chance of getting the footage off the old mini dv tapes.

The camcorder does have the ability to playback the tapes via composite output, but firewire is fully digital and thus would give me the best possible quality.

After loading Ubuntu Linus onto the PC, I searched for an application that could pull the footage from the camcorder. I had no luck in finding anything with a nice GUI, so it was left to the good old command line!

It didn't take long for me to stumble across a command line tool called dvgrab. This allowed me to control the camcorder via the Linux command line and, more importantly, to download the raw footage onto the PC.

By default the files are downloaded in raw dv format - excellent I thought - as this would preserve the footage exactly as it was recorded.

So after loading up a tape into the camcorder and connecting it to the PC, I fired up dvgrab in interactive mode using the following command:

{% highlight bash %}
dvgrab -interactive
{% endhighlight %}

If you press shift-? on the keyboard, dvgrab will show the keyboard commands that you can use in interactive mode. So I duly rewound the tape and pressed 'c' to start the capture. It was as simple as that. The tape played and files were written to the PC hard drive as a series of 1GB files.

After the capture had completed I copied the files over to my main (Windows 10) PC and fired up HitFilm Express to do some editing. This is when things started to fall apart.

Although I could play the files in media player and VLC, HitFilm didn't recognise them at all. It did, however, suggest that I install quicktime. But after a bit of searching, it appears that quicktime for Windows has been deprecated for some years.

I did find it odd that HitFilm was unable to import the files, especially as their website states that DV is supported.

Back to Linux and dvgrab...

After a spot of reading the man pages and a bit of experimenting, I found that dvgrab supports a slight variation on the dv format, called dv2. Apparently, this is the same raw data, but dv2 stores the audio and video separately, where the default, dv1, interleaves them.

To make dvgrab output in dv2 format simply requires a command line parameter passing to it on startup, namely - format dv2.

Copying these newly exported files back to Windows and into HitFilme and bingo! it worked like a dream.

While I was at it I added a few more options. These were:
-timestamp, to have the filename include the timestamp of when the recording was made.
-autosplit=600, to split make dvgram split the file whenever the recordings are more than 600 seconds apart. This is in addition to splitting every 1gb.

This was the command line I ended up using with success:
{% highlight bash %}
dvgrab -interactive -format dv2 -autosplit=600 -timestamp filename-
{% endhighlight %}
The last part, filename- is just what dvgrab will write as the prefix for the filename, so you can omit it or change it to something appropriate to your recording e.g. summer-holidays-