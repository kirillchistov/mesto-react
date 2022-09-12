//  Класс карточки места со счетчиком лайков  //
//  Импортируем библиотеку и объекты стейтов, контекста  //
import React, { useContext } from 'react'
//  Импортируем контекст пользователя  //
import CurrentUserContext from "../contexts/CurrentUserContext";
//  Не импортируем пока иконки лайка и удаления, т.к. они фоном кнопок  //


const Card = ({ link, name, likesCount, keyId, onCardClick, onCardLike, onCardDelete, card }) => {
  const user = useContext(CurrentUserContext)

  //  Обрабатываем клик по фото карточки  //
  /* function handleClick() {
    onCardClick({name, link});
  }
  */

  //  Обрабатываем лайк карточки  //
  /* function handleLikeClick() {
    onCardLike({card});
  }
  */

  //  Обрабатываем клик для удаления карточки  //
  /* function handleDeleteClick() {
    onCardDelete({card});
  }
  */

  //  Определяем, являемся ли мы владельцем текущей карточки  //
  const isOwn = card.owner._id === user._id;

  //  Создаём переменную, которую после зададим в `className` для кнопки удаления  //
  const cardDeleteButtonClassName = (
   `element__button-delete ${isOwn ? 'element__button-delete' : ''}`
  );

  //  Определяем, есть ли у карточки лайк, поставленный текущим пользователем  //
  const isLiked = card.likes.some((i) => i._id === user._id);

  //  Создаём переменную, которую после зададим в `className` для кнопки лайка  //
  const cardLikeButtonClassName = `element__button-like ${isLiked ? 'element__button-like_active' : ''}` 

  return (
    <li className="element" key={keyId}>
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