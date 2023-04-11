import { useState } from 'react';
import React from 'react';
import logoSmall from '../../../assets/logo_small.svg';

import './AuthForm.scss';

export default function AuthForm({ title, button, fields, handler, children }) {
  const [data, setData] = useState(() => {
    const fieldsData = fields.reduce((obj, field) => ({ ...obj, [field.name]: '' }), {});
    return fieldsData;
  });

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const submit = (event) => {
    event.preventDefault();
    handler(JSON.stringify(data));
  };

  return (
    <article className='authforms__container'>
      <img className='authforms__logo' src={logoSmall} alt='AirBean logo'></img>
      <h2 className='authforms__title'>Välkommen till AirBean-familjen!</h2>
      <p className='authforms__subtitle'>{title}</p>

      <form className='authforms__form' onSubmit={submit}>
        {fields.map((field) => (
          <React.Fragment key={field.name}>
            <label className='authforms__label'>{field.label}</label>
            <input
              className='input__large'
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={data[field.name]}
              onChange={handleChange}
            />
          </React.Fragment>
        ))}

        {children}

        <button className='button__large' type='submit'>
          {button}
        </button>
      </form>
    </article>
  );
}
