/*
 *  Project: 
 *  Description: 
 *  Author: 
 *  License: 
 */

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

    var pluginName = 'NumberPicker';
    var defaults = {};
    var innerTemplate = "<div class='number-picker'><div class='number-picker__modifier js-number-picker-modifier' data-type='decrease'>-</div><input type='text' class='number-picker__input js-number-picker-input' value='00' maxlength=2 /><div class='number-picker__modifier js-number-picker-modifier' data-type='increase'>+</div></div>";

    var MAX_LIMIT = 60;
    var MIN_LIMIT = 0;
    var TYPE_INCREASE = 'increase';
    var TYPE_DECREASE = 'decrease';
    var DEFAULT_VALUE = '00';

    function getInputModifiersChangeValue(type, value) {
        if (type === TYPE_INCREASE && value < MAX_LIMIT) {
            value++;
        } else {
            if (type === TYPE_DECREASE && value > MIN_LIMIT) {
                value--;
            }
        }

        return value;
    }

    function getInputKeyChangeValue(value) {
        if (value > MAX_LIMIT) {
            return MAX_LIMIT;
        } else if (value < MIN_LIMIT) {
            return MIN_LIMIT;
        } else {
            return value;
        }
    }

    function insertFormattedValue($input, value) {
        $input.val(value < 10 ? '0' + value : value);
    }

    function NumberPicker( element, options ) {
        this.$element = $(element);

        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    NumberPicker.prototype = {
        init: function () {
            this.$element.html(innerTemplate);
            this.binds();
        },

        binds: function () {
            this.$element.find('.js-number-picker-modifier').on('click', function(e) {
                var $current = $(e.currentTarget);
                var type = $current.data('type');
                var $input = $current.siblings('.js-number-picker-input');
                var value = parseInt($input.val(), 10);

                value = getInputModifiersChangeValue(type, value);

                insertFormattedValue($input, value);
            });

            this.$element.find('.js-number-picker-input').on('blur', function (e) {
                var $input = $(e.currentTarget);
                var value = parseInt($input.val(), 10);

                if (isNaN(value)) {
                    $input.val(DEFAULT_VALUE);
                    return;
                }

                value = getInputKeyChangeValue(value);

                insertFormattedValue($input, value);
            });
        },

        destroy: function() {
            this.$element.find('.js-number-picker-modifier').off();
            this.$element.find('.js-number-picker-input').off();
            this.$element.html();
        },

        getData: function() {
            var $inputNumber = this.$element.find('.number-picker__input');
            return parseInt($inputNumber.val(),10);
        }
    }

    $.fn[pluginName] = function ( options ) {
        var args = arguments;

        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new NumberPicker( this, options ));
                }
            });

        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            var returns;

            this.each(function () {
                var instance = $.data(this, 'plugin_' + pluginName);

                if (instance instanceof NumberPicker && typeof instance[options] === 'function') {
                    returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }

                if (options === 'destroy') {
                    $.data(this, 'plugin_' + pluginName, null);
                }
            });

            return returns !== undefined ? returns : this;
        }
    };

}(jQuery, window, document));