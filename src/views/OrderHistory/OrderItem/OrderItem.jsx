import './OrderItem.scss';

export default function OrderItem(props) {
  return (
    <article className='history'>
      <section className='history__left'>
        <p className='history__ordernr'>#{props.order._id}</p>
        <p>total ordersumma</p>
      </section>
      <section className='history__right'>
        <p>{props.order.createdAt.slice(0, 10)}</p>
        <p>
          {props.order.totalPrice}
          <span> kr</span>
        </p>
      </section>
    </article>
  );
}
