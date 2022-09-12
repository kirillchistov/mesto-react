import React from 'react';
import PopupWithForm from './PopupWithForm';
import {useForm} from "../hooks/useForm";

function ConfirmationPopup() {
//   const {values, handleChange, setValues} = useForm({});  //
  return (
    <PopupWithForm name="confirm" title="Вы уверены?" buttonText="Да" >
      <input type="submit" value= "Да" className="popup__confirmation-button" />
    </PopupWithForm>
  )
}

export default ConfirmationPopup;