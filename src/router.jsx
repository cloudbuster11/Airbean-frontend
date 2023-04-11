import { Route, Routes } from 'react-router-dom';

import Index from './views/Index/Index';
import UserForm from './views/UserForm/UserForm';
import About from './views/About/About';
import Menu from './views/Menu/Menu';
import Status from './views/Status/Status';
import Profile from './views/Profile/Profile';
import OrderHistory from './views/OrderHistory/OrderHistory';
import Admin from './views/Admin/Admin';
import Error from './views/Error/Error';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Index />} />

      <Route path='/userform' element={<UserForm />} />

      <Route path='/about' element={<About />} />

      <Route path='/menu' element={<Menu />} />

      <Route path='/status' element={<Status />} />

      <Route path='/profile' element={<Profile />} />

      <Route path='/orderhistory' element={<OrderHistory />} />

      <Route path='/admin' element={<Admin />} />

      <Route path='/error' element={<Error />} />
    </Routes>
  );
};

export { App };
