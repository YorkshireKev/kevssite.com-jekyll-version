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

Most of my recent (and not so recent) programming efforts have been in JavaScript that runs in the browser. I believed that with WebGL, the browser would become more relevant in gaming and graphics applications. Fast forward a few years and it's clear that the vast majority of PC games are still downloaded and installed, just as they were decades ago.

I decided to return to creating native games for the PC. It's been almost 20 years since I last wrote a native PC game, so I thought I'd start with something simple to get my eye in.

The first thing I needed to do was figure out what tools I'd use to create the game. Back in the 90s, I used to code in C and C++, using Open GL and Direct X for the graphics and sound. But these days a PC dosen't only mean Windows. Linux and Mac need to be supported too.

Today the vast majority of games are created using a game engine. A game engine takes care of most of the boilerplate code allowing game creators to concentrate on the game's logic rather than worrying about graphics rendering, sound playback routines, and other framework features.

Given my fond memory of C++, I decided to give [Unreal Engine](https://www.unrealengine.com) a closer look. Much to my surprise, I found coding game logic in C++ to be quite time consuming and verbose. It turns out that going back to a fairly low-level language was not as much fun as I thought it was going to be. Another issue I have with unreal is that it's not open source. I don't currently plan to sell the games I write, so the Unreal license would be free of charge for me, but I can't quite get comfortable with using a commercial license. As fantastic as Unreal Engine is, I decided it wasn't the engine for me.

Next up I gave [Godot](https://godotengine.org/) a look. Godot is a full-featured 2D/3D game engine that is open source. The game logic is written in Godot's GD Script, though there is a growing number of languages supported by the GD Native extension. GDscript is a quite python-esq, so it has a reasonably shallow learning curve. After running through the official tutorial: Dodge the Creeps! I decided to go with Godot for my return to native PC game programming.

## Introducing Godot Experiment no. 1, Retorcadia

Retrocadia is a simple 2D shoot 'em up. It is very loosely inspired by the ZX Spectrum classic: Arcadia.

![](/images/arcadia.png)<br />
(Arcadia - ZX Spectrum screenshot)

I've had a few challenges using the Godot engine. But these were nothing too major and typical of learning something new. An example of this was getting the enemy's path to loop seamlessly. The followpath2d provided by the engine is intended to follow the path from one end to the other. When looped it just jumps back to the starting screen position. I got past this by monitoring for when the sprite was at the end of the path, then adjusting the start position of the path as it looped.

![](/images/retrocadia.png)<br />
(Retrocadia screenshot)

The game is now almost complete. I've still got to add a few finishing touches such as explosions when the player is hit. It's also only got 4 levels, so I need to add a few more I think!
