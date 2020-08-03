<?php
/** 
 * Plugin Name: cgr-first-gb
 * Plugin URI: https://colinr.tech/
 * Description: First attempt at GB block development
 * Author: ColinR
 * Author URI: https://colinr.tech/
 */

if( ! defined ('ABSPATH' ) ) {
  exit;
}

function cgr_first_gb_block_register() {
  //
  $in_footer=false;
  $deps = array('wp-blocks', 'wp-i18n');
  //
  wp_register_script('cgr-first-gb-firstblock-editor-script', 
    //
    plugins_url('blocks/firstblock/index.js', __FILE__),
    //
    $deps, 
    //
    $in_footer);
  //
  register_block_type(
    'cgr-first-gb/firstblock',
    array(
      'editor_script' => 'cgr-first-gb-firstblock-editor-script',
      // 'script'  => '',
      // 'style'  => '',
      // 'editor_style'  => ''
    )
  );
}

add_action('init', 'cgr_first_gb_block_register');