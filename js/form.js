'use strict';

(function () {
  var ROOM_GUEST_RELATION = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var TYPE_PRICE_RELATION = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var form = document.querySelector('.ad-form');

  var fieldTitleElement = document.querySelector('#title');
  var fieldCapacityElement = document.querySelector('#capacity');
  var fieldRoomNumberElement = document.querySelector('#room_number');
  var fieldAddressElement = document.querySelector('#address');
  var fieldTimeIn = document.querySelector('#timein');
  var fieldTimeOut = document.querySelector('#timeout');
  var fieldType = document.querySelector('#type');
  var fieldPrice = document.querySelector('#price');

  var validateCapacityField = function () {
    var roomNumber = fieldRoomNumberElement.value;
    var capacity = fieldCapacityElement.value * 1;
    var availableValues = ROOM_GUEST_RELATION[roomNumber];
    var message = availableValues.includes(capacity) ? '' : 'Количество гостей не влезут в выбранную комнату';

    fieldCapacityElement.setCustomValidity(message);
  };

  var validateTimeFields = function (evt) {
    if (fieldTimeIn === evt.target) {
      fieldTimeOut.value = fieldTimeIn.value;
    } else {
      fieldTimeIn.value = fieldTimeOut.value;
    }
  };

  var validatePriceField = function () {
    var type = fieldType.value;

    var minPrice = TYPE_PRICE_RELATION[type] ? TYPE_PRICE_RELATION[type] : 0;

    fieldPrice.setAttribute('min', minPrice);
    fieldPrice.setAttribute('placeholder', minPrice);
  };

  fieldRoomNumberElement.addEventListener('change', validateCapacityField);
  fieldCapacityElement.addEventListener('change', validateCapacityField);

  fieldType.addEventListener('change', validatePriceField);

  fieldTimeIn.addEventListener('change', validateTimeFields);
  fieldTimeOut.addEventListener('change', validateTimeFields);

  validateCapacityField();
  validatePriceField();

  window.form = {
    /**
     * Включение/выключение элементов формы
     * @param {Object} form Объект формы в DOM
     * @param {Boolean} isDisabled True или false для выставления в disabled
     */
    changeDisabledFormElements: function (form, isDisabled) {
      var fields = form.querySelectorAll('select, input, textarea, button');

      fields.forEach(function (field) {
        field.disabled = isDisabled;
      });
    },

    fillAddressField: function () {
      var coordinates = window.map.getCoordinatesPinMain();

      fieldAddressElement.value = coordinates.x + ', ' + coordinates.y;
    },

    /**
     * Активация элементов формы фильтра на карте
     */
    active: function () {
      form.classList.remove('ad-form--disabled');

      this.changeDisabledFormElements(form, false);
    },

    /**
     * Диактивация элементов формы фильтра на карте
     */
    deactive: function () {
      this.clear();

      this.changeDisabledFormElements(form, true);

      form.classList.add('ad-form--disabled');
    },

    clear: function () {
      fieldTitleElement.value = '';
      fieldAddressElement.value = '';
    }
  };
})();
