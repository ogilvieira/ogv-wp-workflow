<?php
/**
 * Enqueue scripts and styles.
 *
 * @package mplsagc
 */

add_filter( 'wp_default_scripts', 'remove_jquery_migrate' );


function mplsagc_scripts() {
  /**
   * Get assets list.
   */
  wp_enqueue_style( 'app', get_template_directory_uri() . '/assets/css/app.min.css', array(), '20151215');
  wp_enqueue_script( 'app', get_template_directory_uri() . '/assets/js/app.min.js', array(), '20151215', true);

  //get comment script
  if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
    wp_enqueue_script( 'comment-reply' );
  }
}

add_action('wp_enqueue_scripts','mplsagc_scripts');
