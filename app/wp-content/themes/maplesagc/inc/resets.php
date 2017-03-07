<?php
/**
* Hide Wordpress version.
**/
function hide_wpversion() { return ''; }
add_filter('the_generator', 'hide_wpversion');
/**
* Hide Wordpress Admin Bar.
**/
add_filter('show_admin_bar', '__return_false');

/**
* Remove jQuery Migrate.
**/
function remove_jquery_migrate( &$scripts) {
  if(!is_admin())
  {
    $scripts->remove( 'jquery');
  }
}
add_filter( 'wp_default_scripts', 'remove_jquery_migrate' );

/**
* Remove wp-embed.min.js 
**/
function my_deregister_scripts() { wp_deregister_script('wp-embed'); }
add_action('wp_footer', 'my_deregister_scripts');

/**
* Remove HEAD calls: WP Emoji, WLW manifest, RSD, Rest Link.
**/
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'rest_output_link_wp_head');

/**
* Set theme default scripts and styles.
**/
function mplsagc_scripts() {
  wp_enqueue_style( 'app', get_template_directory_uri() . '/assets/css/app.min.css', array(), null);
  wp_enqueue_script( 'app', get_template_directory_uri() . '/assets/js/app.min.js', array(), null, true);

  if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
    wp_enqueue_script( 'comment-reply' );
  }
}

add_action('wp_enqueue_scripts','mplsagc_scripts');
?>