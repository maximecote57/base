;'use strict';

$(function () {

    $('.js-tabs').each(function () {

        var $tabs = $(this);
        var $tabsTriggers = $tabs.find('.js-tab-trigger');
        var classToToggle = "is-active";

        function bindListeners() {

            $tabsTriggers.click(function (e) {

                if($(this).hasClass(classToToggle)) {
                    return;
                }

                e.preventDefault();
                e.stopPropagation();

                var $tabContentId = $(this).data('tab-id');
                var $tabContent = $('#' + $tabContentId);

                $('.js-tab-content.' + classToToggle, $tabs)
                    .add($tabsTriggers)
                    .removeClass(classToToggle);

                $tabContent
                    .add($(this))
                    .addClass(classToToggle);


            })
        }

        bindListeners();

    });

});

