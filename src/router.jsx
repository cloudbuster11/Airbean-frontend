import { createBrowserRouter } from 'react-router-dom';

import Index from './views/Index/Index';
import About from './views/About/About';
import Menu from './views/Menu/Menu';
import Status from './views/Status/Status';
import Profile from './views/Profile/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
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
]);

export { router };
