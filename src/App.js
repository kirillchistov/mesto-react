import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="content">
      <section className="profile">
        <div className="profile__image">
          <img className="profile__avatar" src="<%=require('./images/avatar.jpg') %>" alt="Наив Кустов - исследователь океанариумов" />
          <div className="profile__avatar-edit"></div>
        </div>
        <div className="profile__info">
          <div className="profile__user">
            <h1 className="profile__name">Полив Кустов</h1>
            <button className="profile__button profile__button-edit" type="button" aria-label="Редактировать профиль"></button>         
          </div>
          <p className="profile__job">Исследователь дендрариумов</p>
        </div>
        <button className="profile__button profile__button-add" type="button" aria-label="Добавить место"></button>
      </section>

      <section className="gallery">
        <ul className="elements">


        </ul>
      </section>
    </div>
  );
}

export default App;
