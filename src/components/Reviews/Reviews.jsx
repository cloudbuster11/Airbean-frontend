import ReviewItem from './ReviewItem/ReviewItem';

import { deleteReview } from '../../helpers/api';

export default function Reviews({ userData, getData }) {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    console.log('Ta bort den här recenesionen', id);
    const response = await deleteReview(id);
    if (response.status === 'success') getData();
  };

  const reviews = userData.reviews.map((review) => (
    <ReviewItem review={review} key={review._id} handleDelete={handleDelete} menu={false} />
  ));

  return (
    <section>
      <p>Dina recensioner</p>

      {reviews.length > 0 ? reviews : <p>Du har inte skrivit några recensioner än.</p>}
    </section>
  );
}
