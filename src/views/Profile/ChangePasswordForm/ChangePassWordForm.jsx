import { useState } from 'react';
import { patchPassword } from '../../../helpers/api';

import './ChangePassWordForm.scss';

export default function ({ children }) {
  const [passwords, setPasswords] = useState({
    passwordCurrent: '',
    password: '',
    passwordConfirm: '',
  });

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
    if (data.status === 'success') {
      alert('Ditt lösenord har nu blivit uppdaterat.');
      setPasswords({ passwordCurrent: '', password: '', passwordConfirm: '' });
    } else {
      alert('Vänligen kontrollera ditt lösenord, samt att du skrivit ditt nya lösenord korrekt.');
    }
  };

  return (
    <form className='changepassword'>
      <input
        name='passwordCurrent'
        className='input__small'
        type='password'
        placeholder='Nuvarande lösenord'
        value={passwords.passwordCurrent}
        onChange={handleChange}
      />
      <input
        name='password'
        className='input__small'
        type='password'
        placeholder='Nytt lösenord'
        value={passwords.password}
        onChange={handleChange}
      />
      <input
        name='passwordConfirm'
        className='input__small'
        type='password'
        placeholder='Bekräfta lösenord'
        value={passwords.passwordConfirm}
        onChange={handleChange}
      />
      <button className='button__large' onClick={(event) => handleSubmit(event)}>
        Ändra lösenord
      </button>
      {children}
    </form>
  );
}
