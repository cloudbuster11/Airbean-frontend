import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setLatestOrderId } from '../../slices/userSlice';

import OrderStatus from './OrderStatus/OrderStatus';
import './Status.scss';

export default function Status() {
  const location = useLocation();
  const [sessionId, setSessionId] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('session_id');
    dispatch(
      setLatestOrderId({
        latestOrderId: id,
      })
    );
    setSessionId(id);
  }, [location.search]);

  return (
    <main className='container status'>
      <OrderStatus sessionId={sessionId} />

      <button
        className='status__button'
        onClick={() => {
          navigate('/orderhistory');
        }}
      >
        Ok, cool!
      </button>
    </main>
  );
}
