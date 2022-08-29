//  Класс PopupWithForm extends Popup.  //
//  Принимает в конструктор колбэк сабмита формы,  //
  //  содержит приватный метод _getInputValues  //
  //  перезаписывает родительские методы setEventListeners и close.  //
//  Для каждого попапа создать свой экземпляр класса PopupWithForm.  //

import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._submitButton = this._popup.querySelector(".popup__submit");
    this._submitButtonText = this._submitButton.textContent;   
  }

  //  указываем 2 параметра (2й с текстом по умолчанию, чтобы не указывать лишний раз его)
  renderLoading(isLoading, loadingText='Сохранение...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  //  метод для получения и возвращения данных формы  //
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  //  тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
  //  ревьюер рекомендовал сделать метод setInputValue с записью значений по имени через forEach((input) =>  //
  setInputValues(userInfo) {
    console.log(userInfo);
    this._inputList.forEach((input) => {
      console.log(input);
      input.value = userInfo[input.name];
    });
  }

  //  перезаписываем родительские методы setEventListeners и close  //
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    });
  }

  //  вызываем родительский метод закрытия и очищаем форму  //
  close() {
    super.close();
    this._form.reset();
  }

  //  улучшаем UX - показываем на кнопке текст о том, что идет сохранение данных  //
  //  Заменили на renderLoading  //
}