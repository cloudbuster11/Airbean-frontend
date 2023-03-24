import { useDispatch } from 'react-redux';
import { addProduct, removeProduct } from '../../../../actions/cartActions';

import './CartListItem.scss';

export default function CartListItem({ item }) {
  const dispatch = useDispatch();

  return (
    <article className='cart-list-item__product'>
      <aside>
        <h3 className='cart-list-item__title'>{item.title}</h3>
        <p className='cart-list-item__price'>{item.price * item.quantity} kr</p>
      </aside>

      <div className='cart-list-item__divider' />

      <aside>
        <p className='cart-list-item__quantity'>{item.quantity}</p>
      </aside>

      <aside className='cart-list-item__buttons'>
        <button className='cart-list-item__icon-button' onClick={() => dispatch(addProduct(item))}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </button>

        <button className='cart-list-item__icon-button' onClick={() => dispatch(removeProduct(item))}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </button>
      </aside>
    </article>
  );
}
