'use strict';

(function () {

  var MAP_PIN_WIDTH = 50;
  var MAP_PIN_HEIGHT = 70;

  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

  /**
   * Заполение шаблона маркера объявления данными
   * @param {Object} element элемент разметки
   * @param {Object} advert объект объявления
   */
  var fillElement = function (element, advert) {
    var pinImageElement = element.querySelector('img');

    pinImageElement.alt = advert.offer.title;
    pinImageElement.src = advert.author.avatar;

    element.style.left = (advert.location.x - (MAP_PIN_WIDTH / 2)) + 'px';
    element.style.top = (advert.location.y - MAP_PIN_HEIGHT) + 'px';
  };

  window.pin = {
    /**
     * Создание разметки маркера объявления для отображения на карте
     * @param {Object} advert объект объявления
     * @param {Number} index идентификатор объявления
     * @return {Object} разметка маркера объявления
     */
    createElement: function (advert, index) {
      var template = templatePin.cloneNode(true);

      template.setAttribute('data-id', index);

      fillElement(template, advert);

      return template;
    }
  };
})();
