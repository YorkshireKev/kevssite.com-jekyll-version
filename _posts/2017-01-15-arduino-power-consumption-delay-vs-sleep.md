---
title: Arduino power consumption - Delay vs Sleep
description: Arduino Power consumption measurements between Delay and Sleep
author: YorkshireKev
layout: post
permalink: /arduino-power-consumption-delay-vs-sleep/
redirect_from: /2017/01/15/arduino-power-consumption-delay-vs-sleep/
dsq_needs_sync:
  - 1
---
I recently built a remote temperature sender based around an Arduino Nano. The coding is simple enough; read the temperature from the attached sensor, transmit the value over a 433mhz transmitter pause for a bit and repeat.

My first cut of code used the standard delay() command to pause before looping back for another reading.
{% highlight c %}
delay(8000); //Sleep(ish) until next temprature reading is required.
{% endhighlight %}

Hooking up my multimeter I recorded the current draw at about 37-38 milliamps from 3xAA batteries - 4.5 volts. The current draw increased slightly to around 45 milliamps when the Arduino was transmitting the data.

![delay](/images/arduino-delay-vs-sleep/power-with-delay.jpg "Current draw using delay() at 4.5v")

The Arduino's microprocessor, an Atmel Atmega chip, can be put into a sleep mode where its internal watchdog timer will trigger after a defined period of time and wake the chip up.

Programming the watchdog timer and switching off all of the peripheral components of the Atmega chip can be quite complicated. Fortunately there are a few libraries that make the task super simple. The one I chose to use is called low-power by rocketscream. [https://github.com/rocketscream/Low-Power](https://github.com/rocketscream/Low-Power)

Using this library the code changes are minimal.
Just include the library and replace delay command with a single low-power command.
{% highlight c %}
include <LowPower.h>
LowPower.idle(SLEEP_8S, ADC_OFF, TIMER2_OFF, TIMER1_OFF, TIMER0_OFF,
                SPI_OFF, USART0_OFF, TWI_OFF);
{% endhighlight %}

With this simple change, the current draw dropped significantly - to around 21 milliamps except for when the data was actually being transmitted.

![sleep](/images/arduino-delay-vs-sleep/power-with-sleep.jpg "Current draw using sleep at 4.5v")

While the power savings are impressive, there are a few downsides to putting the Arduino to sleep during pauses. If your application relies on background interrupts, such as listening for data on an rf receive module, then your code will most likely miss the transmission. So in my case, using sleep between transmissions is a good use-case for sleep, but the temperature receiver is not.

One other minor annoyance is that the Atmega can only sleep for a maximum of 8 seconds when using the watchdog timer. If you need to pause for longer than that then you'll have to use a loop.

{% highlight c %}
//Loop for 6 times (48 seconds between temprature transissions)
  for (int i = 0; i < 6; i++) {
    LowPower.idle(SLEEP_8S, ADC_OFF, TIMER2_OFF, TIMER1_OFF, TIMER0_OFF,
                  SPI_OFF, USART0_OFF, TWI_OFF);
  }
{% endhighlight %}

----------

### A note for Atmega168 users ###
At the time of writing the low-power library does not compile with the older Atmega168 based Arduinos. A fix should hopefully get pulled into the next release but in the meantime I have made a patched fork of the code available on my [GitHub](https://github.com/YorkshireKev/Low-Power)  . Although the 168 is now considered obsolete I do find the ridiculously cheap Chinese clones to be far to tempting to ignore!