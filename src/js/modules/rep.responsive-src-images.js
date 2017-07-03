;'use strict';

$(function () {

    var viewportWidth = $(window).width();
    var $responsiveSrcImages = $('.js-responsive-src-image');

    function updateImageSrc($img) {
        $img.attr('src', $img.data('src'));
    }

    $responsiveSrcImages.each(function () {

        var viewportsOfImage = $(this).data('viewports').split(',');

        if(viewportsOfImage.indexOf("mobile") !== -1 && viewportWidth < 767) {
            updateImageSrc($(this));
        }
        else if(viewportsOfImage.indexOf("tablet") !== -1 && viewportWidth > 767 && viewportWidth < 991) {
            updateImageSrc($(this));
        }
        else if(viewportsOfImage.indexOf("desktop") !== -1 && viewportWidth > 991) {
            updateImageSrc($(this));
        }

    });

});