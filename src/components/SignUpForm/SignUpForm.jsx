import { useState } from 'react';
import logoSmall from '../../assets/logo_small.svg';

import './SignUpForm.scss';

export default function SignupForm({ title, button, handler, children }) {
  const [data, setData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const submit = (event) => {
    event.preventDefault();
    handler(JSON.stringify(data));
  };

  return (
    <article className='user'>
      <img className='user__logo' src={logoSmall}></img>
      <h2 className='user__title'>Välkommen till AirBean-familjen!</h2>
      <p className='user__subtitle'>{title}</p>

      <form className='form' onSubmit={submit}>
        <label className='form__label'>Användarnamn</label>
        <input
          className='form__input'
          name='username'
          type='text'
          placeholder='Användarnamn'
          value={data.username}
          onChange={handleChange}
        />

        <label className='form__label'>Namn</label>
        <input
          className='form__input'
          name='name'
          type='text'
          placeholder='Namn'
          value={data.name}
          onChange={handleChange}
        />

        <label className='form__label'>Email</label>
        <input
          className='form__input'
          name='email'
          type='text'
          placeholder='Email'
          value={data.email}
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

        <label className='form__label'>Bekräfa lösenord</label>
        <input
          className='form__input'
          name='passwordConfirm'
          type='password'
          placeholder='Bekräfta lösenord'
          value={data.passwordConfirm}
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
