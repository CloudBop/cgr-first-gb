<?php
//
// - custom meta
//
function cgr_first_gb_register_meta() {
  register_meta('post', '_cgr_first_gb_post_subtitle', array(
      // important for enabling wp.redux
      'show_in_rest' => true,
      'type' => 'string',
      // ! array like data
      'single' => true,
      //
      'sanitize_callback' => 'sanitize_text_field',
      // 
      'auth_callback' => function() {
          return current_user_can('edit_posts');
      }
  ));     
}

add_action('init', 'cgr_first_gb_register_meta');

function cgr_first_gb_add_meta_box() {
  add_meta_box( 
      'cgr_first_gb_post_options_metabox', 
      'Post Options', 
      'cgr_first_gb_post_options_metabox_html', 
      'post', 
      'normal', 
      'default',
      // hide-metabox from wp-gb-editor. 
      array('__back_compat_meta_box' => true)
  );
}

add_action( 'add_meta_boxes', 'cgr_first_gb_add_meta_box' );

function cgr_first_gb_post_options_metabox_html($post) {
  $subtitle = get_post_meta($post->ID, '_cgr_first_gb_post_subtitle', true);
  wp_nonce_field( 'cgr_first_gb_update_post_metabox', 'cgr_first_gb_update_post_nonce' );
  ?>
  <p>
      <label for="cgr_first_gb_post_subtitle_field"><?php esc_html_e( 'Post Subtitle', 'cgr_first_gb' ); ?></label>
      <br />
      <input class="widefat" type="text" name="cgr_first_gb_post_subtitle_field" id="cgr_first_gb_post_subtitle_field" value="<?php echo esc_attr( $subtitle ); ?>" />
  </p>
  <?php
}

function cgr_first_gb_save_post_metabox($post_id, $post) {
  // security check
  $edit_cap = get_post_type_object( $post->post_type )->cap->edit_post;
  //
  if( !current_user_can( $edit_cap, $post_id )) {
      return;
  }
  // wp-nounce - basically a token back read from client
  if( !isset( $_POST['cgr_first_gb_update_post_nonce']) || !wp_verify_nonce( $_POST['cgr_first_gb_update_post_nonce'], 'cgr_first_gb_update_post_metabox' )) {
      return;
  }
  //
  if(array_key_exists('cgr_first_gb_post_subtitle_field', $_POST)) {
      update_post_meta( 
          $post_id, 
          // underscore prefix important
          '_cgr_first_gb_post_subtitle', 
          sanitize_text_field($_POST['cgr_first_gb_post_subtitle_field'])
      );
  }
}
//
add_action( 'save_post', 'cgr_first_gb_save_post_metabox', 10, 2 );

?>