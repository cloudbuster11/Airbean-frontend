import { useState } from 'react';
import FormData from 'form-data';
import { patchUserImg } from '../../helpers/api';

import './UploadImg.scss';

export default function UploadImg(props) {
  const [file, setFile] = useState();
  const formData = new FormData();

  const token = sessionStorage.getItem('token');

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      return;
    }
    formData.append('photo', file);
    const data = await patchUserImg(formData);
    console.log(data);
    if (data.status === 'success') {
      sessionStorage.setItem('photourl', data.data.user.photo);
      props.getData();
    } else {
      navigate('/userform');
    }
  };

  return (
    <form className='upload'>
      <input type='file' className='upload__input' name='file' onChange={handleFileChange} />
      <button
        className='upload__btn'
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Ladda upp
      </button>
    </form>
  );
}
