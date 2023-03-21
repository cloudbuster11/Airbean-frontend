import '../MenuItem/MenuItem.scss';

export default function MenuItem(props) {
  return (
    <article className='product'>

      <button className='product__addtocart' onClick={() => props.handleAddToCart(props.product)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>

      <section className='product__text'>
        <h3 className='product__title'>{props.product.title}</h3>
        <p className='product__desc'>{props.product.desc}</p>
      </section>

      <h3 className='product__price'>{props.product.price} kr</h3>
    </article>
  );
}
