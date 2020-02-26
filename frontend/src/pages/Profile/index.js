import React, { useRef } from 'react';
import { string, object, ValidationError } from 'yup';
import { Form } from '@unform/web';
import { useSelector, useDispatch } from 'react-redux';

import { updateProfileRequest } from '~/store/modules/user/actions';

import Input from '~/components/form/Input';
import AvatarInput from './AvatarInput';

import { Container } from './styles';

const schema = object().shape({
  name: string().required('O nome é obrigatório'),
  email: string()
    .email('Insira um e-mail válido')
    .required('O email é obrigatório'),
  // oldPassword: string()
  //   .notRequired()
  //   .min(6, 'No mínimo 6 caracteres'),
  // password: string()
  //   .notRequired()
  //   .min(6, 'No mínimo 6 caracteres'),
  // confirmPassword: string()
  //   .oneOf([ref('password'), null], "Passwords don't match")
  //   .notRequired(),
});

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const handleSubmit = async data => {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      dispatch(updateProfileRequest(data));
    } catch (err) {
      const validationErrors = {};
      if (err instanceof ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  };

  return (
    <Container>
      <Form ref={formRef} initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />

        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />

        <hr />

        <Input
          name="oldPassword"
          type="password"
          placeholder="Sua senha atual"
        />
        <Input name="password" type="password" placeholder="Nova senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmação de senha"
        />

        <button type="submit">Atualizar perfil</button>
      </Form>

      <button type="button">Sair do GoBarber</button>
    </Container>
  );
}
