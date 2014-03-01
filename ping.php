<?php

/* ------------------------------------------------------------
   ping.php
   ============================================================

   Simple feed ping notifier for static sites (i.e.  Jekyll)
   Currently supports Ping-O-Matic and PubSubHubbub.

   ** See README.md for instructions. **

   @author: hamstu@gmail.com
   @url: hami.sh

 * ==========================================================*/

$config = array(
    'site_title' => 'Devin Halladay',
    'site_url'   => 'http://devinhalladay.com/',
    'feed_url'   => 'http://devinhalladay.com/feed.xml',

    /* PubSubHubbub
     * If you're not sure, just use this one (it's run by Google) */
    'hub_endpoint' => 'http://pubsubhubbub.appspot.com/publish'
);

/**
 * pingOMatic()
 *
 * Send a ping to Ping-O-Matic (http://pingomatic.com/)
 * We do this by loading the URL that their form generates,
 * which is a lot easier than trying to formulate a proper
 * XML-RPC request.
 *
 * NOTE: This pings ALL the default services.
 * See: http://stackoverflow.com/questions/2209463/how-to-ping-automatically-to-pingomatic-in-php
 *
 * @return bool: `true` if succesful, otherwise `false`. (If
 * it's false, it's probably because you're rate limited.)
 *
 */
function pingOMatic() {
    global $config;

    $data = array(
        'title'     => $config['site_title'],
        'blogurl'   => $config['site_url'],
        'rssurl'    => $config['$feed_url'],

        'chk_weblogscom'    => 'on',
        'chk_blogs'         => 'on',
        'chk_feedburner'    => 'on',
        'chk_newsgator'     => 'on',
        'chk_myyahoo'       => 'on',
        'chk_pubsubcom'     => 'on',
        'chk_newsisfree'    => 'on',
        'chk_topicexchange' => 'on',
        'chk_google'        => 'on',
        'chk_tailrank'      => 'on',
        'chk_skygrid'       => 'on',
        'chk_collecta'      => 'on',
        'chk_superfeedr'    => 'on',
    );

    // Init URL/cURL
    $query_string = http_build_query($data);
    $ping_url = "http://pingomatic.com/ping/?" . $query_string;
    $curl = curl_init($ping_url);

    // Spoof User Agent
    curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.2.12) Gecko/20101026 Firefox/3.6.12');

    // Other Options
    curl_setopt($curl, CURLOPT_FAILONERROR, true);
    curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

    // Execute
    $result = curl_exec($curl);

    if ($result) {
        preg_match("/Pinging complete/", $result, $success);
        if ($success) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

/**
 * pubSubHubbub()
 *
 * Sends an update to a PubSubHubbub hub.
 * For more information see
 *  a) https://code.google.com/p/pubsubhubbub/
 *  b) http://pubsubhubbub.appspot.com/
 *
 * @return bool: The result of the cURL call.; `true` if
 * succesful, otherwise `false`.
 */
function pubSubHubbub() {
    global $config;

    $data = array(
        'hub.mode' => "publish",
        'hub.url' => $config['feed_url']
    );

    $fields_string = http_build_query($data);

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $config['hub_endpoint']);
    curl_setopt($ch, CURLOPT_POST, count($data));
    curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
    curl_setopt($ch, CURLOPT_FAILONERROR, true);

    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
}

/* ENTRY POINT */

if (pingOMatic()) {
    echo "<p>Pinged ping-o-matic! Yay!</p>";
} else {
    echo "<p>Ping-O-Matic failed. You've probably pinged already (rate limiting.)";
}

if (pubSubHubbub()) {
  echo "<p>Pinged {$config['hub_endpoint']} &mdash; Woot!</p>";
} else {
    echo "<p><b>Error:</b> Could not ping {$config['hub_endpoint']}</p>";
}