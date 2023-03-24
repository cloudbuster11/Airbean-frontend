import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { postLogin, postSignUp } from '../../helpers/api';

import LoginForm from '../../components/LoginForm/LoginForm';
import SignupForm from '../../components/SignUpForm/SignupForm';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';

import './UserForm.scss';

export default function UserForm() {
  const [token, setToken] = useState(sessionStorage.token);
  const [displaySignUp, setDisplaySignUp] = useState(false);
  const navigate = useNavigate();

  async function login(body) {
    const data = await postLogin(body);

    if (data.status === 'success') {
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('username', data.data.user.username);
      sessionStorage.setItem('photourl', data.data.user.photo);
      setToken(data.token);
      navigate('/menu');
    } else {
      alert('Fel användarnamn eller lösenord.');
    }
  }

  async function signUp(body) {
    const data = await postSignUp(body);
    if (data.status === 'success') {
      return navigate('/profile');
    } else if (data.status === 'fail') {
      return alert(`${data.message}`);
    }
  }

  // All props behövs inte längre
  const loginForm = (
    <LoginForm title='Logga in nedan för att beställa.' button='Logga in' handler={login} key='login'>
      <p className='form__changeview'>
        Inget konto än? Skapa ett{' '}
        <span className='form__link' onClick={() => setDisplaySignUp(true)}>
          här
        </span>
      </p>
    </LoginForm>
  );

  const signUpForm = (
    <SignupForm
      title='Genom att skapa ett konto nedan kan du börja beställa och se din orderstatus.'
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
    </SignupForm>
  );

  return (
    <main className='container profile'>
      <Header>
        <Nav />
      </Header>
      {!displaySignUp ? loginForm : signUpForm}
    </main>
  );
}
