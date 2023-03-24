import { createBrowserRouter } from 'react-router-dom';

import Index from './views/Index/Index';
import UserForm from './views/UserForm/UserForm';
import About from './views/About/About';
import Menu from './views/Menu/Menu';
import Status from './views/Status/Status';
import Profile from './views/Profile/Profile';
import OrderHistory from './views/OrderHistory/OrderHistory';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/userform',
    element: <UserForm />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/menu',
    element: <Menu />,
  },
  {
    path: '/status',
    element: <Status />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/orderhistory',
    element: <OrderHistory />,
  },
]);

export { router };
