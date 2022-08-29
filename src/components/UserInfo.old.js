//  Класс UserInfo. Управление инфо профиля пользователя  //

export default class UserInfo {
    constructor(profileName, profileJob, profileAvatar) {
      this._name = document.querySelector(profileName);
      this._job = document.querySelector(profileJob);
      this._avatar = document.querySelector(profileAvatar);

    }

 //  Возвращаем данные профиля, втч ссылку на аватар  //    
    getUserInfo() {    
      this._userInfo = {
          name: this._name.textContent,
          about: this._job.textContent,
          avatar: this._avatar.src
      };
      return this._userInfo;
    }

//  Заполняем поля данными профиля c сервера и подгружаем аватар  //
//  По совету ревьюера делаем через деструктуризацию  //

    setUserInfo({ name, about, avatar, _id }) {
      this._name.textContent = name;
      this._job.textContent = about;
  
      if (_id) {
        this._id = _id;
      }
  
      if (avatar) {
        this._avatar.src = avatar;
        this._avatar.alt = name;
        this._avatar.title = name;
      }
    }

}