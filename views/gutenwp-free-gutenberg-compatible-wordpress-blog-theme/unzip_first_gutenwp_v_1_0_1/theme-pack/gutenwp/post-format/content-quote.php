<?php global $themeum_options; ?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
<?php if (!is_single()) { ?>
    <div class="row">

        <?php 
            if ( rwmb_meta( 'themeum_qoute' ) ){
                $col = 'col-sm-7';
            }else {
                $col = 'col-sm-12';
            } 
        ?>

        <div class="col-sm-5">
            <?php  if ( rwmb_meta( 'themeum_qoute' ) ) { ?>
            <div class="featured-wrap">
                <?php if (has_post_thumbnail( $post->ID ) ): ?>
                <?php $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' ); ?>
                <?php endif; ?>
                <div class="entry-qoute" style="background-image: url('<?php echo $image[0]; ?>'); height: 500px">
                    <blockquote>
                        <p><?php echo esc_html(rwmb_meta( 'themeum_qoute' )); ?></p>
                        <small><?php echo esc_html(rwmb_meta( 'themeum_qoute_author' )); ?></small>
                    </blockquote>
                </div>        
            </div>
            <?php } ?>
        </div>

        <div class="content-wrap-section <?php echo $col;?>">
                <div class="entry-headder">
                    <?php if (get_theme_mod('blog_date', true)): ?>
                        <!-- Date Time -->
                        <div class="date">
                            <i class="fa fa-clock-o"></i>
                            <?php $the_date = get_the_date(); ?>
                            <?php echo date_i18n( get_option( 'date_format' ), strtotime($the_date)); ?>
                        </div>   
                    <?php endif ?>
                    
                    <!-- BLog Title -->
                    <h2 class="entry-title blog-entry-title">
                        <a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a>
                    </h2>
                </div>
                
                <!-- Post Content -->
                <?php get_template_part( 'post-format/entry-content' ); ?> 

                <div class="thm-post-meta">
                    <ul>

                        <?php if (get_theme_mod('blog_author', true)): ?>
                            <li class="author-by">
                                <span class="author"> <?php the_author_posts_link() ?></span> 
                            </li>
                        <?php endif ?>
                        
                        <?php if(get_theme_mod('blog_comments', true)) : ?>
                            <li class="comments">
                                <?php comments_number( '0', '1', '%' ); ?>
                            </li>
                        <?php endif; ?>
                        <?php if(get_theme_mod('blog_category', true)) : ?>
                            <li class="cat-list">
                                <?php if(get_the_category_list()) : ?>
                                <?php endif; ?>
                                <?php printf(esc_html__('%s', 'gutenwp'), get_the_category_list(', ')); ?>
                            </li> 
                        <?php endif; ?>      
                        <?php if(get_theme_mod('blog_tag', true)) : ?>
                            <li class="tag-list">
                                <?php if(get_the_tag_list()) : ?>
                                <?php endif; ?>
                                <?php echo get_the_tag_list('',', ',''); ?>
                            </li>
                        <?php endif; ?>
                    </ul>
                </div>

                <?php 
                    if ( get_theme_mod( 'blog_continue_en', true ) ) { 
                        if ( get_theme_mod( 'blog_continue', 'Read More' ) ) {
                            $continue = esc_html( get_theme_mod( 'blog_continue', 'Read More' ) );
                            echo '<p class="wrap-btn-style"><a class="thm-btn" href="'.get_permalink().'">'. $continue .'<i class="fa fa-angle-double-right" aria-hidden="true"></i></a></p>';

                        } 
                    }
                ?>
        </div>
    </div>
<?php } else { ?>
    
    <?php $blog_single_style = get_theme_mod('blog_single_style', 'true'); ?>
        
        <?php if ($blog_single_style == 'blogstyle1') { ?>  
            <?php  if ( rwmb_meta( 'themeum_qoute' ) ) { ?>
                <div class="featured-wrap">
                    <?php if (has_post_thumbnail( $post->ID ) ): ?>
                    <?php $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' ); ?>
                    <?php endif; ?>

                    <div class="entry-qoute" style="background-image: url('<?php echo $image[0]; ?>'); height: 500px">

                        <div class="container">
                            <div class="row">
                                <div class="col-sm-5">
                                    <blockquote>
                                        <p><?php echo esc_html(rwmb_meta( 'themeum_qoute' )); ?></p>
                                        <small><?php echo esc_html(rwmb_meta( 'themeum_qoute_author' )); ?></small>
                                    </blockquote>
                                </div>
                            </div>
                        </div>

                    </div>        
                </div>
            <?php } ?>
            <!-- Sidebar -->
            <?php $sidebar_style = get_theme_mod('sidebar_style', false); ?>
            <?php if ($sidebar_style == 'right_sidebar'){ ?>
                <div class="container">
                    <div class="row">
                        <div id="content" class="site-content col-md-8" role="main">
                            <?php get_template_part( 'post-format/entry-content' ); ?> 
                        </div>
                         <?php get_sidebar(); ?>
                    </div>
                </div>
            <?php }elseif ($sidebar_style == 'left_sidebar') { ?>
                <div class="container">
                    <div class="row">
                         <?php get_sidebar(); ?>
                        <div id="content" class="site-content col-md-8" role="main">
                           <?php get_template_part( 'post-format/entry-content' ); ?> 
                        </div>
                    </div>
                </div>
            <?php }else { ?>
                <div class="container guten-fullwidth">
                    <div class="row">
                        <div id="content" class="site-content col-md-12" role="main">
                           <?php get_template_part( 'post-format/entry-content' ); ?> 
                        </div>
                    </div>
                </div>
            <?php } ?>
        <?php }elseif ($blog_single_style == 'blogstyle2') { ?>
            <div class="single-blog-style2"> 
                <div class="container">
                    <div class="row">
                        <div id="content" class="site-content col-md-12" role="main">
                            <?php get_template_part( 'post-format/entry-content' ); ?> 
                        </div>
                    </div>
                </div>
            </div>
        <?php } ?>





<?php } ?>



    

</article> <!--/#post -->