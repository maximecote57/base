/*


 If you want to change the slide animation duration:
 - Add a parameter to the slideUp and slideDown function calls (in ms).

 When clicking on a dropdown__list-item span:
 - It updates the dropdown__btn with the text, adds an 'is-selected' class to it,
 and makes the dropdown trigger a 'change' event, as a select would do.

 */


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

    function bindListeners() {
        $('.js-dropdown-btn').click(function(e) {

            e.preventDefault();
            e.stopPropagation();

            var $dropdown = $(this).closest('.js-dropdown');

            // When we click on a dropdown button, we always close currently opened dropdown if it exists
            if(!$dropdown.hasClass(classToToggle)) {
                closeOpenedDropdown();
                openDropdown($dropdown);
            }
            else {
                closeOpenedDropdown();
            }

        });

        // When we click on a dropdown item, if it is a span, we update the btn text and trigger a change event
        $('.js-dropdown-list li span').click(function() {

            var $dropdown = $(this).closest('.js-dropdown');
            var $dropdownLink = $dropdown.find('.js-dropdown-btn');
            var $clickedDropdownListItemSpan =  $(this);

            $('.js-dropdown-list li span', $dropdown).removeClass('is-selected');
            $clickedDropdownListItemSpan.addClass('is-selected');

            $dropdownLink.text($clickedDropdownListItemSpan.text());
            $dropdown.trigger('change');

            closeOpenedDropdown();

        });
    }

    bindListeners();


});