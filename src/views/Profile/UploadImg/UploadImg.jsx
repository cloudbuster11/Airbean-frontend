import { useState } from 'react';
import { useDispatch } from 'react-redux';
import FormData from 'form-data';
import { useNavigate } from 'react-router-dom';

import { setUserImgUrl } from '../../../actions/userAction';

import { patchUserImg } from '../../../helpers/api';

import './UploadImg.scss';

export default function UploadImg({ getData, children }) {
  const [file, setFile] = useState();
  const formData = new FormData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

    if (data.status === 'success') {
      dispatch(setUserImgUrl(data.data.user.photo));
    }
  };

  return (
    <form className='upload'>
      <input type='file' className='upload__input' name='file' onChange={handleFileChange} />
      <button
        className='button__large'
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Ladda upp
      </button>
      {children}
    </form>
  );
}
