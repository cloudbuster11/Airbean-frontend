import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addProduct } from '../../actions/cartActions';

import Header from '../../components/Header/Header';
import Cart from '../../components/Cart/Cart';
import MenuItem from './MenuItem/MenuItem';
import Nav from '../../components/Nav/Nav';

import './Menu.scss';
import { useNavigate } from 'react-router-dom';

import { getAllProducts } from '../../helpers/api';

export default function Menu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const handleAddToCart = (productId) => {
    dispatch(addProduct(productId));
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getAllProducts();

      if (data.status === 'success') {
        setProducts(data.data.allDocs);
      } else {
      }
    };

    getData();
  }, [reload]);

  function reloadProducts() {
    setReload((current) => !current);
  }

  const allProducts = products.map((product) => {
    if (isAuthenticated)
      return (
        <MenuItem
          key={product._id}
          product={product}
          handleAddToCart={handleAddToCart}
          reloadProducts={reloadProducts}
        />
      );
    else if (!isAuthenticated)
      return <MenuItem key={product._id} product={product} handleAddToCart={false} />;
  });

  return (
    <main className='container menu'>
      <Header>
        <Nav />
        {isAuthenticated ? <Cart /> : null}
      </Header>

      <article className='menu__container'>
        <h1 className='menu__title'>Meny</h1>
        {!isAuthenticated && (
          <p
            className='menu__login'
            onClick={() => {
              navigate('/userform');
            }}
          >
            <span>Logga in</span> för att kunna beställa och läsa recensioner.
          </p>
        )}
        {allProducts}
      </article>
    </main>
  );
}
