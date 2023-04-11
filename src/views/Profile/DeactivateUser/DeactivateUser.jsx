import { useDispatch } from 'react-redux';

import { clearUser } from '../../../slices/userSlice';
import { getSignOut } from '../../../helpers/api';

import { deleteMe } from '../../../helpers/api';

import './DeactivateUser.scss';

export default function DeactivateUser({ children }) {
  const dispatch = useDispatch();

  async function handleDeactivteUser(e) {
    e.preventDefault();
    const data = await deleteMe();
    if (data.success === 'success') {
      await getSignOut();
      dispatch(clearUser());
      window.location.href = '/';
    }
  }

  return (
    <section className='deactivate__container'>
      <h3 className='deactivate__title'>Avaktivera ditt konto?</h3>
      <button className='button__small button-warning' onClick={(e) => handleDeactivteUser(e)}>
        Kör!
      </button>
      {children}
    </section>
  );
}
