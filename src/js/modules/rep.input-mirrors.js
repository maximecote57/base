;'use strict';

$(function () {

    $('input[data-mirror]').each(function () {

        var $mirroredElement = $('input[data-mirror="' + $(this).data('mirror') + '"]');

        $(this).on('keyup', function () {
            $mirroredElement.val($(this).val());
        })

    });

});