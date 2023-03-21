import './OrderItem.scss';

export default function OrderItem(props) {
  return (
    <article className='history'>
      <section className='history__left'>
        <p className='history__ordernr'>#{props.product.orderNr}</p>
        <p>total ordersumma</p>
      </section>
      <section className='history__right'>
        <p>{props.product.orderDate}</p>
        <p>
          {props.product.total}
          <span> kr</span>
        </p>
      </section>
    </article>
  );
}
