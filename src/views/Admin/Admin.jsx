import { useState, useEffect } from 'react';

import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import Modal from '../../components/Modal/Modal';

import {
  getAllProducts,
  getAllUsers,
  getAllOrders,
  deleteOrder,
  postNewProduct,
  patchProduct,
  deleteProduct,
  patchUser,
  deleteUser,
} from '../../helpers/api';
import { USER, PRODUCT, ORDER, STATISTIC } from '../../helpers/constants';

import ProductHandeling from './ProductHandeling/ProductHandeling';
import OrderHandeling from './OrderHandeling/OrderHandeling';
import UserHandeling from './UserHandeling/UserHandeling';
import Statistic from './Statistic/Statistic';

import './Admin.scss';
export default function Admin() {
  const [activeComponentType, setActiveComponentType] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const allProducts = await getAllProducts();
      const allOrders = await getAllOrders();
      const allUsers = await getAllUsers();

      setData({
        product: allProducts.data.allDocs,
        order: allOrders.data.allDocs,
        user: allUsers.data.allDocs,
      });
    };

    getData();
  }, []);

  async function refreshData(apiCall, targetState, dataCategory) {
    const updatedData = await apiCall();
    if (updatedData.status === 'success') {
      targetState((prevData) => {
        return {
          ...prevData,
          [dataCategory]: updatedData.data.allDocs,
        };
      });
    }
  }

  function handleOpenModal(e, data) {
    e.preventDefault();
    setSelectedData(data);
    setShowModal(true);
  }

  function handleClickClose(e) {
    e.preventDefault();
    setShowModal(false);
  }

  async function handleDelete(e, id, dataCategory) {
    e.preventDefault();

    if (dataCategory === PRODUCT) {
      const response = await deleteProduct(id);
      if (response.status === 'success') refreshData(getAllProducts, setData, PRODUCT);
    }

    if (dataCategory === USER) {
      const response = await deleteUser(id);
      if (response.status === 'success') refreshData(getAllUsers, setData, USER);
    }

    if (dataCategory === ORDER) {
      const response = await deleteOrder(id);
      if (response.status === 'success') refreshData(getAllOrders, setData, ORDER);
    }

    setShowModal(false);
  }

  async function handleSubmit(e, data, dataCategory) {
    e.preventDefault();

    if (dataCategory === PRODUCT && !data.hasOwnProperty('_id')) {
      const response = await postNewProduct(JSON.stringify(data));
      if (response.status === 'success') refreshData(getAllProducts, setData, PRODUCT);
    }

    if (dataCategory === PRODUCT && data.hasOwnProperty('_id')) {
      const response = await patchProduct(JSON.stringify(data), data._id);
      if (response.status === 'success') refreshData(getAllProducts, setData, PRODUCT);
    }

    if (dataCategory === USER) {
      const response = await patchUser(JSON.stringify(data), data._id);
      if (response.status === 'success') refreshData(getAllUsers, setData, USER);
    }

    setShowModal(false);
  }

  function toggleActiveComponentType(e, component) {
    e.preventDefault();
    setActiveComponentType(component);
  }

  return (
    <main className='container admin'>
      <Header>
        <Nav />
      </Header>
      <article className='tools__container'>
        {showModal && (
          <Modal
            handleClickClose={handleClickClose}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            selectedData={selectedData}
          />
        )}
        <h1 className='tools__title'>Verktyg</h1>

        <button className='button__large' onClick={(e) => toggleActiveComponentType(e, PRODUCT)}>
          Hantera produkter
        </button>

        <ul>
          {activeComponentType === PRODUCT && (
            <>
              <p className='tools__hide' onClick={() => setActiveComponentType(false)}>
                Dölj
              </p>
              <ProductHandeling products={data.product} handleOpenModal={handleOpenModal} />
            </>
          )}
        </ul>

        <button className='button__large' onClick={(e) => toggleActiveComponentType(e, ORDER)}>
          Beställningar
        </button>
        <ul>
          {activeComponentType === ORDER && (
            <>
              <p className='tools__hide' onClick={() => setActiveComponentType(false)}>
                Dölj
              </p>
              <OrderHandeling orders={data.order} handleOpenModal={handleOpenModal} />
            </>
          )}
        </ul>

        <button className='button__large' onClick={(e) => toggleActiveComponentType(e, USER)}>
          Användare
        </button>
        <ul>
          {activeComponentType === USER && (
            <>
              <p className='tools__hide' onClick={() => setActiveComponentType(false)}>
                Dölj
              </p>
              <UserHandeling users={data.user} handleOpenModal={handleOpenModal} />
            </>
          )}
        </ul>

        <button className='button__large' onClick={(e) => toggleActiveComponentType(e, STATISTIC)}>
          Statistik
        </button>

        {activeComponentType === STATISTIC && (
          <>
            <p className='tools__hide' onClick={() => setActiveComponentType(false)}>
              Dölj
            </p>
            <Statistic handleOpenModal={handleOpenModal} handleClickClose={handleClickClose} />
          </>
        )}
      </article>
    </main>
  );
}
