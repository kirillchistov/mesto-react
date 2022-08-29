//  Класс карточки места со счетчиком лайков  //

import React from 'react';

const Card = ({ link, name, likesCount, onCardClick, card }) => {
  return (
    <li className="element">
      <button className="element__button-delete" type="button"></button>
      <img className="element__image" src={link} alt={name} title={name} onClick={() => onCardClick(card)} />
      <h2 className="element__title">{name}</h2>
      <div className="element__like-container">
        <button className="element__button-like" type="button" aria-label="Поставить лайк"></button>
        <p className="element__likes-count">{likesCount}</p>
      </div>
    </li>
  );
};

export default Card;