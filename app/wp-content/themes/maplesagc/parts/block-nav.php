<section class="block-nav">
	<div class="container">
		<div class="col-lg-12">
			<?php wp_nav_menu( array( 
				'theme_location' => 'primary',
				'container' => 'ul',
				'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>',
				'menu' => 'primary-menu',
				'menu_class' => 'nav nav-pills'
				) ); ?>
		</div>
	</div>
</section>

