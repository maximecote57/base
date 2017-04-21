;$(function () {

    $('.js-form-input').focus(function () {
        var $field = $(this).closest('.js-form-field');
        $field
            .find('.js-form-label')
            .addClass('is-focus');
    });

    $('.js-form-label').click(function () {
        var $field = $(this).closest('.js-form-field');
        $field
            .find('.js-form-input')
            .trigger('focus');
    })

});