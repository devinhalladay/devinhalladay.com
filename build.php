<?php

// Use in the "Post-Receive URLs" section of your GitHub repo.

shell_exec( 'cd /var/www/devinhalladay.com/public_html/ && git fetch github master' );
shell_exec( '/usr/local/rvm/gems/ruby-2.1.1/gems/jekyll-1.4.3/bin/jekyll' );

?>