/*

 Select-to-dropdown
 By Maxime Côté

 When you want a select to become a more beautiful dropdown,
 add the .js-select-to-dropdown class to the select.

 It will automatically convert the select into the dropdown template used by dropdown.js

 Be sure to include this file before the dropdown js file.

 */

;'use strict';

$(function() {

    $('.js-select-to-dropdown').each(function() {

        var $select = $(this);
        var dropdownBtnText = $select.data('placeholder');
        var $dropdown = null;
        var $dropdownList = null;
        var customClasses = $(this).attr('data-custom-classes');
        var dropdownHasSelectedOption = false;
        var $selectToDropdownContainer = $('<div class="select-to-dropdown">');

        if(typeof dropdownBtnText === "undefined" || dropdownBtnText === "") {
            if($select.find('option:selected').length === 0) {
                $select.val($select.find('option').first().val());
            }
            dropdownBtnText = $select.find('option:selected').text();
            dropdownHasSelectedOption = true;
        }

        function createDropdownDOMElement() {

            $dropdown = $('<div class="dropdown js-dropdown">');

            if(customClasses !== '') {
                $dropdown.addClass(customClasses);
            }

            $dropdown
                .append('<a class="dropdown__btn js-dropdown-btn ' + (dropdownHasSelectedOption ? "is-dirty" : "") + '" href="javascript:void(0)">' + dropdownBtnText + '</a>')
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
            });

            $select.change(function () {
                $dropdown
                    .find('.js-dropdown-list li span[data-value="' + $select.val() + '"]')
                    .trigger('click');
            })
        }

        createDropdownDOMElement();
        bindListeners();

        $select.wrap($selectToDropdownContainer);
        $dropdown.insertAfter($select);


    });
});

