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
    });

    $('.js-form-input[type="checkbox"]').change(function () {
        var $field = $(this).closest('.js-form-field');
        $field.toggleClass('is-checked');
    });

    $('.js-form-input[type="radio"]').change(function () {
        var $form = $(this).closest('form');
        var radioBtnGroupName = $(this).attr('name');
        var $radioBtnsOfSameGroup = $form.find('.js-form-input[type="radio"][name=' + radioBtnGroupName + ']');

        $radioBtnsOfSameGroup.each(function () {
            $(this)
                .closest('.js-form-field')
                .toggleClass('is-checked', $(this).prop('checked'));
        })

    });

});