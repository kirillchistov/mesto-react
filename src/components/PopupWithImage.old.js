//  Класс PopupWithImage extends Popup для открытия попапа с карточкой места  //


import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._image = this._popup.querySelector('.popup__image');
    this._title = this._popup.querySelector('.popup__image-caption');
  }

//  Перезаписывать родительский open (вставка картинки со ссылкой и подписью)  //
  open(link, name) {
    super.open();

    this._image.src = link;
    this._image.alt = name;
    this._image.title = name;
    this._title.textContent = name;
  }
}