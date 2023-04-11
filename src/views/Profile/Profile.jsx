import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getUserData } from '../../helpers/api';
import { USERIMAGE, CHANGEPASSWORD, REVIEWS, REMOVEUSER, CHANGENAME } from '../../helpers/constants';

import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import Cart from '../../components/Cart/Cart';
import UploadImg from './UploadImg/UploadImg';
import ChangePassWordForm from './ChangePasswordForm/ChangePassWordForm';
import Reviews from '../../components/Reviews/Reviews';
import DeactivateUser from './DeactivateUser/DeactivateUser';
import ChangeName from './ChangeName/ChangeName';

import './Profile.scss';

export default function Profile() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [activeComponentType, setActiveComponentType] = useState();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const usersName = useSelector((state) => state.user.name);
  const imgUrl = useSelector((state) => state.user.imgUrl);

  const BASE_URL = `https://www.airbean.joakimtrulsson.se/public/img/users`;

  useEffect(() => {
    {
      isAuthenticated && getData();
    }
    {
      !isAuthenticated && navigate('/userform');
    }
  }, []);

  async function getData() {
    const data = await getUserData();
    if (data.status === 'success') {
      setUserData(data.data.doc);
    } else {
      console.log('Profile.js', data);
    }
  }

  function toggleActiveComponentType(e, component) {
    e.preventDefault();
    setActiveComponentType(component);
  }

  return (
    <main className='container profile'>
      <Header>
        <Nav />
        <Cart />
      </Header>

      <article className='profile__container'>
        <h1 className='profile__title'>Profil</h1>
        <img className='profile__img' src={`${BASE_URL}/${imgUrl}`}></img>
        <p className='profile__username'>{usersName}</p>
        <section className='profile__uploadform'>
          {activeComponentType !== USERIMAGE && (
            <button className='button__large' onClick={(e) => toggleActiveComponentType(e, USERIMAGE)}>
              Ladda upp ny bild
            </button>
          )}

          {activeComponentType === USERIMAGE && (
            <UploadImg getData={getData}>
              <p className='profile__hide' onClick={(e) => toggleActiveComponentType(e)}>
                Dölj
              </p>
            </UploadImg>
          )}
        </section>

        <section className='profile__changename'>
          {activeComponentType !== CHANGENAME && (
            <button className='button__large' onClick={(e) => toggleActiveComponentType(e, CHANGENAME)}>
              Ändra namn
            </button>
          )}
          {activeComponentType === CHANGENAME && (
            <ChangeName getData={getData}>
              <p className='profile__hide' onClick={(e) => toggleActiveComponentType(e)}>
                Dölj
              </p>
            </ChangeName>
          )}
        </section>

        <section className='profile__updatepassword'>
          {activeComponentType !== CHANGEPASSWORD && (
            <button className='button__large' onClick={(e) => toggleActiveComponentType(e, CHANGEPASSWORD)}>
              Ändra lösenord
            </button>
          )}
          {activeComponentType === CHANGEPASSWORD && (
            <ChangePassWordForm>
              <p className='profile__hide' onClick={(e) => toggleActiveComponentType(e)}>
                Dölj
              </p>
            </ChangePassWordForm>
          )}
        </section>

        <section className='profile__reviews'>
          {activeComponentType !== REVIEWS && (
            <button className='button__large' onClick={(e) => toggleActiveComponentType(e, REVIEWS)}>
              Dina recensioner
            </button>
          )}
          {activeComponentType === REVIEWS && (
            <Reviews userData={userData} getData={getData}>
              <p className='profile__hide' onClick={(e) => toggleActiveComponentType(e)}>
                Dölj
              </p>
            </Reviews>
          )}
        </section>

        <section className='profile__reviews'>
          {activeComponentType !== REMOVEUSER && (
            <button
              className='button__large profile__delete'
              onClick={(e) => toggleActiveComponentType(e, REMOVEUSER)}
            >
              Avaktivera konto
            </button>
          )}
          {activeComponentType === REMOVEUSER && (
            <DeactivateUser>
              <p className='profile__hide' onClick={(e) => toggleActiveComponentType(e)}>
                Dölj
              </p>
            </DeactivateUser>
          )}
        </section>
      </article>
    </main>
  );
}
