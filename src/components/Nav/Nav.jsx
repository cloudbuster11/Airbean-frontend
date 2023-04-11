import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Nav.scss';
import SignOutButton from './SignOutButton/SignOutButton';

export default function Nav() {
  const [show, setShow] = useState(false);

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const isAdmin = useSelector((state) => state.user.role);
  const latestOrderId = useSelector((state) => state.user.latestOrderId);

  return (
    <>
      <nav className={'nav ' + (show ? 'nav--show-nav' : '')}>
        <NavLink to='/menu' className={({ isActive }) => (isActive ? 'nav__active' : 'nav__inactive')}>
          <h2>Meny</h2>
        </NavLink>

        <hr className='nav__solid' />

        <NavLink to='/about' className={({ isActive }) => (isActive ? 'nav__active' : 'nav__inactive')}>
          <h2>Vårt Kaffe</h2>
        </NavLink>

        <hr className='nav__solid' />

        <NavLink to='/profile' className={({ isActive }) => (isActive ? 'nav__active' : 'nav__inactive')}>
          <h2>Min profil</h2>
        </NavLink>

        <hr className='nav__solid' />

        <NavLink
          to='/orderhistory'
          className={({ isActive }) => (isActive ? 'nav__active' : 'nav__inactive')}
        >
          <h2>Orderhistorik</h2>
        </NavLink>

        <hr className='nav__solid' />

        <NavLink
          to={`/status?session_id=${latestOrderId}`}
          className={({ isActive }) => (isActive ? 'nav__active' : 'nav__inactive')}
        >
          <h2>Orderstatus</h2>
        </NavLink>

        {isAdmin === 'admin' && <hr className='nav__solid' />}

        {isAdmin === 'admin' && (
          <NavLink to='/admin' className={({ isActive }) => (isActive ? 'nav__active' : 'nav__inactive')}>
            <h2>Admin</h2>
          </NavLink>
        )}

        <hr className='nav__solid' />

        {isAuthenticated && <SignOutButton />}

        {isAuthenticated && <hr className='nav__solid' />}
      </nav>

      <button className='nav__btn' onClick={() => setShow(!show)}>
        {show ? (
          <svg
            width='52'
            height='52'
            version='1.1'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            x='0px'
            y='0px'
            viewBox='0 0 62 64'
            xmlSpace='preserve'
          >
            <path
              d='M35.2,32L59.6,7.6c0.9-0.9,0.9-2.3,0-3.2c-0.9-0.9-2.3-0.9-3.2,0L32,28.8L7.6,4.4c-0.9-0.9-2.3-0.9-3.2,0
            c-0.9,0.9-0.9,2.3,0,3.2L28.8,32L4.4,56.4c-0.9,0.9-0.9,2.3,0,3.2c0.4,0.4,1,0.7,1.6,0.7c0.6,0,1.2-0.2,1.6-0.7L32,35.2l24.4,24.4
            c0.4,0.4,1,0.7,1.6,0.7c0.6,0,1.2-0.2,1.6-0.7c0.9-0.9,0.9-2.3,0-3.2L35.2,32z'
            />
          </svg>
        ) : (
          <svg
            width='52'
            height='52'
            version='1.1'
            id='lni_lni-menu'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            x='0px'
            y='0px'
            viewBox='0 0 64 64'
            xmlSpace='preserve'
          >
            <g>
              <path d='M60,29.8H4c-1.2,0-2.3,1-2.3,2.3c0,1.2,1,2.3,2.3,2.3h56c1.2,0,2.3-1,2.3-2.3C62.3,30.8,61.2,29.8,60,29.8z' />
              <path d='M60,46.8H4c-1.2,0-2.3,1-2.3,2.3s1,2.3,2.3,2.3h56c1.2,0,2.3-1,2.3-2.3S61.2,46.8,60,46.8z' />
              <path d='M4,17.2h56c1.2,0,2.3-1,2.3-2.3s-1-2.3-2.3-2.3H4c-1.2,0-2.3,1-2.3,2.3S2.8,17.2,4,17.2z' />
            </g>
          </svg>
        )}
      </button>
    </>
  );
}
