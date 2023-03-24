import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUserData } from '../../helpers/api';

import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import Cart from '../../components/Cart/Cart';
import './Profile.scss';
import UploadImg from '../../components/UploadImg/UploadImg';
import ChangePassWordForm from '../../components/ChangePasswordForm/ChangePassWordForm';

export default function Profile() {
  const [userData, setUserData] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = `https://www.airbean.joakimtrulsson.se/public/img/users/`;

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const data = await getUserData();
    console.log(data);
    if (data.status === 'success') {
      setUserData(data.data.doc);
    } else {
      navigate('/userform');
    }
  }

  function handleToggle(component) {
    if (component === 'imageForm') setShowUploadForm((current) => !current);
    if (component === 'passwordForm') setShowPasswordForm((current) => !current);
  }

  return (
    <main className='container profile'>
      <Header>
        <Nav />
        <Cart />
      </Header>

      <article className='profile__container'>
        <h1 className='profile__title'>Profil</h1>
        <img className='profile__img' src={`${BASE_URL}/${userData.photo}`}></img>
        {!showUploadForm && (
          <button className='profile__upload' onClick={() => handleToggle('imageForm')}>
            Ladda upp ny bild
          </button>
        )}
        {showUploadForm && <UploadImg getData={getData} />}
        {showUploadForm && <p onClick={() => handleToggle('imageForm')}>Avbryt</p>}

        {!showPasswordForm && (
          <button className='profile__upload' onClick={() => handleToggle('passwordForm')}>
            Ändra lösenord
          </button>
        )}
        {showPasswordForm && <ChangePassWordForm handleToggle={handleToggle} />}
        {showPasswordForm && <p onClick={() => handleToggle('passwordForm')}>Avbryt</p>}
        <section>
          <p>
            Namn: <span>{userData.name}</span>
          </p>
          <p>
            Epost: <span>{userData.email}</span>
          </p>

          <p>
            Användarnamn: <span>{userData.username}</span>
          </p>
        </section>
      </article>
    </main>
  );
}
