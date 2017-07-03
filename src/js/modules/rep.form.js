;'use strict';

$(function () {

    function updateRadioBtns() {

        $('.form').each(function () {
            $(this)
                .find('input[type="radio"]:checked')
                .closest('.js-form-field')
                .addClass('is-selected');
        });

    }

    function updateAlreadyFilledInputs() {

        $('.js-form-field input').each(function () {

            var $field = $(this).closest('.js-form-field');

            if($(this).val() !== "" || ($field.parent().find('.js-form-field-error').length > 0) && $(this).val() !== "") {
                $field
                    .find('label')
                    .addClass('is-focus');
            }

        });

    }

    function updateNumberInputs () {

        $('.js-number-input').each(function () {

            var $field = $(this).closest('.js-form-field');
            var $spinner = $('<div class="form__number-input-spinner"><div class="form__number-input-spinner-btn js-number-input-spinner-plus-btn">+</div><div class="form__number-input-spinner-btn form__number-input-spinner-btn--has-border-top js-number-input-spinner-minus-btn">-</div></div>');

            $field.append($spinner);

        });

    }

    function bindListeners() {

        $('.js-form-field input').focus(function () {

            var $field = $(this).closest('.js-form-field');

            $field
                .find('label')
                .addClass('is-focus');

        });

        $('.js-form-field label').click(function () {

            var $field = $(this).closest('.js-form-field');

            $field
                .find('input')
                .trigger('focus');

        });

        $('.js-form-input[type="checkbox"]').change(function () {

            var $field = $(this).closest('.js-form-field');

            $field.toggleClass('is-selected');

        });

        $('.js-form-input[type="radio"]').change(function () {

            var $field = $(this).closest('.js-form-field');
            var radioGroupName =  $(this).attr('name');
            var $radioBtnOfName = $(this).closest('form').find('input[type="radio"][name="' + radioGroupName + '"]');

            $radioBtnOfName.each(function () {
                $(this).closest('.js-form-field').removeClass('is-selected')
            });

            $field.addClass('is-selected');

        });

        $('.js-number-input-spinner-plus-btn').click(function () {

            var $field = $(this).closest('.js-form-field');
            var $label = $field.find('label');
            var $input = $field.find('input');
            var inputValue = parseInt($input.val());
            var maxValue = $input.attr('max');

            if(isNaN(inputValue)) {
                inputValue = 0;
            }

            if((typeof maxValue !== "undefined" && inputValue < maxValue) || typeof maxValue === "undefined") {
                $input.val(inputValue + 1);
                $label.addClass('is-focus');
            }

        });

        $('.js-number-input-spinner-minus-btn').click(function () {

            var $field = $(this).closest('.js-form-field');
            var $label = $field.find('label');
            var $input = $field.find('input');
            var inputValue = parseInt($input.val());
            var minValue = $input.attr('min');

            if(isNaN(inputValue)) {
                inputValue = 0;
            }

            if((typeof minValue !== "undefined" && inputValue > minValue) || typeof minValue === "undefined") {
                $input.val(inputValue - 1);
                $label.addClass('is-focus');
            }

        });
    }

    updateNumberInputs();
    bindListeners();
    updateRadioBtns();
    updateAlreadyFilledInputs();

});