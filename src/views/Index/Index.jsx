import './Index.scss';
import '../../style.scss';
import logo from '../../assets/airbean_logo.svg';
import { Link } from 'react-router-dom';

export default function Index() {
  return (
    <div className='landing__container'>
      <Link to='/userform' className='landing__logo'>
        <img src={logo} alt='airbean logo' />
      </Link>
      <h1 className='landing__heading'>AIR BEAN</h1>
      <p className='landing__text'>DRONE DELIVERED COFFEE</p>
    </div>
  );
}
