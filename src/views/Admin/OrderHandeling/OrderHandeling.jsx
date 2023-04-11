export default function OrderHandeling({ orders, handleOpenModal }) {
  const orderItem = orders.map((order) => {
    const localTime = new Date(order.createdAt).toLocaleString().split(',')[0];

    return (
      <tr key={order._id}>
        <td>{order.user.username}</td>
        <td>{localTime}</td>
        <td>{order.totalPrice}</td>
        <td>
          <button
            className='button__small'
            onClick={(e) => {
              handleOpenModal(e, order);
            }}
          >
            Visa
          </button>
        </td>
      </tr>
    );
  });

  return (
    <section className='tool__container'>
      <table style={{ width: '300px' }}>
        <thead>
          <tr>
            <th>User</th>
            <th>Datum</th>
            <th>Summa</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{orderItem}</tbody>
      </table>
    </section>
  );
}
