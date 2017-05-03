;$(function () {


    $('.js-accordion').each(function () {

        var options = {};
        var $accordion = $(this);

        options.canHaveMultipleItemsOpened = typeof($accordion.data('can-have-multiple-items-opened') !== "undefined") ? $accordion.data('can-have-multiple-items-opened') : false;
        options.displayMode = typeof($accordion.data('open-item-animation') !== "undefined") ? $accordion.data('open-item-animation') : "toggle";
        options.slideDuration = typeof($accordion.data('slide-duration') !== "undefined") ? $accordion.data('slide-duration') : 500;
        options.isScrollToItemOnOpenActivated = typeof($accordion.data('scroll-to-item-when-opened')) !== "undefined" && $accordion.data('scroll-to-item-when-opened');
        options.scrollOffset = typeof($accordion.data('scroll-offset') !== "undefined") ? $accordion.data('scroll-offset') : 0;
        options.scrollSpeed = typeof($accordion.data('scroll-to-item-speed') !== "undefined") ? $accordion.data('scroll-to-item-speed') : 500;

        function showAccordionItemContent($accordionItemContent) {

            var $accordionItem = $accordionItemContent.closest('.js-accordion-item');

            if(options.isScrollToItemOnOpenActivated) {
                scrollToAccordionItem($accordionItem);
            }

            if(options.displayMode === "toggle") {
                $accordionItemContent
                    .show()
                    .trigger('accordion-item-opened');
            }
            else {
                $accordionItemContent
                    .slideDown(options.slideDuration, function () {
                        $(this).trigger('accordion-item-opened');
                    })
            }

            $accordionItem.addClass('is-opened');
        }

        function scrollToAccordionItem($accordionItem) {
            $('html, body').animate({
                scrollTop: $accordionItem.offset().top - options.scrollOffset
            }, options.scrollSpeed);
        }

        function bindListeners() {
            $accordion.find('.js-accordion-item-button').click(function(e) {

                e.preventDefault();
                e.stopPropagation();

                var $accordionItem = $(this).closest('.js-accordion-item');
                var $accordionItemContent = $accordionItem.find('.js-accordion-item-content');

                if(!$accordionItem.hasClass('is-opened')) {
                    if(!options.canHaveMultipleItemsOpened) {
                        var $openedAccordionItem = $('.js-accordion-item.is-opened', $accordion);
                        if($openedAccordionItem.length > 0) {
                            var $openedAccordionItemContent = $openedAccordionItem.find('.js-accordion-item-content');
                            if(options.displayMode === "toggle") {
                                $openedAccordionItemContent.hide();
                                showAccordionItemContent($accordionItemContent);
                            }
                            else {
                                $openedAccordionItemContent.slideUp(options.slideDuration, function () {
                                    showAccordionItemContent($accordionItemContent);
                                });
                            }
                            $openedAccordionItem.removeClass('is-opened');
                        }
                        else {
                            showAccordionItemContent($accordionItemContent);
                        }
                    }
                    else {
                        showAccordionItemContent($accordionItemContent);
                    }
                }
                else {
                    options.displayMode === "toggle" ? $accordionItemContent.hide() : $accordionItemContent.slideUp(options.slideDuration);
                    $accordionItem.removeClass('is-opened');
                }
            });
        }

        bindListeners();

    });

});

