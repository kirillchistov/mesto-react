//  Импортируем библиотеки  //
import React from 'react';

//  Импортируем логотип для вставки в src  //
import logo from '../images/logo-white.svg';

//  Рендерим компонент JSX компонента шапки  //
const Header = () => {
  return (
    <header className="header">
      <a href="#">
        <img className="header__logo" src={logo} alt="Логотип проекта Место" />
      </a>
    </header>
  );
};

//  Экспортируем компонент  //
export default Header;
