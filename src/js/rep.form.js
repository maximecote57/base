;$(function () {
    $('.js-form-input').focus(function () {
        $(this)
            .siblings('.js-form-label')
            .addClass('is-focus');
    });
    $('.js-form-label').click(function () {
        $(this)
            .siblings('.js-form-input')
            .trigger('focus');
    })

});