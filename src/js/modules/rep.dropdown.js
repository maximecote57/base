/*


 If you want to change the slide animation duration:
 - Add a parameter to the slideUp and slideDown function calls (in ms).

 When clicking on a dropdown__list-item span:
 - It updates the dropdown__btn with the text, adds an 'is-selected' class to it,
 and makes the dropdown trigger a 'change' event, as a select would do.

 */

;'use strict';

$(function () {

    var $dropdowns = $('.js-dropdown');
    var classToToggle = 'is-opened';

    function closeOpenedDropdown() {

        $dropdowns
            .filter('.' + classToToggle)
            .find('.js-dropdown-list')
            .slideUp()
            .end()
            .removeClass(classToToggle);
        $(window).unbind('click.dropdown-window');

    }

    function openDropdown($dropdown) {

        var $dropdownList = $('.js-dropdown-list', $dropdown);

        $dropdownList.slideDown();
        $dropdown.addClass(classToToggle);

        // Closing the dropdown when we click outside of it
        $(window)
            .unbind('click.dropdown-window')
            .bind('click.dropdown-window', function(e) {
                if($dropdown.find($(e.target)).length === 0) {
                    closeOpenedDropdown();
                }
            })
    }

    function updateDropdown($dropdown, selectedValue) {

        var $dropdownSpans = $dropdown.find('.js-dropdown-list li span');
        var $dropdownLink = $dropdown.find('.js-dropdown-btn');
        var $clickedDropdownListItemSpan = $dropdownSpans.filter('[data-value="' + selectedValue  + '"]');

        $dropdownSpans.removeClass('is-selected');
        $clickedDropdownListItemSpan.addClass('is-selected');

        $dropdownLink
            .text($clickedDropdownListItemSpan.text())
            .addClass('is-dirty');

        $dropdown.trigger('change');

    }

    function bindListeners() {

        $('.js-dropdown-btn').click(function (e) {

            var $dropdownBtn = $(this);
            var $dropdown = $dropdownBtn.closest('.js-dropdown');

            e.preventDefault();
            e.stopPropagation();

            // When we click on a dropdown button, we always close currently opened dropdown if it exists
            if(!$dropdown.hasClass(classToToggle)) {
                closeOpenedDropdown();
                openDropdown($dropdown);
            }
            else {
                closeOpenedDropdown();
            }

        });

        // When we click on a dropdown item, if it is a span, we update the btn text, trigger a change event, and close the dropdown
        $('.js-dropdown-list li span').click(function() {

            var $clickedDropdownListItemSpan =  $(this);
            var $dropdown = $clickedDropdownListItemSpan.closest('.js-dropdown');

            updateDropdown($dropdown, $clickedDropdownListItemSpan.data('value'));
            closeOpenedDropdown();

        });
    }

    bindListeners();


});