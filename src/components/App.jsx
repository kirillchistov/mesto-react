//  Импортируем библиотеки  //
import React from 'react';

//  Импортируем компоненты  //
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

//  Импортируем стили  //
import '../index.css';

//  Вызываем хуки  //
function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

//  Создаем императивные обработчики  //
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  };

  //  Возвращаем JSX-код страницы  //
  //  Вставляем компоненты Header, Main, Footer и экземпляры попапов  //
  //  Внутри main добавляем императивные обработчики  //
  //  PopupWithForm добавляем 3 раза с разными полями  //


  return (
  
    <div className="root">
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />
        <PopupWithForm title="Редактировать профиль" name="edit-profile" buttonText="Сохранить"
          isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <fieldset className="popup__fieldset" id="fieldsetProfileEdit">
            <label className="fpopup__label">
              <input className="popup__input popup__input_user_name"
                type="text" name="profileName" id="profile-name"
                placeholder="Введите имя пользователя" required
                minLength="2" maxLength="40" />
              <span className="popup__field-error profile-name-error">Введите имя пользователя</span>
            </label>
            <label className="popup__label">
              <input className="popup__input popup__input_user_job" type="text"
               name="profileJob" id="profile-job" placeholder="Профессия"
                required minLength="2" maxLength="200" />
              <span className="popup__field-error profile-job-error">Введите профиль пользователя</span>
            </label>
          </fieldset>
        </PopupWithForm>
        <PopupWithForm title="Новое место" name="add-place" buttonText="Сохранить"
          isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <fieldset className="popup__fieldset" id="fieldsetAddPlace">
            <label className="popup__label">
              <input className="popup__input popup__input_place_name" type="text"    
                id="new-card-title" name="name" placeholder="Название места" 
                required minLength="2" maxLength="30" />
              <span className="popup__field-error new-card-title-error"></span>
            </label>
            <label className="popup__label">
              <input className="popup__input popup__input_place_link" type="url"        
                id="new-card-source" name="link" placeholder="Ссылка на иллюстрацию" required />
              <span className="popup__field-error new-card-source-error"></span>
            </label>
          </fieldset>
        </PopupWithForm>
        <PopupWithForm title="Обновить аватар" name="edit-avatar" buttonText="Сохранить"
          isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <fieldset className="popup__fieldset" id="profileEditAvatarFieldset">
            <label className="popup__label">
              <input className="popup__input popup__input_avatar_url" type="url" id="edit-avatar-url"
                name="avatar" placeholder="Введите ссылку на аватар" required />
              <span className="popup__field-error edit-avatar-url-error"></span>
            </label>
          </fieldset>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
      </div>
    </div>
  );
}

export default App;