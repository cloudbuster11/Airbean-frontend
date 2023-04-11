import Nav from '../../components/Nav/Nav';
import Header from '../../components/Header/Header';

import './About.scss';

import profileImg from '../../assets/cortado.svg';

export default function About() {
  return (
    <main className='container about'>
      <Header>
        <Nav />
      </Header>

      <section className='about__content'>
        <h1 className='about__heading'>Vårt kaffe</h1>
        <p className='about__text'>
          Pumpkin spice mug, barista cup, sit macchiato, kopi-luwak, doppio, grounds dripper, crema, strong
          whipped, variety extra iced id lungo half and half mazagran. Pumpkin spice.
        </p>

        <p className='about__text'>
          Que dark fair trade, spoon decaffeinated, barista wings whipped, as rich aftertaste, con panna milk
          black, arabica white rich beans single shot extra affogato. So affogato macchiato sit extraction
          instant grinder seasonal organic, turkish single shot, single origin, and robusta strong to go so
          dripper.
        </p>

        <p className='about__text'>
          Roast id macchiato, single shot siphon mazagran milk fair trade est aroma a half and half and, so,
          galão iced to go, whipped as cream cup pumpkin spice iced. At extra, rich grinder, brewed to go,
          steamed half and half at, that, percolator macchiato trifecta and body as arabica dripper. In galão
          black java milk sit trifecta, robusta, acerbic café au lait instant shop latte. Seasonal bar shop
          filter aroma id.
        </p>

        <article className='about__profile'>
          <img src={profileImg} className='profile__photo' alt='eva cortado photo' />
          <h3 className='profile__heading'>Eva Cortado</h3>
          <p className='profile__text'>VD & Grundare</p>
        </article>
      </section>
    </main>
  );
}
