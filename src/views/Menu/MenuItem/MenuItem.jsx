import { useState } from 'react';
import { useSelector } from 'react-redux';

import ReviewItem from '../../../components/Reviews/ReviewItem/ReviewItem';
import ReviewForm from '../../../components/Reviews/ReviewForm/ReviewForm';

import './MenuItem.scss';

export default function MenuItem(props) {
  const [showReviews, setShowReviews] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  function handleToggle(component) {
    if (component === 'showReviews') setShowReviews((current) => !current);
    if (component === 'reviewForm') setShowReviewForm((current) => !current);
  }

  return (
    <article>
      <section className='product'>
        {props.handleAddToCart ? (
          <button className='product__addtocart' onClick={() => props.handleAddToCart(props.product)}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
            </svg>
          </button>
        ) : null}

        <section className='product__text'>
          <h3 className='product__title'>{props.product.title}</h3>
          <p className='product__desc'>{props.product.desc}</p>
        </section>
        <section>
          <h3 className='product__price'>{props.product.price} kr</h3>
          <p className='product__rating'>
            Betyg:
            <span> {props.product.ratingsAverage}</span>
          </p>
        </section>
      </section>
      <section className='reviews'>
        <section className='reviews__links'>
          {isAuthenticated && (
            <p
              className='reviews__link'
              onClick={(e) => {
                if (props.product.reviews.length === 0) return;
                handleToggle('showReviews');
              }}
            >
              {showReviewForm
                ? null
                : showReviews
                ? 'Dölj recensioner'
                : props.product.reviews.length === 0
                ? 'Inga recensioner än.'
                : `Läs recensioner(${props.product.reviews.length})`}
            </p>
          )}

          {isAuthenticated && (
            <p className='reviews__link' onClick={(e) => handleToggle('reviewForm')}>
              {showReviews ? null : showReviewForm ? 'Dölj' : 'Vad tyckte du?'}
            </p>
          )}
        </section>
        <section className='userreviews'>
          {showReviews &&
            props.product.reviews.map((review) => {
              return <ReviewItem review={review} menu={true} key={review._id} />;
            })}
        </section>
        <section>
          {showReviewForm && (
            <ReviewForm
              reviewId={props.product._id}
              reloadProducts={props.reloadProducts}
              handleToggle={handleToggle}
            />
          )}
        </section>
      </section>
    </article>
  );
}
