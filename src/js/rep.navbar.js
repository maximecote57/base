;$(function () {

    var options = {};
    var $navbar = $('.js-navbar');

    options.navbarSlideSpeed = typeof($navbar.data('slide-speed') !== "undefined") ? $navbar.data('slide-speed') : 500;

    $('.js-hamburger').click(function() {
        $(this).toggleClass('is-opened');
        $('.js-navbar-container').slideToggle(options.navbarSlideSpeed);
    });
});