;'use strict';

$(function () {

    function openModal($modal) {

        var hasDimmer = typeof($modal.data('dimmer')) !== "undefined" ? $modal.data('dimmer') : false;

        $modal.addClass('is-visible');

        if (hasDimmer) {
            var $dimmer = $('.js-dimmer');
            $dimmer
                .addClass('is-visible')
                .unbind('click')
                .one('click', function () {
                    closeModal($modal);
                });
        }

        $(document).bind('keyup.modal', function (e) {
            if(e.keyCode === 27) {
                closeModal($modal);
            }
        });

        $modal.trigger('modal.opened');
    }

    function closeModal($modal) {

        var hasDimmer = typeof($modal.data('dimmer')) !== "undefined" ? $modal.data('dimmer') : false;

        $modal.removeClass('is-visible');

        if (hasDimmer) {
            var $dimmer = $('.js-dimmer');
            $dimmer
                .removeClass('is-visible');
        }

        $(document).unbind('keyup.modal');

        $modal.trigger('modal.closed');
    }

    function bindListeners() {

        $('.js-show-modal-btn').click(function () {

            var $modal = $("#" + $(this).data('modal-id'));

            openModal($modal)

        });

        $('.js-close-modal-btn').click(function () {

            var $modal = $(this).closest('.modal');

            closeModal($modal);

        });
    }

    function createjQueryFunctions() {
        $.fn.closeModal = function () {
            var $modal = $(this[0]);
            if ($modal.hasClass('js-modal')) {
                closeModal($modal);
            }
            return this;
        };

        $.fn.openModal = function () {
            var $modal = $(this[0]);
            if ($modal.hasClass('js-modal')) {
                openModal($modal);
            }
            return this;
        }
    }

    bindListeners();
    createjQueryFunctions();

});