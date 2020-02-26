import React, { useRef, useEffect, useState } from 'react';
import { useField } from '@unform/core';

import api from '~/services/api';

import { Container } from './styles';

export default function AvatarInput() {
  const { registerField, defaultValue } = useField('avatar');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      registerField({
        name: 'avatar_id',
        ref: inputRef.current,
        path: 'dataset.file',
      });
    }
  }, [registerField, inputRef]);

  const handleChange = async e => {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('/files', data);

    console.tron.log(response);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  };

  return (
    <Container>
      <label htmlFor="avatar">
        <img
          src={
            preview || 'https://api.adorable.io/avatars/120/abott@adorable.png'
          }
          alt="Preview avatar"
        />

        <input
          id="avatar"
          type="file"
          ref={inputRef}
          accept="image/*"
          data-file={file}
          onChange={handleChange}
        />
      </label>
    </Container>
  );
}
