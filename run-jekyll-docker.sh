docker run -t -i --rm --name jekyll -e POLLING=true -v "$PWD:/srv/jekyll" -p 4000:4000 jekyll/jekyll:4.2.0 jekyll serve
