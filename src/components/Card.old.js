//  Класс создает карточку с текстом и ссылкой на изображение  //

//  Импортируем нужные свойства и методы из index.js  //
// import {openPopup, popupElement, popupImage, popupImageCaption} from './index.js' //

//  Открываем экспорт класса со всеми полями для импорта  //
//  конструктор принимает данные cardData и селектор шаблона #element-template  //
//  cardData содержит ссылку и название места  //
export default class Card {
  constructor(cardData, cardSelector, handleCardClick, handleCardDelete, handleLike, handleRemoveLike) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._userId = cardData.userId;
    this._ownerId = cardData.ownerId;
    this._cardId = cardData.cardId;
    //    this._isLiked = false;  //
    this._likes = cardData.likes;
    this._handleCardClick = handleCardClick;
    this._handleLikeAdd = handleLike;
    this._handleRemoveLike = handleRemoveLike;
    this._handleCardDelete = handleCardDelete;
  }

  //  методы для работы с разметкой, установки слушателей событий  //

  //  приватный (_getTemplate) клонирует из шаблона и возвращает готовую карточку (cardElement)  //
  _getTemplate() {
    const element = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return element;
  }

  //  публичный (createCardElement) добавляет данные, слушателей, возвращает готовую карточку  //
  //  добавляем обработку счетчика лайков, статус доступности удаления (своей) карточки  //
  createCardElement() {
    this._element = this._getTemplate();
    this._imgElement = this._element.querySelector('.element__image');
    this._titleElement = this._element.querySelector('.element__title');
    this._likeButton = this._element.querySelector(".element__button-like");
    this._deleteButton = this._element.querySelector(".element__button-delete");
    this._likesCount = this._element.querySelector(".element__likes-count");
    this._imgElement.src = this._link;
    this._imgElement.alt = this._name;
    this._imgElement.title = this._name;
    this._titleElement.textContent = this._name;
    this._likesCount.textContent = `${this._likes.length}`;
    this._setEventListeners();
    this._handleLikeState();
    this.handleDeleteButtonState();
    return this._element;
  }

  // приватный (_setEventListeners) слушает клики по иконкам "сердечко" и "корзина"  //
  _setEventListeners() {

    //  слушаем клик по карточке (фото)  //
    this._imgElement.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });

    //  слушаем клик по сердечкку Like  //
    this._likeButton.addEventListener('click', () => {
      this._likeButton.classList.contains("element__button-like_active")
        ? this._handleRemoveLike()
        : this._handleLikeAdd();
    });

    //  слушаем клик по иконке удаления карточки  //
    this._deleteButton.addEventListener('click', () => {
      this._handleCardDelete();
    });
  }

  //  приватный - добавляет лайк при клике, если  (вкл./выкл.) при клике на сердечко  //  
  _handleLikeState() {
    this._likes.forEach((user) => {
      if (user._id === this._userId) {
        this.addLike();
      } else {
        this.removeLike();
      }
    });
  }

  // публичный удаляет иконку удаления, если карточка создана другим пользователем (!==this._ownerId)  //
  handleDeleteButtonState() {
    if (this._userId !== this._ownerId) {
      this._deleteButton.remove();
      this._deleteButton = null;
    }
  }

  //  усложняем обработку - учитываем лайки разных пользователей, отображаем счетчик лайков  // 

  //  Публичный метод для закраски сердечка черным после лайка  //
  addLike() {
    this._likeButton.classList.add("element__button-like_active");
  }

  //  Публичный метод для покраски сердечка белым после повторного клика  //
  removeLike() {
    this._likeButton.classList.remove("element__button-like_active");
  }

  //  Публичный метод для вывода счетчика кликов  //
  setLikesCount(res) {
    this._likesCount.textContent = `${res.likes.length}`;
  }

  // Публичный (был _deleteCard) удаляет карточку из DOM при клике на корзинку  //
  deleteCard() {
    this._element.remove();
    this._element = null;
  }
}