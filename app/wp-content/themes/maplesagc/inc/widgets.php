<?php

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function mplsagc_widgets_init() {
  register_sidebar( array(
    'name'          => esc_html__( 'Sidebar', 'mplsagc' ),
    'id'            => 'sidebar-1',
    'description'   => '',
    'before_widget' => '<section id="%1$s" class="widget panel panel-default %2$s">',
    'after_widget'  => '</section>',
    'before_title'  => '<div class="panel-heading"><h2 class="widget-title panel-title">',
    'after_title'   => '</h2></div>',
  ) );
}
add_action( 'widgets_init', 'mplsagc_widgets_init' );

function widget_content_wrap($content) {
    $content = '<div class="panel-body">'.$content.'</div>';
    return $content;
}
add_filter('widget_text', 'widget_content_wrap');

?>