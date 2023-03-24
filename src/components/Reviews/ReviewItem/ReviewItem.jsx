export default function ReviewItem({ review, handleDelete, menu }) {
  return (
    <article>
      {!menu ? (
        <p>
          Produkt: <span>{review.product.title}</span>
        </p>
      ) : (
        <p>
          Användare: <span>{review.user.name}</span>
        </p>
      )}
      <p>
        Betyg: <span>{review.rating}</span>
      </p>
      <p>
        Recension: <span>{review.review}</span>
      </p>
      {!menu && <button onClick={(e) => handleDelete(e, review._id)}>Ta bort recensionen</button>}
    </article>
  );
}
