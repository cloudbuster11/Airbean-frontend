import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { clearCart } from '../../../actions/cartActions';
import { getCheckoutSession } from '../../../helpers/api';

import CartListItem from './CartListItem/CartListItem';

import './CartList.scss';

export default function CartList({ items, show }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = sessionStorage.token;

  const sum = items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  const totalSum = sum;

  const placeOrder = async () => {
    let order = items.map((product) => {
      return { _id: product._id, quantity: product.quantity };
    });

    const response = await getCheckoutSession(JSON.stringify(order));

    if (response.status === 'success') {
      sessionStorage.setItem('currenOrder', response.session.id);
      window.location.href = response.session.url;
    }
  };

  if (show)
    return (
      <article className='cart-list' style={{ zIndex: show && 5 }}>
        <h2>Din beställning</h2>

        <section className='cart-list__products'>
          {items.map((item) => (
            <CartListItem item={item} key={item._id} />
          ))}
        </section>

        <article className='cart-list__total'>
          <header>
            <h3>Total</h3>
            <div className='cart-list__divider cart-list__divider--total' />
            <h3>{totalSum} kr</h3>
          </header>

          <p>inkl moms + drönarleverans</p>
        </article>

        <button className='cart-list__button' onClick={() => items.length && placeOrder()}>
          Ta mina pengar!
        </button>
      </article>
    );
}
