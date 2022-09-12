//  Импортируем библиотеки  //
import React, {useEffect, useState} from 'react'

//  Импортируем компоненты  //
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

//  Добавляем импорт отдельных попапов с формой  //
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

//  Импортируем API для доступа к серверу  //
import {api} from "../utils/api";

//  Импортируем контекст текущего пользователя  //
import CurrentUserContext from "../contexts/CurrentUserContext";

//  Импортируем стили  //
import '../index.css';

//  Вызываем хуки для открытия и закрытия попапов  //
function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  //  создаем стейт текущего пользователя и эффект при монтировании api.getUserInfo  //
  const [currentUser, setCurrentUser] = useState({});  

  //  Чтобы изменять локальный список карточек из попапа, нужно поднять стейт  //
  //  создаем стейт для работы с карточками  //
  //  переносим переменную и функцию  //
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);


  //  переносим эффект с API-запросом api.getCardList (getCards)  //
  const fetchCards = async () => {
    try {
        const res = await api.getCards();
        setCards(res);
    } catch (e) {
        console.warn(e)
    }
}

useEffect(() => {
  fetchCards();
}, [])


const handleAvatarUpdate = async (obj) => {
  try {
      const avatarChanged = await api.setAvatar(obj);
      setCurrentUser(avatarChanged);
      closeAllPopups();
  } catch (e) {
      console.warn(e)
  }
}

  //  Добавляем обработчик в соотв-вии с пропсом onUpdateUser компонента EditProfilePopup  //
  // Внутри этого обработчика вызовите api.setUserInfo  //
  // После завершения запроса обновите стейт currentUser из полученных данных и закройте все попапы  //
  const handleUpdateUser = async (obj) => {
    try {
      const changedProfile = await api.setProfile(obj);
      setCurrentUser(changedProfile);
      closeAllPopups();
    } catch (e) {
      console.warn(e);
    }
  }

const handleAddPlace = async (obj) => {
  try {
      const newPlace = await api.addCard(obj);
      setCards([newPlace, ...cards]);
      console.log(obj);
      console.log(currentUser);
      closeAllPopups();
  } catch (e) {
      console.warn(e)
  }
}

//  переносим обработчики handleCardLike и handleCardDelete. В Main передаем в виде пропсов  // 
const handleCardLike = async (card) => {
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  try {
      const resChangeLikeStatus = await api.changeLikeCardStatus(card, !isLiked);
      setCards((state) => state.map((c) => c._id === card._id ? resChangeLikeStatus : c));
  } catch (error) {
      console.warn(error);
  }
}

const handleCardDelete = async (card) => {
  try {
      await api.deleteCard(card);
      setCards((newArray) => newArray.filter((item) => card._id !== item._id))
      closeAllPopups();
  } catch (error) {
      console.warn(error);
  }
}


const fetchData = async () => {
  try {
      const profileObject = await api.getProfile();
      setCurrentUser(profileObject);
  } catch (error) {
      console.warn(error);
  }
}

useEffect(() => {
  fetchData()
}, [])




//  Создаем императивные обработчики для кнопок открытия попапов  //
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

  //  Закрываем все попапы  //
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  };

  //  Возвращаем JSX-код страницы  //
  //  Вставляем компоненты Header, Main, Footer и компоненты попапов  //
  //  Внутри Main добавляем императивные обработчики  //
  //  Оборачиваем JSX в провайдер контекста с currentUser  //
  //  Выносим JSX попапов в отдельные компоненты  //

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          closePopup={closeAllPopups}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlace}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleAvatarUpdate}
        />

        <ImagePopup 
          card={selectedCard} 
          onClose={closeAllPopups} 
          isOpen={isImagePopupOpen} 
        />

        <PopupWithForm
          title={'Вы уверены?'}
          name={'confirm'}
          btnText={'Да'} 
        >
        </PopupWithForm>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;