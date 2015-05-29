---
title: JavaScript KeyCodes
author: Kev
layout: post
permalink: /2015/05/29/javascript-keycodes/
dsq_needs_sync:
  - 1
---
This is a simple JavaScript keycode lookup page. Just press a key and the JavaScript Key Code will be displayed in the box below.

If you want to stop your browser scrolling when you press space or arrows etc then click in this input field to take the focus away from the whole page. <input type="text" maxlength="0" size="2">

<script>
  window.addEventListener("keydown", function (event) {
    document.getElementById("code").innerHTML = event.keyCode;
    if (event.key) {
      if (event.keyCode > 47 && event.keyCode < 91) {
        document.getElementById("char").innerHTML = " - " + String.toUpperCase(event.key);
      } else {
        document.getElementById("char").innerHTML = " - " + event.key;
      }
    }
  }, false);
</script>
<span id="code" style="background-color: #faee95; font-size: 100;  border-style: solid; border-width: 5px; border-color: #848789"></span>
<span id="char" style="font-size: 70;"></span>

The text equivalent of the key being pressed is only displayed in browsers that support event.key. Rather surprisingly this does not include Chrome!