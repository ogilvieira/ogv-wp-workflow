<?php
if ( ! function_exists( 'mplsagc_setup' ) ) :
function mplsagc_setup() {

	load_theme_textdomain( 'mplsagc', get_template_directory() . '/languages' );
	add_theme_support( 'title-tag' );

	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => esc_html__( 'Primary', 'mplsagc' ),
	) );

	/*
	 * Enable support for Post Formats.
	 */
	add_theme_support( 'post-formats', array(
		'video',
		'gallery',
	));
}
endif;
add_action( 'after_setup_theme', 'mplsagc_setup' );