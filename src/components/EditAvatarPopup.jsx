import React, {useRef} from 'react';
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
    const inputRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateAvatar({
            avatar: inputRef.current.value,
        });
    }

    return (
        <PopupWithForm
            title="Обновить аватар" 
            name="edit-avatar" 
            buttonText="Сохранить"
            isOpen={isOpen} 
            onClose={onClose}
            onSubmit={handleSubmit}
        >
        <fieldset className="popup__fieldset" id="profileEditAvatarFieldset">
          <label className="popup__label">
            <input ref={inputRef} className="popup__input popup__input_avatar_url" 
                type="url" id="edit-avatar-url" name="avatar" required 
                placeholder="Введите ссылку на аватар" />
            <span className="popup__field-error edit-avatar-url-error"></span>
          </label>
        </fieldset>
        </PopupWithForm>
    );
};

export default EditAvatarPopup;