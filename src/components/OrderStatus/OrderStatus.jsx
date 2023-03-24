import { useState, useEffect } from 'react';

import { getOrderStatus } from '../../helpers/api';

import './OrderStatus.scss';
import Drone from '../../assets/drone.svg';

export default function OrderStatus() {
  const [order, setOrder] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getOrderStatus(sessionStorage.currentOrder);
        const latestOrder = await response;
        setOrder(latestOrder.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <article className='order-status'>
      {order && (
        <header>
          <p className='order-status__order-nr'>
            Ordernummer: <span>#{order.orderId}</span>
          </p>
        </header>
      )}

      <img className='order-status__drone' src={Drone} />

      <h2 className='order-status__status'>
        {order && order.eta > 0
          ? 'Din beställning är på väg!'
          : order
          ? 'Din beställning har anlänt!'
          : 'Ingen order lagd.'}
      </h2>

      {order && order.eta >= 0 && (
        <h3 className='order-status__eta'>
          <span>{order.eta}</span> minuter
        </h3>
      )}
    </article>
  );
}
