<?php
if ( ! function_exists( 'mplsagc_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function mplsagc_setup() {
	show_admin_bar(false);
	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on mplsagc, use a find and replace
	 * to change 'mplsagc' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( 'mplsagc', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => esc_html__( 'Primary', 'mplsagc' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	/*
	 * Enable support for Post Formats.
	 * See https://developer.wordpress.org/themes/functionality/post-formats/
	 */
	add_theme_support( 'post-formats', array(
		'aside',
		'image',
		'video',
		'quote',
		'link',
	) );


	// custom menu example @ https://digwp.com/2011/11/html-formatting-custom-menus/
	function clean_custom_menus() {
		$menu_name = 'nav-primary'; // specify custom menu slug
		if (($locations = get_nav_menu_locations()) && isset($locations[$menu_name])) {
			$menu = wp_get_nav_menu_object($locations[$menu_name]);
			$menu_items = wp_get_nav_menu_items($menu->term_id);

			$menu_list = '<nav>' ."\n";
			$menu_list .= "\t\t\t\t". '<ul>' ."\n";
			foreach ((array) $menu_items as $key => $menu_item) {
				$title = $menu_item->title;
				$url = $menu_item->url;
				$menu_list .= "\t\t\t\t\t". '<li><a href="'. $url .'">'. $title .'</a></li>' ."\n";
			}
			$menu_list .= "\t\t\t\t". '</ul>' ."\n";
			$menu_list .= "\t\t\t". '</nav>' ."\n";
		} else {
			// $menu_list = '<!-- no list defined -->';
		}
		echo $menu_list;
	}

}
endif;
add_action( 'after_setup_theme', 'mplsagc_setup' );