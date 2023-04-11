import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setName } from '../../../slices/userSlice';

import { updateMe } from '../../../helpers/api';

import './ChangeName.scss';

export default function ChangeName({ getData, children }) {
  const [newName, setNewName] = useState({
    name: '',
  });
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setNewName({ [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newName.name) return alert('Vänligen fyll i ditt namn.');

    const data = await updateMe(JSON.stringify(newName));
    if (data.status === 'success') {
      dispatch(setName(newName));
      getData();
    } else {
      alert('Vänligen kontrollera ditt lösenord, samt att du skrivit ditt nya lösenord korrekt.');
    }
  };

  return (
    <form className='changename__form'>
      <input
        name='name'
        className='input__small'
        type='text'
        placeholder='Nytt namn'
        value={name.name}
        onChange={handleChange}
      />

      <button className='button__large' onClick={(event) => handleSubmit(event)}>
        Ändra namn
      </button>
      {children}
    </form>
  );
}
