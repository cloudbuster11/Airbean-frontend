export default function ProductHandeling({ products, handleOpenModal }) {
  const productItem = products.map((product) => {
    return (
      <tr key={product._id}>
        <td>{product.title}</td>
        <td>{product.price} kr</td>
        <td>
          <button
            className='button__small'
            onClick={(e) => {
              handleOpenModal(e, product);
            }}
          >
            Redigera
          </button>
        </td>
      </tr>
    );
  });

  return (
    <section className='tool__container'>
      <button
        className='button__large'
        id='tool__add'
        onClick={(e) => {
          handleOpenModal(e, { title: '', desc: '', price: '' });
        }}
      >
        Lägg till produkt
      </button>
      <table className='tool__table'>
        <thead>
          <tr>
            <th>Produktnamn</th>
            <th>Pris</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productItem.length > 0 ? (
            productItem
          ) : (
            <tr>
              <td colSpan='3'>Inga produkter hittades</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
