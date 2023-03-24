import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getOrderHistory } from '../../helpers/api';

import Nav from '../../components/Nav/Nav';
import Header from '../../components/Header/Header';
import OrderItem from './OrderItem/OrderItem';
import OrderTotal from './OrderItem/OrderTotal/OrderTotal';
import profileImg from '../../assets/profile_img.svg';
import './OrderHistory.scss';

export default function OrderHistory() {
  const [orderHistory, setOrderHistory] = useState();
  const navigate = useNavigate();
  const userImg = `https://www.airbean.joakimtrulsson.se/public/img/users/${sessionStorage.photourl}`;

  useEffect(() => {
    const getData = async () => {
      const results = await getOrderHistory();
      console.log(results);
      if (results.status === 'success') {
        setOrderHistory(results.data.allDocs);
      } else {
        navigate('/userform');
      }
    };

    getData();
  }, []);

  let orderList = {};
  if (orderHistory === undefined) return;
  else {
    orderList = orderHistory.map((order, id) => {
      return <OrderItem key={id} order={order} />;
    });
  }

  return (
    <main className='container orders'>
      <Header>
        <Nav />
      </Header>
      <main className='orderhistory'>
        <img className='orderhistory__profile' src={userImg}></img>
        <h3 className='orderhistory__name'>{sessionStorage.getItem('username')}</h3>
        <article className='orderhistory__stats'>
          <h3 className='orderhistory__subtitle'>Orderhistorik</h3>
          {orderHistory.length > 0 ? orderList : <p>Inga beställningar finns för den här användaren.</p>}
          <section className='orderhistory__total'>
            {orderHistory.length > 0 ? <OrderTotal orderHistory={orderHistory} /> : null}
          </section>
        </article>
      </main>
    </main>
  );
}
