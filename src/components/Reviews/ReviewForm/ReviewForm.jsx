import { useState } from 'react';

import { postReview } from '../../../helpers/api';

import './ReviewForm.scss';

export default function ReviewForm(props) {
  const [data, setData] = useState({
    review: '',
    rating: '',
    product: props.reviewId,
  });

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const submit = async (event) => {
    event.preventDefault();
    data.rating = data.rating * 1;

    const response = await postReview(JSON.stringify(data));
    if (response.status === 'success') {
      // Uppdatera
      props.handleToggle('reviewForm');
      props.reloadProducts();
    }
  };

  return (
    <article className='reviewform'>
      <form className='form' onSubmit={submit}>
        <label className='form__label'>Rating</label>
        <input
          className='input__large'
          name='rating'
          type='text'
          placeholder='1-5'
          value={data.rating * 1}
          onChange={handleChange}
        />

        <label className='form__label'>Recension</label>
        <input
          className='input__large'
          name='review'
          type='review'
          placeholder='Vad tyckte du?'
          value={data.review}
          onChange={handleChange}
        />

        <button className='button__large' type='submit'>
          Skicka
        </button>
      </form>
    </article>
  );
}
