import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import logo from '~/assets/images/logo.svg';
import Input from '~/components/form/Input';

export default function SignUp() {
  const formRef = useRef(null);

  const handleSubmit = async data => {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Insira um e-mail válido')
          .required('O email é obrigatório'),
        password: Yup.string()
          .min(6, 'No mínimo 6 caracteres')
          .required('A senha é obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // Validation passed
      console.tron.log(data);
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  };

  return (
    <>
      <img src={logo} alt="gobarber" />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
