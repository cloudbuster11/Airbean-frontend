import { useState } from 'react';

import { USER, PRODUCT, ORDER } from '../../helpers/constants';

import './Modal.scss';

export default function Modal({ selectedData, handleClickClose, handleSubmit, handleDelete }) {
  const [newData, setNewData] = useState(selectedData);
  const isDataEmpty = !Object.values(selectedData).some((x) => x !== null && x !== '');

  let dataCategory;
  let elements;

  const handleInputChange = (event) => {
    let newValue = event.target.value;
    if (event.target.name === 'price') newValue = +newValue;
    setNewData({ ...newData, [event.target.name]: newValue });
  };

  const editFooter = (
    <footer className='modal__footer'>
      <button className='button__small' onClick={(e) => handleSubmit(e, newData, dataCategory)}>
        Spara
      </button>
      <button className='button__small' onClick={(e) => handleClickClose(e)}>
        Avbryt
      </button>
      {newData && !isDataEmpty && (
        <button
          className='button__small button-warning'
          onClick={(e) => handleDelete(e, newData._id, dataCategory)}
        >
          Radera
        </button>
      )}
    </footer>
  );

  const addFooter = (
    <footer className='modal__footer'>
      <button className='button__small' onClick={(e) => handleClickClose(e)}>
        Ok
      </button>
      {newData && (
        <button
          className='button__small button-warning'
          onClick={(e) => handleDelete(e, newData._id, dataCategory)}
        >
          Radera
        </button>
      )}
    </footer>
  );

  let footerToDisplay = editFooter;

  if (newData.hasOwnProperty('price')) {
    dataCategory = PRODUCT;
    elements = (
      <form>
        <label htmlFor='title'>Titel</label>
        <input
          className='input__xlarge'
          type='text'
          name='title'
          value={newData.title}
          placeholder='Title'
          onChange={handleInputChange}
        />
        <label htmlFor='desc'>Produktbeskrivning</label>
        <textarea
          className='input__xlarge text__area'
          rows='5'
          name='desc'
          type='text'
          maxLength={50}
          value={newData.desc}
          placeholder='Beskrivning'
          onChange={handleInputChange}
        ></textarea>
        <label htmlFor='price'>Pris</label>
        <input
          className='input__xlarge'
          type='number'
          name='price'
          value={newData.price}
          placeholder='Pris'
          onChange={handleInputChange}
        />
      </form>
    );
  }

  if (newData.hasOwnProperty('username')) {
    dataCategory = USER;
    elements = (
      <>
        <form>
          <label htmlFor='username'>Användarnamn</label>
          <input
            className='input__xlarge'
            type='text'
            name='username'
            value={newData.username}
            placeholder={newData.username}
            onChange={handleInputChange}
          />
          <label htmlFor='email'>Email</label>
          <input
            className='input__xlarge'
            type='text'
            name='email'
            value={newData.email}
            placeholder={newData.email}
            onChange={handleInputChange}
          />
          <label htmlFor='name'>Namn</label>
          <input
            className='input__xlarge'
            type='text'
            name='name'
            value={newData.name}
            placeholder={newData.name}
            onChange={handleInputChange}
          />
          <label htmlFor='photo'>Profilbild</label>
          <input
            className='input__xlarge'
            type='text'
            name='photo'
            value={newData.photo}
            placeholder={newData.photo}
            onChange={handleInputChange}
          />
          <label htmlFor='role'>Användarroll</label>
          <select className='input__xlarge' onChange={handleInputChange} name='role' id='role'>
            <option value={newData.role}>{newData.role}</option>
            <option value={newData.role === 'admin' ? 'user' : 'admin'}>
              {newData.role === 'admin' ? 'user' : 'admin'}
            </option>
          </select>
        </form>
      </>
    );
  }

  if (newData.hasOwnProperty('paymentId')) {
    dataCategory = ORDER;
    footerToDisplay = addFooter;
    const localTime = new Date(newData.createdAt).toLocaleString().split(',')[0];

    elements = (
      <table key={newData._id}>
        <tbody>
          <tr>
            <td>Användarnamn:</td>
            <td>{newData.user.username}</td>
          </tr>
          <tr>
            <td>Skapad:</td>
            <td>{localTime}</td>
          </tr>
          <tr>
            <td>Total Summa:</td>
            <td>{newData.totalPrice} kr</td>
          </tr>
          <tr>
            <td>Status:</td>
            <td>{newData.paymentId ? 'Betald' : 'Obetald'}</td>
          </tr>
          <tr>
            <td>
              <strong>Produkter</strong>
            </td>
            <td></td>
          </tr>
          {newData.products.map((product) => {
            return (
              <>
                <tr>
                  <td>Title:</td>
                  <td>{product.title}</td>
                </tr>
                <tr>
                  <td>Pris:</td>
                  <td>{product.price}</td>
                </tr>
                <tr>
                  <td>Antal:</td>
                  <td>{product.quantity}</td>
                </tr>
                <tr>
                  <td>Summa:</td>
                  <td>{product.totalProductPrice}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <div className='modal__container'>
      <section className='modal__content'>
        <header className='modal__header'>
          {!isDataEmpty ? <h3>Hantera</h3> : <h3>Lägg till produkt</h3>}
          {!isDataEmpty && (
            <p>
              Id: <span>{newData._id}</span>
            </p>
          )}
        </header>
        <main className='modal__body'>{elements}</main>
        {footerToDisplay}
      </section>
    </div>
  );
}
