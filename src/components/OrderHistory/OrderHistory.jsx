import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getOrderHistory } from '../../helpers/api';

import OrderItem from './OrderItem/OrderItem';
import OrderTotal from './OrderItem/OrderTotal/OrderTotal';
import profileImg from '../../assets/profile_img.svg';
import './OrderHistory.scss';

export default function OrderHistory() {
  const [orderHistory, setOrderHistory] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const data = await getOrderHistory();

      if (data.message === 'invalid-token') {
        navigate('/profile');
      }

      if (data.success) {
        setOrderHistory(data);
      }
    };

    getData();
  }, []);

  let orderList = {};
  if (orderHistory === undefined) return;
  else {
    orderList = orderHistory.orderHistory.map((product, id) => {
      return <OrderItem key={id} product={product} />;
    });
  }

  return (
    <main className='orderhistory'>
      <img className='orderhistory__profile' src={profileImg}></img>
      <h3 className='orderhistory__name'>{sessionStorage.getItem('username')}</h3>
      <article className='orderhistory__stats'>
        <h3 className='orderhistory__subtitle'>Orderhistorik</h3>
        {orderHistory.success ? orderList : <p>Inga beställningar finns för den här användaren.</p>}
        <section className='orderhistory__total'>
          {orderHistory.success ? <OrderTotal orderHistory={orderHistory} /> : null}
        </section>
      </article>
    </main>
  );
}
