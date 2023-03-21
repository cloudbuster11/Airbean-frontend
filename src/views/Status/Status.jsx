import { useNavigate } from 'react-router-dom';

import OrderStatus from '../../components/OrderStatus/OrderStatus';

import './Status.scss';

export default function Status() {
  const navigate = useNavigate();

  return (
    <main className='container status'>
      <OrderStatus order={sessionStorage.currentOrder} />

      <button className='status__button' onClick={() => { navigate(-1) }}>
        Ok, cool!
      </button>
    </main>
  );
}
