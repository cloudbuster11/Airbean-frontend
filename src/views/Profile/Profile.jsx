import { useState } from 'react';

import ProfileForm from '../../components/ProfileForm/ProfileForm';
import OrderHistory from '../../components/OrderHistory/OrderHistory';

import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import './Profile.scss';

export default function Profile() {
  const [token, setToken] = useState(sessionStorage.token);
  const [displaySignUp, setDisplaySignUp] = useState(false);

  const createRequest = (data) => {
    return {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
  };

  const login = async (userData) => {
    const url = 'https://airbean.awesomo.dev/api/user/login';

    try {
      const resp = await fetch(url, createRequest(userData));
      const data = await resp.json();
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('username', userData.username);
      setToken(data.token);
    } catch (err) {
      console.error(err);
    }
  };

  const signUp = async (userData) => {
    const url = 'https://airbean.awesomo.dev/api/user/signup';

    try {
      const resp = await fetch(url, createRequest(userData));
      const data = await resp.json();
      setDisplaySignUp(false);
    } catch (err) {
      console.error(err);
    }
  };

  const loginForm = (
    <ProfileForm
      title='Logga in nedan för att se din orderhistorik.'
      button='Logga in'
      handler={login}
      key='login'
    >
      <p className='form__changeview'>
        Inget konto än? Skapa ett{' '}
        <span className='form__link' onClick={() => setDisplaySignUp(true)}>
          här
        </span>
      </p>
    </ProfileForm>
  );

  const signUpForm = (
    <ProfileForm
      title='Genom att skapa ett konto nedan kan du spara och se din orderhistorik.'
      button='Skapa konto'
      handler={signUp}
      key='signUp'
    >
      <p className='form__changeview'>
        Redan medlem? Logga in{' '}
        <span className='form__link' onClick={() => setDisplaySignUp(false)}>
          här
        </span>
      </p>
    </ProfileForm>
  );

  return (
    <main className='container profile'>
      <Header>
        <Nav />
      </Header>

      {token ? <OrderHistory /> : !displaySignUp ? loginForm : signUpForm}
    </main>
  );
}
