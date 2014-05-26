<?php

// Use in the "Post-Receive URLs" section of your GitHub repo.

shell_exec( 'cd /var/www/devinhalladay.com/public_html/ && git pull github master' );
shell_exec( 'jekyll build' );

?>