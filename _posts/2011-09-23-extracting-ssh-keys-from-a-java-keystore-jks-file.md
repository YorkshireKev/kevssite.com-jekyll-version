---
title: Extracting SSH keys from a Java keystore (jks) file
author: Kev
layout: post
permalink: /extracting-ssh-keys-from-a-java-keystore-jks-file/
redirect_from: /2011/09/23/extracting-ssh-keys-from-a-java-keystore-jks-file/
syntaxhighlighter_encoded:
  - 1
dsq_needs_sync:
  - 1
categories:
  - Linux
tags:
  - java keystore
  - private key
  - public key
  - ssh
  - ssl
---
I needed to extract/generate a public ssh key from a java keystore so that the Java application could SFTP some files using public key authentication.

The problem was that I couldn&#8217;t find any way of converting an ssl public key to an ssh public key. It seems that although ssl and ssh private keys are compatible, the public keys are not.<!--more-->

No problem I thought, I&#8217;ll just generate the ssh key from the private key held within the java keystore (jks file). Hmm, it seems that the keytool utility does not have such ability, nor will it allow you to extract the private key.

Okay, so a quick google search later I discover a couple of freeware tools that can extract the private key from a java keystore. Great! I thought&#8230; until I found that our company wasn&#8217;t too keen on using freeware tools to support a production process&#8230; Bah!

It took me a fair amount of head scratching and experimentation to figure out a method that uses only the keytool utility and ssh-keygen. Both ship with most Linux distros (keytool also ships with Java), so no-one should object to using them, should they?

Anyway, here are the commands I used to generate an ssh public key from a private ssl key held within a java keystore.

Convert keystore from jks to pkcs12 format:  
`keytool -v -importkeystore -srckeystore keystore.jks -srcalias MYKEY -srcstorepass MY_STORE_PASSWORD -srckeypass MY_KEY_PASSWORD -destkeystore keystore.p12 -destalias MYKEY -deststorepass MY_STORE_PASSWORD -destkeypass MY_KEY_PASSWORD -deststoretype PKCS12`

Extract private key from pkcs12 keystore:  
`openssl pkcs12 -in keystore.p12 -out key.pem -passin pass:MY_STORE_PASSWORD -passout pass:MY_STORE_PASSWORD`

Set permissions so ssh-keygen won&#8217;t balk:  
`chmod 600 key.pem`

Extract public key in ssh format:  
`ssh-keygen -P MY_STORE_PASSWORD -y -f key.pem > sshkey.pub`

Check the public key!  
`cat sshkey.pub`