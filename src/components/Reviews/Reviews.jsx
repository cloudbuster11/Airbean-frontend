import ReviewItem from './ReviewItem/ReviewItem';

import './Reviews.scss';

import { deleteReview } from '../../helpers/api';

export default function Reviews({ userData, getData, children }) {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    const response = await deleteReview(id);
    if (response.status === 'success') getData();
  };

  const reviews = userData.reviews.map((review) => (
    <ReviewItem review={review} key={review._id} handleDelete={handleDelete} menu={false} />
  ));

  return (
    <section className='userreviews__container'>
      {children}
      <h3 className='userreviews__title'>Dina recensioner</h3>

      {reviews.length > 0 ? reviews : <p>Du har inte skrivit några recensioner än.</p>}
    </section>
  );
}
