docker run --rm --name jekyll -e POLLING=true -v "$PWD:/srv/jekyll" -p 4000:4000 jekyll/jekyll:pages 
