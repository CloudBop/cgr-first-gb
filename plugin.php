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
//
include_once('src/metabox.php');
//
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
//
//
function cgr_first_gb_enqeue_block_assets() {
  wp_enqueue_script(
    'cgr-first-gb-editor-assets-js', 
    plugins_url('dist/editor_script.bundle.js', __FILE__), 
    array('wp-data')
  );
}
add_action('enqueue_block_editor_assets', 'cgr_first_gb_enqeue_block_assets');
//
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
  $js_deps = array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-components', 'lodash', 'wp-blob', 'wp-data', 'wp-html-entities', 'wp-compose');
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
  //
  cgr_first_gb_block_register_block_type('latest-posts', array(
    'render_callback' => 'cgr_first_gb_render_latest_posts_block',
    'attributes'=>  array(
      'numberOfPosts' => array(
        'type' => 'number',
        'default'=>5
      ),
      'postCategories' => array(
        'type' => 'string'
      )
    )
  ));
  // no frontend, demo of redux block type
  cgr_first_gb_block_register_block_type('redux-block');
  cgr_first_gb_block_register_block_type('todo-list');
  cgr_first_gb_block_register_block_type('todo-list-info');
  cgr_first_gb_block_register_block_type('meta');
  
}

add_action('init', 'cgr_first_gb_block_register');

function cgr_first_gb_render_latest_posts_block($attributes) {
  //
  $args = array(
    'posts_per_page' => $attributes['numberOfPosts']
  );
  // filter these categories
  if($attributes['postCategories']) {
    $args['cat'] = $attributes['postCategories'];
  }

  $query = new WP_Query($args);
  $posts = '';

  if($query->have_posts()) {
    // auto-generated wordpress theme
    $posts .= '<ul class="wp-block-cgr-first-gb-latest-posts">';

    while($query->have_posts() ) {
      $query->the_post();
      //
      $posts.= '<li> <a href="'. esc_url(get_the_permalink()) . '">' . get_the_title() . '</a></li>';
    }
    //
    $posts .= '</ul>';
    // after custom loop always reset post data
    wp_reset_postdata();
    return $posts;
  } else {
    return '<div>' . __('No Posts Found','cgr-first-gb') . "</div>";
  }
}

// really handy for creating custom post type interfaces
function cgr_first_gb_register_post_template() {
  // 
  $post_type_object = get_post_type_object('post');
  // register meta to post-type or CPT
  $post_type_object->template = array(
    // - post meta data block
    array('cgr-first-gb/meta'),
    // - p block
    array('core/paragraph', $attributes = array(
      'content' => 'subueybdhjkh'
    )),
    // nested block
    array(
      'cgr-first-gb/team-members',
      $attributes = array(
        'columns' => 2
      ),
      $nested=array(
        array('cgr-first-gb/team-member', $attributes = array(
          'title' => 'Text'
        )),
        array('cgr-first-gb/team-member', $attributes = array(
          'title' => 'Text'
        ),),
      )
    )
  );
  // allow re-organisation
  // $post_type_object->template_lock = 'inset';
  // stop everything
  // $post_type_object->template_lock = 'all';
}



// attaches block to gb in post type
add_action('init', 'cgr_first_gb_register_post_template');