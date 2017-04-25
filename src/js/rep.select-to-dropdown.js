/*

 Select-to-dropdown
 By Maxime Côté

 When you want a select to become a more beautiful dropdown,
 add the .js-select-to-dropdown class to the select.

 It will automatically convert the select into the dropdown template used by dropdown.jsà

 Be sure to include this file before the dropdown js file.

 */

;$(function() {
    $('.js-select-to-dropdown').each(function() {

        var $select = $(this);
        var dropdownBtnText = $select.find('option:selected').length > 0 ? $select.find('option:selected').text() : $select.find('option').first().text();
        var $dropdown = null;
        var customClasses = $(this).attr('data-custom-classes');

        function createDropdownDOMElement() {

            $dropdown = $('<div class="dropdown js-dropdown">');

            if(customClasses !== '') {
                $dropdown.addClass(customClasses);
            }

            $dropdown
                .append('<a class="dropdown__btn js-dropdown-btn" href="javascript:void(0)">' + dropdownBtnText + '</a>')
                .append('<ul class="dropdown__list js-dropdown-list">');

            $dropdownList = $dropdown.find('ul');

            $select
                .find('option')
                .each(function() {
                    $dropdownList.append('<li class="dropdown__list-item"><span data-value="' + $(this).attr('value') + '">' + $(this).text() + '</span></li>')
                });
        }

        function bindListeners() {
            $dropdown.on('change', function () {
                $select.val($dropdown.find('.is-selected').data('value'));
            })
        }

        createDropdownDOMElement();
        bindListeners();

        $dropdown.insertAfter($select);
        $select.hide();

    });
})

