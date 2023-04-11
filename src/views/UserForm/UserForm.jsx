import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  getUserData,
  postLogin,
  postSignUp,
  postForgotPassword,
  patchResetPassword,
} from '../../helpers/api';
import { setUser } from '../../slices/userSlice';

import { SIGNIN, SIGNUP, FORGOTPASSWORD } from '../../helpers/constants';

import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import LoginForm from './LoginForm/LoginForm';
import SignUpForm from './SignUpForm/SignUpForm';
import ForgetPasswordForm from './ForgotPasswordForm/ForgotPasswordForm';
import ResetPasswordForm from './ResetPasswordForm/ResetPasswordForm';

import './UserForm.scss';

export default function UserForm() {
  const [activeComponentType, setActiveComponentType] = useState(SIGNIN);
  const [resetToken, setResetToken] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = useCallback(
    async (body) => {
      try {
        const response = await postLogin(body);

        if (response.status === 'success') {
          dispatch(
            setUser({
              role: response.data.user.role,
              name: response.data.user.name,
              userName: response.data.user.username,
              email: response.data.user.email,
              imgUrl: response.data.user.photo,
            })
          );
          if (response.data.user.role === 'admin') {
            navigate('/admin');
          } else if (response.data.user.role === 'user') {
            navigate('/menu');
          }
        } else {
          alert('Fel användarnamn eller lösenord.');
        }
      } catch (error) {
        console.error(error);
      }
    },
    [navigate]
  );

  const signUp = useCallback(
    async (body) => {
      try {
        const data = await postSignUp(body);

        if (data.status === 'success') {
          return navigate('/profile');
        } else if (data.status === 'fail') {
          return alert(`${data.message}`);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [navigate]
  );

  const forgotPassword = useCallback(
    async (body) => {
      try {
        const data = await postForgotPassword(body);

        if (data.status === 'success') {
          alert('Ett återställningsmail har skickats. Kontrollera din inkorg.');
        } else if (data.success === false) {
          alert('Ingen användare med den epost adressen hittades.');
        }
      } catch (error) {
        console.error(error);
      }
    },
    [navigate]
  );

  const resetPassword = useCallback(
    async (body) => {
      try {
        const response = await patchResetPassword(body, resetToken);

        if (response.status === 'success') {
          dispatch(
            setUser({
              role: response.data.user.role,
              name: response.data.user.name,
              userName: response.data.user.username,
              email: response.data.user.email,
              imgUrl: response.data.user.photo,
            })
          );
          return navigate('/menu');
        } else if (response.success === false) {
          alert('Något gick fel. Vänligen kontrollera att dina lösenord matchar.');
        }
      } catch (error) {
        console.error(error);
      }
    },
    [resetToken]
  );

  function toggleActiveComponentType(e, component) {
    e.preventDefault();
    setActiveComponentType(component);
  }

  useEffect(() => {
    async function checkIfSignedIn() {
      try {
        const response = await getUserData();

        if (response.status === 'success') {
          dispatch(
            setUser({
              role: response.data.doc.role,
              name: response.data.doc.username,
              userName: response.data.doc.username,
              email: response.data.doc.email,
              imgUrl: response.data.doc.photo,
            })
          );
          if (response.data.doc.role === 'admin') {
            navigate('/admin');
          } else if (response.data.doc.role === 'user') {
            navigate('/menu');
          }
        } else if (response.status === 'fail') {
          setDisplaySignUp(false);
        }
      } catch (error) {
        console.error(error);
      }
    }

    checkIfSignedIn();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('reset_token');

    setResetToken(token);
  }, [location.search]);

  return (
    <main className='container userform'>
      <Header>
        <Nav />
      </Header>
      <section className='userform__container'>
        {activeComponentType === SIGNIN && !resetToken && (
          <LoginForm handler={login} toggleActiveComponentType={toggleActiveComponentType} />
        )}
        {activeComponentType === SIGNUP && (
          <SignUpForm handler={signUp} toggleActiveComponentType={toggleActiveComponentType} />
        )}
        {activeComponentType === FORGOTPASSWORD && !resetToken && (
          <ForgetPasswordForm
            handler={forgotPassword}
            toggleActiveComponentType={toggleActiveComponentType}
          />
        )}

        {activeComponentType !== FORGOTPASSWORD && !resetToken && (
          <p className='userform__link' onClick={(e) => toggleActiveComponentType(e, FORGOTPASSWORD)}>
            Jag har glömt mitt lösenord.
          </p>
        )}

        {resetToken && (
          <ResetPasswordForm handler={resetPassword} toggleActiveComponentType={toggleActiveComponentType} />
        )}
      </section>
    </main>
  );
}
