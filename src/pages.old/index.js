//  Переносим index.js в /pages  //
//  Здесь должны остаться только создание классов и добавление обработчиков  //

//  Импортируем в него все классы  //
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

//  Импортируем новые классы Api и PopupWithConfirm  //
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

//  Импортируем стили из index.css  //
import "./index.css";

//  Импортируем константы из /utils/constants.js, кроме тех, которые надо создавать по месту:  //
//  initialCards, popupEdit, profileName, profileJob, profileAvatar, popupAdd, placeNameInput,  //
//  placeLinkInput, formEditAvatar, gallery, popupElement, popupImage, popupConfirmDelete  //

import {
  validateConfig,
  btnEdit,
  nameInput,
  jobInput,
  btnAdd,
  btnEditAvatar,
  popupEditAvatar,
  formValidators,
} from "../utils/constants.js";

//  Глобальная переменная для юзера пока пустая  //
let userId;

//  Создаем объект для API-доступа к серверу с полученным ключом в заголовке  //
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-47",
  headers: {
    authorization: "7a2b5691-9c91-496f-b370-fd3cc1ce7210",
    "Content-Type": "application/json",
  },
});

//  Создаем экземпляр попапа с карточкой  //
const popupImage = new PopupWithImage('#popupElement');
popupImage.setEventListeners();

//  Обработчик клика по карточке места (фото)  //
const handleCardClick = (link, name) => {
  popupImage.open(link, name);
};

//  Обработчик клика по кнопке удаления (корзинке)  //
//  Прописываем сразу в вызове новой карточки  //
 
const handleCardDelete = (card) => {
  popupConfirmDelete.open(card);
};


//  Генерируем карточку (из шаблона) и возвращаем  //
//  Получаем данные с сервера, включая id карточки, автора и пользователя, лайки  //
//  Передаем объект с полями карты, селектор шаблона, обработчики клика, удаления и лайка/дислайка  //
const createCard = (cardData) => {
  const card = new Card(
    {
      name: cardData.name,
      link: cardData.link,
      cardId: cardData._id,
      likes: cardData.likes,
      userId: userId,
      ownerId: cardData.owner._id
    },
    '#element-template', 
    handleCardClick,
//    handleCardDelete,
    () => popupConfirmDelete.open(card),
    () => {
      return api
        .addLike(cardData)
        .then((res) => {
          card.setLikesCount(res);
          card.addLike();
        })
        .catch((err) => {
          console.log('Ошибка: ' + err);
        })
      },
    () => {
      return api
        .deleteLike(cardData)
        .then((res) => {
          card.setLikesCount(res);
          card.removeLike();
        })
        .catch((err) => {
          console.log('Ошибка: ' + err);
        })    
    }
  );
  
  return card.createCardElement();
};

//  Создаем экземпляр секции (рендеринг карточки)  //
const cardsSection = new Section( 
  {
    renderer: (cardData) => {
      cardsSection.addItem(createCard(cardData));
    }
  },
  '.elements'
);

//  Обрабатываем клик по кнопке сохранения новой карточки места  //
//  Перед обработкой вызова по API показываем пользователю UX-текст  //
const handleFormAddPlaceSubmit = (cardData) => {
  popupNewPlace.renderLoading(true);
  api
    .addCard(cardData)
    .then((card) => {
      cardsSection.addItem(createCard(card));
      popupNewPlace.close();
    })
    .catch((err) => {
      console.log('Ошибка: ' + err);
    })
    .finally(() => {
      popupNewPlace.renderLoading(false);
    });
};

//  Создаем экземпляр попапа с формой для добавления карточки места  //
const popupNewPlace = new PopupWithForm('#popupAddPlace', handleFormAddPlaceSubmit);
popupNewPlace.setEventListeners();

//  Обрабатываем клик по кнопке удаления карточки места  //
const handlePopupConfirmSubmit = (card) => {
  popupConfirmDelete.renderLoading(true);
    api
      .deleteCard(card._cardId)
      .then(() => {
        card.deleteCard();
        popupConfirmDelete.close();
      })
      .catch((err) => console.log('Ошибка: ' + err))
      .finally(() => {
        popupConfirmDelete.renderLoading(false);
      });
};

//  Создаем экземпляр попапа с кнопкой для подтверждения удаления карточки места  //
const popupConfirmDelete = new PopupWithConfirm('#popupConfirmDeletePlace', handlePopupConfirmSubmit);
popupConfirmDelete.setEventListeners();

//  Создаем экземпляр класса UserInfo с данными профиля  //
const profileInfo = new UserInfo('.profile__name', '.profile__job','.profile__avatar');


//  Обрабатываем сохранение данных профиля, забираем данные по API  //
//  Перед обработкой вызова по API показываем пользователю UX-текст  //
const handleFormProfileSubmit = (userInfo) => {
  popupProfile.renderLoading(true);
  return api
    .setProfile(userInfo)
    .then((res) => {
      profileInfo.setUserInfo(res);
      popupProfile.close();
    })
    .catch((err) => console.log('Ошибка: ' + err))
    .finally(() => {
      popupProfile.renderLoading(false);
    });
};

//  Создаем экземпляр попапа профиля  //
const popupProfile = new PopupWithForm('#popupProfile', handleFormProfileSubmit);
popupProfile.setEventListeners();


//  Обрабатываем сохранение аватара профиля, забираем данные по API  //
//  Перед обработкой вызова по API показываем пользователю UX-текст  //
const handleFormAvatarSubmit = (obj) => {
  popupAvatar.renderLoading(true);
  return api
    .setAvatar(obj)
    .then((link) => {
      profileInfo.setUserInfo(link);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log('Ошибка: ' + err);
    })
    .finally(() => {
      popupAvatar.renderLoading(false);
    });
};

const popupAvatar = new PopupWithForm(popupEditAvatar, handleFormAvatarSubmit);
popupAvatar.setEventListeners();

//  Получаем значение userId и карточки для этого юзера через API (промисом)  //
Promise.all([api.getCards(), api.getProfile()])
  .then(([initialCards, userInfo]) => {
    userId = userInfo._id;
    cardsSection.renderItems(initialCards.reverse());
    profileInfo.setUserInfo(userInfo);
  })

  .catch((err) => {
    console.log('Ошибка: ' + err);
  });


//  Включаем валидацию  //
const activateValidation = () => {
  const formList = Array.from(document.querySelectorAll(validateConfig.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(validateConfig, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

//  Подключаем слушатели на кнопки в профиле  //
//  Редактирование профиля - ревьюер предлагает через деструктуризацию  //
btnEdit.addEventListener("click", () => {
  const userInfo = profileInfo.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.about;
  formValidators["profileEdit"].resetValidation();
  popupProfile.open();
});

//  Добавление новой карточки места  //
btnAdd.addEventListener("click", () => {
  formValidators["addPlace"].resetValidation();
  popupNewPlace.open();
});

//  Замена аватара пользователя  //
btnEditAvatar.addEventListener("click", () => {
  formValidators["editAvatar"].resetValidation();
  popupAvatar.open();
});

//  Вызываем валидацию  //
activateValidation();