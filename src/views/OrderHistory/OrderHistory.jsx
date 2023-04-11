import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getOrderHistory } from '../../helpers/api';

import Nav from '../../components/Nav/Nav';
import Cart from '../../components/Cart/Cart';
import Header from '../../components/Header/Header';
import OrderItem from './OrderItem/OrderItem';
import OrderTotal from './OrderItem/OrderTotal/OrderTotal';
import './OrderHistory.scss';

export default function OrderHistory() {
  const navigate = useNavigate();

  const [orderHistory, setOrderHistory] = useState();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userName = useSelector((state) => state.user.userName);
  const imgUrl = useSelector((state) => state.user.imgUrl);

  const userImg = `https://www.airbean.joakimtrulsson.se/public/img/users/${imgUrl}`;

  useEffect(() => {
    {
      isAuthenticated && getData();
    }
    {
      !isAuthenticated && navigate('/userform');
    }
  }, []);

  const getData = async () => {
    const result = await getOrderHistory();
    if (result.status === 'success') {
      setOrderHistory(result.data.allDocs);
    } else {
      console.log('Orderhistory.js', result);
    }
  };

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
        <Cart />
      </Header>
      <main className='orderhistory'>
        <img className='orderhistory__profile' src={userImg}></img>
        <h3 className='orderhistory__name'>{userName}</h3>
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
