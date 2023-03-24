import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { addProduct } from '../../actions/cartActions';

import Header from '../../components/Header/Header';
import Cart from '../../components/Cart/Cart';
import MenuItem from '../../components/MenuItem/MenuItem';
import Nav from '../../components/Nav/Nav';

import '../Menu/Menu.scss';
import { useNavigate } from 'react-router-dom';

import { getAllProducts } from '../../helpers/api';

export default function Menu() {
  const [menuData, setMenuData] = useState([]);
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem('token');

  const dispatch = useDispatch();

  const handleAddToCart = (productId) => {
    dispatch(addProduct(productId));
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getAllProducts();

      if (data.status === 'success') {
        setMenuData(data.data.allDocs);
      } else {
      }
    };

    getData();
  }, []);

  const allProductsElem = menuData.map((product) => {
    if (isLoggedIn) return <MenuItem key={product._id} product={product} handleAddToCart={handleAddToCart} />;
    else if (!isLoggedIn) return <MenuItem key={product._id} product={product} handleAddToCart={false} />;
  });

  return (
    <main className='container menu'>
      <Header>
        <Nav />
        {isLoggedIn ? <Cart /> : null}
      </Header>

      <article className='menu__container'>
        <h1 className='menu__title'>Meny</h1>
        {!isLoggedIn ? (
          <p
            className='menu__login'
            onClick={() => {
              navigate('/userform');
            }}
          >
            <span>Logga in</span> för att kunna beställa.
          </p>
        ) : null}
        {allProductsElem}
      </article>
    </main>
  );
}
