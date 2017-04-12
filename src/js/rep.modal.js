// Modal

$(function () {

    function openModal($modal) {

        $modal.addClass('is-visible');

        if ($modal.hasClass('has-dimmer')) {
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

        $modal.removeClass('is-visible');

        if ($modal.hasClass('has-dimmer')) {
            var $dimmer = $('.js-dimmer');
            $dimmer
                .removeClass('is-visible');
        }

        $(document).unbind('keyup.modal');

        $modal.trigger('modal.closed');
    }

    function bindListeners() {

        $('.js-show-modal-btn').click(function () {

            var $modal = $($(this).data('modal-id'));

            openModal($modal)

        });

        $('.js-modal-close-btn').click(function () {

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