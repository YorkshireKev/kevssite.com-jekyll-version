---
title: Godot Experiment no. 1, Retrocadia
author: Kev
layout: post
permalink: /retrocadia/
categories:
  - Games
tags:
  - godot
---
![](/images/retrocadia/retrocadia-title.png)

Most of my recent (and not so recent) programming efforts have been in JavaScript that runs in the browser. I believed that with WebGL, the browser would become more relevant in gaming and graphics applications. Fast forward a few years and it's clear that the vast majority of PC games are still downloaded and installed, just as they were decades ago.

I decided to return to creating native games for the PC. It's been almost 20 years since I last wrote a native PC game, so I thought I'd start with something simple to get my eye in.

The first thing I needed to do was figure out what tools I'd use to create the game. Back in the 90s, I used to code in C and C++, using Open GL and Direct X for the graphics and sound. But these days a PC doesn't only mean Windows. Linux and Mac need to be supported too.

Today the vast majority of games are created using a game engine. A game engine takes care of most of the boilerplate code allowing game creators to concentrate on the game's logic rather than worrying about graphics rendering, sound playback routines, and other framework features.

Given my fond memory of C++, I decided to give [Unreal Engine](https://www.unrealengine.com) a closer look. Much to my surprise, I found coding game logic in C++ to be quite time consuming and verbose. It turns out that going back to a fairly low-level language was not as much fun as I thought it was going to be. Another issue I have with unreal is that it's not open source. I don't currently plan to sell the games I write, so the Unreal license would be free of charge for me, but I can't quite get comfortable with using a commercial license. As fantastic as Unreal Engine is, I decided it wasn't the engine for me.

Next up I gave [Godot](https://godotengine.org/) a look. Godot is a full-featured 2D/3D game engine that is open source. The game logic is written in Godot's GD Script, though there is a growing number of languages supported by the GD Native extension. GDscript is quite Pythonesque, so it has a reasonably shallow learning curve. After running through the official tutorial: Dodge the Creeps! I decided to go with Godot for my return to native PC game programming.

## Introducing Godot Experiment no. 1, Retorcadia
>
> Retrocadia has been released for Windows, Mac and Linux.
> 
> **Download it from itch.io: [yorkshirekev.itch.io/retrocadia](https://yorkshirekev.itch.io/retrocadia)**
>

Retrocadia is a simple 2D shoot 'em up. It is very loosely inspired by the ZX Spectrum classic: Arcadia.

![](/images/retrocadia/arcadia.png)<br  />
(Arcadia - ZX Spectrum Screenshot)

I've had a few challenges using the Godot engine. But these were nothing too major and typical of learning something new. An example of this was getting the enemy's path to loop seamlessly. The followpath2d provided by the engine is intended to follow the path from one end to the other. When looped it just jumps back to the starting screen position. I got past this by monitoring for when the sprite was at the end of the path, then adjusting the start position of the path as it looped.

![](/images/retrocadia/retrocadia.png)<br  />
(Retrocadia PC Screenshot)

The game is now almost complete. I've still got to add a few finishing touches such as explosions when the player is hit. It's also only got 4 levels, so I need to add a few more I think!

## Update 02/10/2019
I've added a naff explosion effect when the player gets hit and made the enemy bullets get faster after every level completed (well, up to a limit!).
The game is about as complete as I'm going to make it, apart from adding a few more levels. I'll then need to figure out the best way to release the game. I'll probably put it on itch.io for download.

## Update 06/10/2019
Added one more level and tidied up a few loose ends. I've also added a check that will inform users if there is a newer version of the game available to download. This allows me to release it as beta and let users know when I update it e.g. when I get round to adding more levels as well as fixing any bugs that might come to light.<br />
**Retrocadia v0.1 released for Mac and Linux**. A Windows version will follow when I find a windows PC to build and test it on!<br />
You can download it from itch.io: [https://yorkshirekev.itch.io/retrocadia](https://yorkshirekev.itch.io/retrocadia)

## Update 10/10/2019
The Windows version is now also available for download from itch.io alongside the Mac and Linux versions.<br  />

I have also built a web version so the game can be played in a modern desktop browser. At the time of writing the game worked in the latest versions of Chrome and Firefox, but sadly didn't load in Safari. I'd say the web version should be considered experimental and loading can be a little hit and miss. In chrome on my Mac, for example, loading seemed to hang but then ran just fine when I hit refresh! I guess this sort of thing is to be expected as Web-Assembly and Godot's ability to generate it are both cutting edge experimental features.
[Click here to play Retrocadia in the browser](https://www.kevssite.com/retrocadia-web)