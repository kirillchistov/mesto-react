//  Импортируем библиотеки  //
import React, {useState, useEffect} from 'react'

//  Импортируем комоненты API и карточки  //
import { api } from '../utils/api';
import Card from './Card';
/* import userAvatar from '../images/avatar.jpg'; */

//  Вызываем хуки для работы с профилем и карточками  //

const Main = ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) => {
  const [userAvatar, setUserAvatar] = useState('');
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getProfile()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .getCards()
      .then((res) => setCards(...cards, res))
      .catch((err) => console.log(err));
  }, []);

//  Возвращаем JSX-код блока main  //
//  В галерею карточек вставляем массив карточек с сервера  //

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image">
          <img className="profile__avatar" src={userAvatar} alt="Аватар" title="Аватар" />
          <div className="profile__avatar-edit" onClick={onEditAvatar}></div>
        </div>

        <div className="profile__info">
          <div className="profile__user">
            <h1 className="profile__name">{userName}</h1>
            <button className="profile__button profile__button-edit" type="button" 
              onClick={onEditProfile} aria-label="Редактировать профиль"></button>
          </div>
          <p className="profile__job">{userDescription}</p>
        </div>
        <button className="profile__button profile__button-add" type="button"
          onClick={onAddPlace} aria-label="Добавить место"></button>
      </section>

      <section className="gallery">
        <ul className="elements">
          {cards.map((card) => (
            <Card name={card.name} key={card._id} link={card.link}
              likesCount={card.likes.length} onCardClick={onCardClick} card={card} />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;