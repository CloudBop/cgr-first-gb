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

function cgr_first_gb_block_register_block_type($block, $options=array() ){
  //
  register_block_type(
    'cgr-first-gb/'.$block,  
    array_merge(
      array(
        // notice: won't enqueue duplicate scripts if called more than once - all blocks will use same editor
        'editor_script' => 'cgr-first-gb-editor-script',
      ),
      // 'script'  => '',
      // 'style'  => '',
      // 'editor_style'  => ''
      $options
    )
  );
}

function cgr_first_gb_block_register() {
  //
  $in_footer=false;
  $deps = array('wp-blocks', 'wp-i18n', 'wp-element');
  //
  wp_register_script('cgr-first-gb-editor-script', 
    // link to file 
    plugins_url('dist/editor.bundle.js', __FILE__),
    // dependencies
    $deps, 
    // load in footer
    $in_footer);
  //
  // 
  //
  cgr_first_gb_block_register_block_type('firstblock');
  cgr_first_gb_block_register_block_type('secondblock');

}

add_action('init', 'cgr_first_gb_block_register');