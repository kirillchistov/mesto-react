//  Отдельный компонент для редактирования попапа  //
//  Импортируем компоненты, состояния и контекст  //

import React, {useContext, useState, useEffect} from 'react';
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({isOpen, onClose, onUpdateUser}) => {
    //  Подписываемся на контекст  //
    const currentUser = useContext(CurrentUserContext);
    //  Cоздаем эффект для обновления стейта при изменении контекста  // 
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function handleSubmit(e) {
        //  Отключаем переход на другую страницу при отправке формы  //
        e.preventDefault();
        
        //  Передаём значения компонентов в обработчик  //
        onUpdateUser({
            name,
            about: description,
        });
    }      

    //  Обнуляем значения  //
    useEffect(() => {
        setName('');
        setDescription('');
    }, [isOpen])

    //  Присваеваем текущие значения полей, если не пустые  //
    useEffect(() => {
        if (currentUser.name && currentUser.about) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser])

    const onNameChange = (e) => {
        setName(e.target.value)
    }

    const onDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    return (
        <PopupWithForm
            name={'profile'}
            isOpen={isOpen}
            onClose={onClose}
            title={'Редактировать профиль'}
            buttonText={'Сохранить'}
            onSubmit={handleSubmit}
        >
            <fieldset className="popup__fieldset" id="fieldsetProfileEdit">
            <label className="fpopup__label">
                <input className="popup__input popup__input_user_name"
                type="text" name="profileName" id="profile-name" placeholder="Введите имя пользователя" 
                required minLength="2" maxLength="40" value={name} onChange={onNameChange} />
                <span className="popup__field-error profile-name-error">Введите имя пользователя</span>
            </label>
            <label className="popup__label">
                <input className="popup__input popup__input_user_job" type="text"
                name="profileJob" id="profile-job" placeholder="Профессия" required minLength="2" maxLength="200" 
                value={description} onChange={onDescriptionChange} />
                <span className="popup__field-error profile-job-error">Введите профиль пользователя</span>
            </label>
            </fieldset>
        </PopupWithForm>
    );
};

export default EditProfilePopup;