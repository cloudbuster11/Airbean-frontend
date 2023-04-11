import './ReviewItem.scss';

export default function ReviewItem({ review, handleDelete, menu }) {
  return (
    <article className='reviewitem__container'>
      {!menu ? (
        <p className='reviewitem__title'>
          Produkt: <span>{review.product.title}</span>
        </p>
      ) : (
        <p className='reviewitem__username'>
          Användare: <span>{review.user.name}</span>
        </p>
      )}
      <p className='reviewitem__rating'>
        Betyg: <span>{review.rating}</span>
      </p>
      <p className='reviewitem__text'>Recension:</p>
      <p>{review.review}</p>
      {!menu && (
        <button
          className='button__small button-warning reviewitem__button'
          onClick={(e) => handleDelete(e, review._id)}
        >
          Ta bort
        </button>
      )}
    </article>
  );
}
