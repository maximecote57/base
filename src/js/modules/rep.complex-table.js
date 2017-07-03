;'use strict';

$(function () {

    if($(window).width() > 767) {
        return;
    }

    $('.js-complex-table').each(function () {

        var $table = $(this);
        var $tableMobileHeaders = $table.find('.js-header-mobile');
        var $cells = $table.find('.js-cell');
        var $dropdownColUnits = $table.find('.js-dropdown-units');
        var classToToggle = 'is-selected';

        function updateCols () {

            $cells
                .hide()
                .removeClass('has-right-border');

            $tableMobileHeaders.each(function (index) {

                var selectedColId = $(this).find('.js-dropdown-unit.is-selected').data('complex-table-col-id');
                var selectedColCells = $cells.filter(function () {
                    return $(this).data('complex-table-col-id') == selectedColId
                });

                selectedColCells.show();

                if(index !== ($tableMobileHeaders.length - 1)) {
                    selectedColCells.addClass('has-right-border');
                }

            });
        }

        function updateColSpans() {

            $table.find('.js-separator').attr('colspan', $tableMobileHeaders.length);
            $table.find('.js-header-logo').attr('colspan', 1);
        }

        function initComplexTable() {

            updateColSpans();
            updateCols();

        }

        function bindListeners() {

            $dropdownColUnits.on('change', function () {
                updateCols();
            })

        }

        initComplexTable();
        bindListeners();

    });

});