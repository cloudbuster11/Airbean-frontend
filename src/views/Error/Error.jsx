import Nav from '../../components/Nav/Nav';
import Header from '../../components/Header/Header';

import './Error.scss';

export default function Error() {
  return (
    <main className='container error'>
      <Header>
        <Nav />
      </Header>

      <section className='error__content'>
        <h1 className='error__heading'>Något gick fel.</h1>
        <p className='error__text'>Din betalning misslyckades. Vänligen försök igen.</p>
      </section>
    </main>
  );
}
