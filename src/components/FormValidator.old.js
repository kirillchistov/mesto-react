//  пока не импортируем import { validateConfig } from "./constants.js";  //
//  класс FormValidator настраивает валидацию полей формы  //
//  принимает в конструктор объект настроек с селекторами и классами формы  //
//  принимает вторым параметром элемент той формы, которая валидируется  //
//  имеет приватные методы для обработки форму: проверка валидности, вкл./выкл. кнопки, установка обработчиков  //
//  имеет публичный метод enableValidation, который включает валидацию формы  //
//  для каждой проверяемой формы создаем экземпляр класса FormValidator в index.js  //
export default class FormValidator {
    constructor(validateConfig, formElement) {
      this._form = formElement;
      this._inputSelector = validateConfig.inputSelector;
      this._submitButtonSelector = validateConfig.submitButtonSelector;
      this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
      this._inactiveButtonClass = validateConfig.inactiveButtonClass;
      this._inputErrorClass = validateConfig.inputErrorClass;
      this._errorClass = validateConfig.errorClass;
      this._submitButton = this._form.querySelector(this._submitButtonSelector);
    };

    //  приватный для поиска поля ввода с ошибкой  //     
    _getErrorElement(inputObj) {
      this._errorElement = this._form.querySelector(`.${inputObj.id}-error`);
      return this._errorElement;
    };

    //  приватный для показа спана с ошибкой при невалидном инпуте  //
    _showInputError(inputObj) {
        this._getErrorElement(inputObj); 
        inputObj.classList.add(this._inputErrorClass);
        this._errorElement.classList.add(this._errorClass); 
        this._errorElement.textContent = inputObj.validationMessage;
    };
    
    //  приватный для скрытия спана с ошибкой при невалидном инпуте  //
    _hideInputError(inputObj) {
        this._getErrorElement(inputObj);
        if (!this._errorElement) return;
        inputObj.classList.remove(this._inputErrorClass);
        this._errorElement.classList.remove(this._errorClass);
        this._errorElement.textContent = '';
    };

    //  приватный для проверки валидности каждого инпута и показа ошибок  //
    _checkInputValidity(inputObj) {
        if (!inputObj.validity.valid) {
          this._showInputError(inputObj);
        }
        else {
          this._hideInputError(inputObj);
        };
    };
  
    //  приватный для валидации формы  //
    //  для каждого инпута в форме создаем объект и вешаем слушатели ввода  //
    
    _checkFormValidity() {
      this._inputList.forEach((inputElement) => {
        const inputObj = {
          input: inputElement,
          errorElement: this._form.querySelector(`.${inputElement.id}-error`)
        };
        inputObj.addEventListener('input', () => {
          this._checkInputValidity(inputObj);
          this._toggleSubmitButtonState();
        });
      });
    };
  
    //  приватный для переключения состояние кнопки сохренения (вкл./выкл.)  //
    _toggleSubmitButtonState() {
      if (this._hasInvalidInput())
        this.deactivateSubmitButton();
      else
        this.activateSubmitButton();
    };
  
    //  публичный для включения (любой) кнопки  //
    activateSubmitButton() {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    };
  
    //  публичный для выключения (любой) кнопки  //
    deactivateSubmitButton() {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    };

    _setEventListeners() {
      this._toggleSubmitButtonState();
  
      this._inputList.forEach((inputObj) => {
        inputObj.addEventListener('input', () => {
          this._checkInputValidity(inputObj);
          this._toggleSubmitButtonState();
        });
      });
    };
    
    //  приватный для проверки на наличие некорректного инпута в форме  //
    _hasInvalidInput() {
        return this._inputList.some((input) => {
          return !input.validity.valid;
      });
    };
      
    // публичный для перезапуска валидации  //
    resetValidation() {
      this._toggleSubmitButtonState();
      this._inputList.forEach((input) => {
        this._hideInputError(input);
      });
    };

    //  публичный для включения валидации форм  //
    enableValidation() {
      this._form.addEventListener('submit', (evt) => evt.preventDefault());
      this._setEventListeners();
    };
}