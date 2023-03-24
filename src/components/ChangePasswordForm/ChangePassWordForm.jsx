import { useState } from 'react';
import { patchPassword } from '../../helpers/api';

import './ChangePassWordForm.scss';

export default function (props) {
  const [passwords, setPasswords] = useState({});

  const handleChange = (event) => {
    setPasswords({ ...passwords, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      passwords.passwordCurrent === undefined ||
      passwords.password === undefined ||
      passwords.passwordConfirm === undefined
    )
      return alert('Vänligen fyll i alla fält.');

    const data = await patchPassword(JSON.stringify(passwords));
    console.log(data);
    if (data.status === 'success') {
      alert('Ditt lösenord har nu blivit uppdaterat.');
      sessionStorage.setItem('token', data.token);
      setPasswords({});
      props.handleToggle('passwordForm');
    } else {
      alert('Vänligen kontrollera ditt lösenord, samt att du skrivit ditt nya lösenord korrekt.');
    }
  };

  return (
    <form className='changepassword'>
      <input
        name='passwordCurrent'
        className='changepassword__input'
        type='password'
        placeholder='Nuvarande lösenord'
        value={passwords.passwordCurrent}
        onChange={handleChange}
      />
      <input
        name='password'
        className='changepassword__input'
        type='password'
        placeholder='Nytt lösenord'
        value={passwords.password}
        onChange={handleChange}
      />
      <input
        name='passwordConfirm'
        className='changepassword__input'
        type='password'
        placeholder='Bekräfta lösenord'
        value={passwords.passwordConfirm}
        onChange={handleChange}
      />
      <button className='changepassword__submit' onClick={(event) => handleSubmit(event)}>
        Ändra lösenord
      </button>
    </form>
  );
}
