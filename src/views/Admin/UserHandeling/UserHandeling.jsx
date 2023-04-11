export default function UserHandeling({ users, handleOpenModal }) {
  const userRows = users.map((user) => {
    return (
      <tr className='tool__tablerow' key={user._id}>
        <td className='user-email'>{user.email}</td>
        <td>{user.role}</td>
        <td>
          <button
            className='button__small'
            onClick={(e) => {
              handleOpenModal(e, user);
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
      <table>
        <thead>
          <tr className='tool__tableheader'>
            <th>Email</th>
            <th>Roll</th>
            <th>Redigera</th>
          </tr>
        </thead>
        <tbody>{userRows}</tbody>
      </table>
    </section>
  );
}
