import { useState } from 'react';
import logoSmall from '../../assets/logo_small.svg';

import './ProfileForm.scss';

export default function ProfileForm({ title, button, handler, children }) {
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const submit = (event) => {
    event.preventDefault();
    handler(data);
  };

  return (
    <article className='user'>
      <img className='user__logo' src={logoSmall}></img>
      <h2 className='user__title'>Välkommen till AirBean-familjen!</h2>
      <p className='user__subtitle'>{title}</p>

      <form className='form' onSubmit={submit}>
        <label className='form__label'>Namn</label>
        <input
          className='form__input'
          name='username'
          type='text'
          placeholder='Användarnamn'
          value={data.username}
          onChange={handleChange}
        />

        <label className='form__label'>Lösenord</label>
        <input
          className='form__input'
          name='password'
          type='password'
          placeholder='Lösenord'
          value={data.password}
          onChange={handleChange}
        />

        {children}

        <button className='form__submit' type='submit'>
          {button}
        </button>
      </form>
    </article>
  );
}
