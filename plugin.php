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

function cgr_first_gb_custom_categories( $categories, $post) {
  return array_merge(
    $categories,
    array(
      array(
        'slug'=>'cgr-category',
        'title'=> __('CGR-Category', 'cgr-first-gb'),
        'icon'=> 'wordpress'
      )
    )
  );
};

add_filter('block_categories', 'cgr_first_gb_custom_categories', $priority=10, $accepted_args=2);

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
  $js_deps = array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-components', 'lodash', 'wp-blob');
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
    plugins_url('dist/script.bundle.js', __FILE__),
    // include file after jquery
    array('jquery')
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
  cgr_first_gb_block_register_block_type('thirdblock');

  // nested blocks
  cgr_first_gb_block_register_block_type('team-member');
  cgr_first_gb_block_register_block_type('team-members');

}

add_action('init', 'cgr_first_gb_block_register');