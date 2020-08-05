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
        'editor_style' => 'cgr-first-gb-editor-style',
        'script'  => 'cgr-script',
        'style'  => 'cgr-style'
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
  $js_deps = array('wp-blocks', 'wp-i18n', 'wp-element');
  $css_deps = array('wp-edit-blocks');
  //
  wp_register_script('cgr-first-gb-editor-script', 
    // link to file 
    plugins_url('dist/editor.bundle.js', __FILE__),
    // dependencies
    $js_deps, 
    // load in footer
    $in_footer
  );
  wp_register_script('cgr-script', 
    plugins_url('dist/script.bundle.js', __FILE__)
  );
  //
  wp_register_style(
    'cgr-first-gb-editor-style', 
    plugins_url('dist/editor.bundle.css', __FILE__), $css_deps
  );
  wp_register_style(
    'cgr-style', 
    plugins_url('dist/style.bundle.css', __FILE__)
  );
  //
  // 
  //
  cgr_first_gb_block_register_block_type('firstblock');
  cgr_first_gb_block_register_block_type('secondblock');

}

add_action('init', 'cgr_first_gb_block_register');