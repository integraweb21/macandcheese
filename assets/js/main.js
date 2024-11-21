$(document).ready(function(){

    // Menu
    var body = $('body');
    var header = $('header');
    var headerPage = $('header.page .top');
    var iconMenu = $('.icon-menu');
    var menu = $('.menu');
    var logoHeader = $('header.home .logo');
    var logoBanner = $('.logo-center');

    logoHeader.hide();
    logoBanner.show();

    iconMenu.click(function(event) {
        event.preventDefault();

        menu.slideToggle();

        if (logoHeader.is(':visible')) {
            logoHeader.fadeOut(function() {
                logoBanner.fadeIn();
            });
        } else {
            logoBanner.fadeOut(function() {
                logoHeader.fadeIn();
            });
        }

        iconMenu.toggleClass('active');

        if (header.hasClass('page') & iconMenu.hasClass('active')) {
            header.css({
                position: 'fixed',
                top: '0',
                width: '100%',
                height: '100%'
            });
        } else {
            header.css({
                position: '',
                top: '',
                width: '',
                height: ''
            });
        }

        return false;
    });

    // Scroll Home

    let scrollEventCount = 0;
    const scrollThreshold1 = 10;
    const scrollThreshold2 = 20;

    function enableScroll() {
        $('body.home-page').css('overflow', 'visible');
    }

    function handleScrollEvent() {
        scrollEventCount++;
        if (scrollEventCount >= scrollThreshold1) {
            header.addClass('scrolled');
        }
        if (scrollEventCount >= scrollThreshold2) {
            enableScroll();
            $(window).off('scroll mousewheel DOMMouseScroll touchstart', handleScrollEvent);
        }

    }

    function resetScrollState() {
        scrollEventCount = 0;
        $('body').css('overflow', 'hidden');
        header.removeClass('scrolled');
        $(window).on('scroll mousewheel DOMMouseScroll touchstart', function(e){
            if(e.originalEvent.deltaY > 0){
                handleScrollEvent();
            }
        });
    }

    $(window).on('scroll mousewheel DOMMouseScroll touchstart', function(e){
        if(e.originalEvent.deltaY > 0){
            handleScrollEvent();
        }
        
    });

    $(window).on('scroll', function() {
        if ($(window).scrollTop() === 0) {
            resetScrollState();
        }
    });

    // Menu Fix

    headerPage.addClass("p-relative");

    $(window).on('scroll', function () {
        if ($(window).scrollTop() === 0) {
            headerPage.addClass("p-relative");
        } else {
            if ($(window).scrollTop() > 0) {
                if ($(document).scrollTop() > $(document).data('prevScrollTop')) {
                    headerPage.addClass("hide-nav-bar");
                    headerPage.removeClass("p-relative");
                } else {
                    headerPage.removeClass("hide-nav-bar");
                }
            }
        }
        $(document).data('prevScrollTop', $(document).scrollTop());
    });

});
