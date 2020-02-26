import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
    }

    hr {
      border: 0;
      height: 1px;
      margin: 10px 0 20px;
      background: rgba(0, 0, 0, 0.2);
    }

    button {
      background: #3b9eff;
      border: 0;
      border-radius: 4px;
      height: 44px;
      color: #fff;
      font-size: 16px;
      margin: 0 0 10px;
      font-weight: bold;
      transition: background 200ms;

      &:hover {
        background: ${darken(0.08, '#3b9eff')};
      }
    }
  }

  > button {
    display: block;
    background: #f64c75;
    border: 0;
    border-radius: 4px;
    height: 44px;
    width: 100%;
    color: #fff;
    font-size: 16px;
    margin: 10px 0 0;
    font-weight: bold;
    transition: background 200ms;

    &:hover {
      background: ${darken(0.08, '#f64c75')};
    }
  }
`;
