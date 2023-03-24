import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import OrderStatus from '../../components/OrderStatus/OrderStatus';
import { getOrderHistory } from '../../helpers/api';

import './Status.scss';

export default function Status() {
  const navigate = useNavigate();

  return (
    <main className='container status'>
      <OrderStatus />

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
