;'use strict';

$(function () {

    var options = {};
    var $navbar = $('.js-navbar');
    var $subNavBars =  $('.js-subnavbar');
    var $mobileMenu = $('.js-mobile-menu');
    var $subNavbarTriggers = $('.js-subnavbar-trigger');
    var classToToggle = "is-selected";

    options.navbarSlideSpeed = typeof($navbar.data('mobile-menu-slide-speed')) !== "undefined" ? $navbar.data('mobile-menu-slide-speed') : 500;
    options.subNavbarSlideSpeed = typeof($navbar.data('subnavbar-slide-speed')) !== "undefined" ? $navbar.data('subnavbar-slide-speed') : 500;
    options.hasStickyNavbar = typeof($navbar.data('has-sticky-navbar')) !== "undefined" ? $navbar.data('has-sticky-navbar') : false;
    options.stickyNavbarScrollTriggerHeight = typeof($navbar.data('sticky-navbar-scroll-trigger-height')) !== "undefined" ? $navbar.data('sticky-navbar-scroll-trigger-height') : 300;

    function updateStickyNavbarDomElements($stickyNavBar) {
        $stickyNavBar.toggleClass('is-sticky-visible');
        $subNavBars.toggleClass('is-sticky');
    }

    function toggleStickyNavbar($stickyNavBar) {

        var $openedSubNavBar = $('.js-subnavbar.' + classToToggle);

        if($openedSubNavBar.length > 0) {
            hideOpenedSubNavbar(function() {
                updateStickyNavbarDomElements($stickyNavBar);
            }, 'slide');
            $openedSubNavBar.trigger('closing');
        }
        else {
            updateStickyNavbarDomElements($stickyNavBar)
        }

    }

    function disableSubNavBarTriggers() {

        $subNavbarTriggers.addClass('is-disabled');

    }

    function enableSubNavBarTriggers() {

        $subNavbarTriggers.removeClass('is-disabled');

    }

    function updateActiveSubNavBarTrigger($activeSubNavBar) {

        $subNavbarTriggers.filter('[data-subnavbar-id="' + $activeSubNavBar.attr('id')  + '"]')
            .parent()
            .addClass(classToToggle);

    }

    function updateNonActiveSubNavBarTrigger($activeSubNavBar) {

        $subNavbarTriggers.filter('[data-subnavbar-id="' + $activeSubNavBar.attr('id')  + '"]')
            .parent()
            .removeClass(classToToggle);

    }

    function showSubNavBar($subNavBar) {


        disableSubNavBarTriggers();
        updateActiveSubNavBarTrigger($subNavBar);

        $subNavBar.slideDown(options.subNavbarSlideSpeed, function() {
            $subNavBar.addClass(classToToggle);
            enableSubNavBarTriggers();
            $(document).on('click.subnavbar', function (e) {
                if($(e.target).parents('.js-subnavbar').length === 0 ) {
                    hideOpenedSubNavbar(null, 'slide');
                    $(document).off('click.subnavbar');
                    $('.js-subnavbar.' + classToToggle).trigger('closing');
                }
            });
        });

    }

    function hideOpenedSubNavbar(callback) {

        var $openedSubNavBar = $('.js-subnavbar.' + classToToggle);

        disableSubNavBarTriggers();
        updateNonActiveSubNavBarTrigger($openedSubNavBar);

        $openedSubNavBar.slideUp(options.subNavbarSlideSpeed, function () {
            if(typeof callback === "function") {
                callback();
            }
            $openedSubNavBar.removeClass(classToToggle);
            enableSubNavBarTriggers();
            $(document).off('click.subnavbar');
        });

    }

    function bindListeners() {

        if(options.hasStickyNavbar && $(window).width() > 767) {

            var $stickyNavBar = $navbar
                .clone(true, true)
                .addClass('is-sticky');

            $navbar.addClass('is-original-navbar');

            $('body').prepend($stickyNavBar);

            new ScrollMagic.Scene({offset: "440"})
                .on('start', function () {
                    toggleStickyNavbar($stickyNavBar);
                })
                .addTo(REP.scrollMagicController);
        }

        $('.js-hamburger').click(function() {
            $mobileMenu.fadeToggle(options.navbarSlideSpeed);
        });

        $('.js-subnavbar-trigger').click(function(e) {

            e.preventDefault();
            e.stopPropagation();

            if($(this).hasClass('is-disabled')) {
                return;
            }

            var $openedSubNavBar = $('.js-subnavbar.' + classToToggle);
            var subNavBarId = $(this).data('subnavbar-id');
            var $subNavBarToOpen = $('#' + subNavBarId);

            window.REP.closeSidebar();

            // Close opened subnavbar
            if($openedSubNavBar.length > 0 && $openedSubNavBar.attr('id') === subNavBarId) {
                hideOpenedSubNavbar();
                $subNavBarToOpen.trigger('closing');
            }
            // Close opened subnavbar and open another one
            else if($openedSubNavBar.length > 0) {
                hideOpenedSubNavbar(function() {
                    showSubNavBar($subNavBarToOpen);
                });
                $subNavBarToOpen.trigger('switching');
            }
            // Open subnavbar
            else {
                showSubNavBar($subNavBarToOpen);
                $subNavBarToOpen.trigger('opening');
            }

        });

        $('.js-mobile-submenu-trigger').click(function (e) {

            e.preventDefault();
            e.stopPropagation();

            var $openedSubMenu = $('.js-mobile-submenu.' + classToToggle);
            var subMenuId = $(this).data('submenu-id');
            var $subMenuToOpen = $('#' + subMenuId);

            if($openedSubMenu.length > 0 && $openedSubMenu.attr('id') === subMenuId) {
                $openedSubMenu
                    .hide()
                    .removeClass(classToToggle);
                $mobileMenu.removeClass('has-submenu-opened');
                $(this).parent().removeClass(classToToggle);
            }
            else if($openedSubMenu.length > 0) {
                $openedSubMenu
                    .hide()
                    .removeClass(classToToggle);
                $subMenuToOpen
                    .show()
                    .addClass(classToToggle);
                $('.js-mobile-submenu-trigger').parent().removeClass(classToToggle);
                $(this).parent().addClass(classToToggle);
            }
            else {
                $subMenuToOpen
                    .show()
                    .addClass(classToToggle);
                $mobileMenu.addClass('has-submenu-opened');
                $(this).parent().addClass(classToToggle);
            }

        });

        $('.js-mobile-menu-back-btn').click(function (e) {

            e.preventDefault();
            e.stopPropagation();

            var $openedSubMenu = $('.js-mobile-submenu.' + classToToggle);

            $openedSubMenu
                .hide()
                .removeClass(classToToggle);

            $('.js-mobile-submenu-trigger').parent().removeClass(classToToggle);

            $mobileMenu.removeClass('has-submenu-opened');

        });

    }

    bindListeners();

});