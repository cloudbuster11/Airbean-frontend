import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getOrder } from '../../helpers/api';

import './OrderStatus.scss';

import Drone from '../../assets/drone.svg';

export default function OrderStatus({ order }) {
  const [eta, setEta] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const data = await getOrder(order);

      if (data.message === 'invalid-token') {
        navigate('/profile');
      }

      if (data.eta) {
        setEta(data.eta)
      } else if (data.message) {
        sessionStorage.removeItem('currentOrder')
      }
    }

    if (order) getData();
  }, []);

  return (
    <article className='order-status'>
      {order &&
        <header>
          <p className='order-status__order-nr'>
            Ordernummer: <span>#{order}</span>
          </p>
        </header>
      }

      <img className='order-status__drone' src={Drone} />

      <h2 className='order-status__status'>
        {eta >= 0
          ? 'Din beställning är på väg!'
          : order
            ? 'Din beställning har anlänt!'
            : 'Ingen order lagd.'
        }
      </h2>

      {eta >= 0 &&
        <h3 className='order-status__eta'>
          <span>{eta}</span> minuter
        </h3>
      }
    </article>
  );
}
