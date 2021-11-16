$(document).ready(function() {
  $('.pop-box svg').click(function() {
    $('.pop-box').removeClass('hovpop');
    $('.pop-box').stop().animate({
      height: 0,
      opacity: 0,
      bottom: '+=300'
    }, 300);
    $('.newsletter-box').stop().animate({
      bottom: '+=55vh',
      right:'1rem',
    },350).show();
    $('.newsletter-box').css('display', 'flex');
  });


  $('.right-nw svg').click(function() {
      $('.pop-box').stop().animate({
        height: '4rem',
        opacity: 1,
        bottom: '1.5rem'
      }, 500);
      setTimeout(function(){
        $('.newsletter-box').css('display', 'none');
      },320);

      $('.newsletter-box').stop().animate({
        bottom: "-50vh",
        right: '10rem',
      },400);
      setTimeout( function(){
        $('newsletter-box').hide()
      }, 500);
      setTimeout(function(){
        $('.pop-box').addClass('hovpop')
      }, 600);
  });


  $('.right-arrow').click(function() {
    $('.nav').stop().animate({
      left: '-1px'
    },450);
    $('.pullout').stop().animate({
      width: '60px'
    },700);
    $('.nav-item').stop().animate({
      marginTop: '20px',
      marginBottom: '20px'
    },400);
    $('.gohome svg').stop().animate({
      width: 0
    },250);
    if ($(window).width() < 640){
      $('body').css('overflow-y', 'hidden')
      $('body').css('overflow-x', 'hidden')
    }
  });

  $('.pullout').click(function() {
    $('.nav').stop().animate({
      left: '-100vw'
    },500)
    $('.pullout').stop().animate({
      width: '0'
    },700)
    $('.nav-item').stop().animate({
      marginTop: '0',
      marginBottom: '0'
    },200)
    $('.gohome svg').stop().animate({
      width: '75px'
    },300);
    if ($(window).width() < 640){
      $('body').css('overflow-y', 'auto')
      $('body').css('overflow-x', 'hidden')
    }
  });

  $('li img').click(function(){
    if ($(window).width() < 640){
      $('ul').css('padding-top', '20vh')
    }

    $('li').stop().animate({
      height: '20vh'
    },420)
    linkVar = event.path[0].currentSrc;

    $('.shop-card').stop().animate({
      opacity: '100%',
      height: '70vh'
    },200)

    window.scrollTo({top: 70, behavior: 'smooth'});

    $('.fullscreen').stop().animate({
      height: '100%',
      opacity: '100%'
    },200)

    $('.fullscreen img').stop().animate({
      height: '100%',
      opacity: '100%'
    },300)
    $('.fullscreen').css('display', 'flex');
    $('.fullscreen img').attr('src', linkVar);

    let liTitle = $(this).next();
    $('.shop-card h2').text(liTitle.text());


    $('.shop-item-size').text($(this).nextAll().eq(1).text());
    $('.shop-item-description').text($(this).nextAll().eq(2).text());

    $('.shop-item-info a').attr('href', $(this).nextAll().eq(3).text())
  })

  $('.cross-port').click(function(){
    if ($(window).width() < 640){
      $('ul').css('padding-top', '10vh')
    }

    $('li').stop().animate({
      height: '40vh'
    },350)
    $('.fullscreen').animate({
      height: 0,
      opacity: '0%'
    },300);
    $('.fullscreen img').animate({
      height: 0,
      opacity: '0%'
    },210)
    setTimeout(function(){
      $('.fullscreen').css('display', 'none');
      $('li').stop().animate({
        height: '40vh'
      },350);
    },500);
  })


  $('.cross-shop').click(function(){
    $('.shop-card').animate({
      height: 0,
      opacity: '0%'
    },300);
    setTimeout(function(){
      $('.fullscreen').css('display', 'none');
      $('li').stop().animate({
        height: '40vh'
      },350);
    },250);
  })

  $(window).resize(function(){
    if ($(window).width() > 640){
      $(window).scrollTop(0,0);
    }
  })

  let checkNavMob = false;

  $('.undler').click(function(){
    $(window).scrollTop(0,0);
    if (checkNavMob === false){
      checkNavMob = true;
      $('.undler svg').addClass('animatedBurger');
      $('.cross-navmob').removeClass('animatedBurger');
      $('body').css('overflow', 'hidden');
      $('.nav-items-mob .nav-item').stop().animate({
        marginTop: '4rem'
      },200);
      $('.nav-items-mob .active').stop().animate({
        marginTop: '4rem'
      },200);
      $('.nav-items-mob .active h4').stop().animate({
        fontSize: '3rem'
      },200);
      $('.nav-items-mob .nav-item h4').stop().animate({
        fontSize: '3rem'
      },200);
      $('.nav-items-mob').css('display', 'flex');
      $('.nav-items-mob').css('flex-direction', 'column');
      $('.nav-items-mob').css('justify-content', 'center');
      $('.nav-items-mob').stop().animate({
        height: '100vh'
      },350);
    } else {
      checkNavMob = false;
      $('.undler svg').removeClass('animatedBurger');
      $('.cross-navmob').addClass('animatedBurger');
      $('body').css('overflow', 'auto');
      $('.nav-items-mob .active h4').stop().animate({
        fontSize: '0'
      },250);
      $('.nav-items-mob .nav-item h4').stop().animate({
        fontSize: '0'
      },250);
      setTimeout(function(){
        $('.nav-items-mob').css('display', 'none');
        $('.nav-items-mob').css('flex-direction', 'row');
        $('.nav-items-mob').css('justify-content', 'center');
      },250)
      $('.nav-items-mob .nav-item').stop().animate({
        marginTop: 0
      },20);
      $('.nav-items-mob .active').stop().animate({
        marginTop: 0
      },20);
      $('.nav-items-mob').stop().animate({
        height: '10vh'
      },250)
    }
  })














});
