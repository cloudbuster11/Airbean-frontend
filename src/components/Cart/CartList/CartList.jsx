import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { clearCart } from '../../../actions/cartActions';

import { postOrder } from '../../../helpers/api';

import CartListItem from './CartListItem/CartListItem';

import { getDiscounts } from '../../../helpers/discount';

import './CartList.scss';

export default function CartList({ items, show }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const discounts = getDiscounts(items);

  const sum =
    items.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

  const discount =
    discounts.reduce((acc, curr) => acc + (curr.reduction * curr.quantity), 0);

  const totalSum = sum - discount;

  const placeOrder = async () => {
    const order = items.flatMap((item) =>
      Array(item.quantity).fill(0).map(() => {
        return { 'name': item.title, 'price': item.price, }
      })
    );

    const data = await postOrder(order);

    if (data.message === 'invalid-token') {
      navigate('/profile');
    }

    if (data.orderNr) {
      dispatch(clearCart());
      sessionStorage.setItem('currentOrder', data.orderNr);
      navigate('/status');
    }
  }

  if (show) return (
    <article className='cart-list' style={{ zIndex: show && 5 }}>
      <h2>Din beställning</h2>

      <section className='cart-list__products'>
        {items.map((item) =>
          <CartListItem item={item} key={item.id} />
        )}

        {discounts.map((item) =>
          <CartListItem discount item={item} key={item.id} />
        )}
      </section>

      <article className='cart-list__total'>
        <header>
          <h3>Total</h3>
          <div className='cart-list__divider cart-list__divider--total' />
          <h3>{totalSum} kr</h3>
        </header>

        <p>inkl moms + drönarleverans</p>
      </article>

      <button className='cart-list__button' onClick={() => items.length && placeOrder()}>Take my money!</button>
    </article>
  );
}
