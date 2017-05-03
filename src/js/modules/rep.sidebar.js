;$(function () {

    var $sidebar =  $('.js-sidebar');
    var $dimmer = $('.js-dimmer');
    var $slidableContent = $('.js-slidable-content');
    var hasDimmer = typeof($sidebar.data('dimmer') !== "undefined") ? $sidebar.data('dimmer') : false;
    var mustSlideContent = typeof($sidebar.data('slide-content') !== "undefined") ? $sidebar.data('slide-content') : false;

    function closeSidebar() {
        $sidebar.removeClass('is-visible');
        if(hasDimmer) {
            $dimmer
                .removeClass('is-visible')
                .unbind('click.sidebar');

        }
        if(mustSlideContent) {
            $slidableContent.removeClass('is-slided')
        }
    }

    function openSidebar() {
        $sidebar.addClass('is-visible');
        if(hasDimmer) {
            $dimmer
                .addClass('is-visible')
                .unbind('click.sidebar')
                .bind('click.sidebar', function () {
                    closeSidebar();
                })
        }
        if(mustSlideContent) {
            $slidableContent.addClass('is-slided')
        }
    }

    function toggleSidebar() {
        $sidebar.hasClass('is-visible') ? closeSidebar() : openSidebar();
    }

    function bindListeners() {
        $('.js-sidebar-toggle').click(function () {
            toggleSidebar();
        });

        $('.js-sidebar-open').click(function () {
            openSidebar();
        });

        $('.js-sidebar-close').click(function () {
            closeSidebar();
        });
    }

    bindListeners();

})