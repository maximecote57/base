;'use strict';

// Script to prevent scrolling on the body when a full screen modal is opened
// Used for ios bugs
$(function () {

    var _clientY = null;
    var $fullScreenModalOverlays = $('.js-modal-full-screen');

    function disableRubberBand(event, fullScreenModalOverlay) {

        var clientY = event.targetTouches[0].clientY - _clientY;

        if (fullScreenModalOverlay.scrollTop === 0 && clientY > 0) {
            event.preventDefault();
        }

        if (isOverlayTotallyScrolled(fullScreenModalOverlay) && clientY < 0) {
            event.preventDefault();
        }
    }

    function isOverlayTotallyScrolled(fullScreenModalOverlay) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
        return fullScreenModalOverlay.scrollHeight - fullScreenModalOverlay.scrollTop <= fullScreenModalOverlay.clientHeight;
    }

    $fullScreenModalOverlays.each(function () {

       var fullScreenModalOverlay = $(this).get(0);

        // Prevents body scrolls when mobile menu is opened on ios
        fullScreenModalOverlay.addEventListener('touchstart', function (event) {

            if (event.targetTouches.length === 1) {
                // detect single touch
                _clientY = event.targetTouches[0].clientY;
            }
        }, false);

        fullScreenModalOverlay.addEventListener('touchmove', function (event) {
            if (event.targetTouches.length === 1) {
                // detect single touch
                disableRubberBand(event, fullScreenModalOverlay);
            }
        }, false);

    });

});

