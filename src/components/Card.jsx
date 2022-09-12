//  Класс карточки места со счетчиком лайков  //
//  Импортируем библиотеку и объекты стейтов, контекста  //
import React, { useContext } from 'react'
//  Импортируем контекст пользователя  //
import CurrentUserContext from "../contexts/CurrentUserContext";
//  Не импортируем иконки лайка и удаления, т.к. они фоном кнопок  //


const Card = ({ link, name, likesCount, keyId, onCardClick, onCardLike, onCardDelete, card }) => {
  const user = useContext(CurrentUserContext)


  //  Определяем, являемся ли мы владельцем текущей карточки  //
  const isOwn = card.owner._id === user._id;

  //  Определяем, есть ли у карточки лайк, поставленный текущим пользователем  //
  const isLiked = card.likes.some((i) => i._id === user._id);

  return (
    <li className="element">
      {isOwn && (
        <button
          type="button"
          className="element__button-delete"
          onClick={() => onCardDelete(card)}></button>
      )}
      <img className="element__image" src={link} alt={name} title={name} onClick={() => onCardClick(card)} />
      <h2 className="element__title">{name}</h2>
      <div className="element__like-container">
        <button className={`element__button-like ${isLiked && "element__button-like_active"}`}
            onClick={() => { onCardLike(card); }}
            type="button" aria-label="Поставить лайк"></button>
        <p className="element__likes-count">{likesCount}</p>
      </div>
    </li>
  );
};

export default Card;