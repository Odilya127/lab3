import React, { useEffect, useState } from 'react';
import Input from './Input';
import '../styles/button.scss';

const Login = ({ handleSignIn, handleRegister, loginDataOffset }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const { loginData, setLoginData } = loginDataOffset;

  useEffect(() => {
    if (
      loginData.password &&
      loginData.repeatPassword &&
      loginData.password !== loginData.repeatPassword
    ) {
      setErrorMessage('Пароли должны совпадать!');
    } else setErrorMessage(undefined);
  }, [loginData.password, loginData.repeatPassword]);

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>Страница {isLogin ? 'авторизации' : 'регистрации'}</h1>
      <Input
        label={'Введите логин'}
        placeholder={'Ваш логин'}
        type={'text'}
        value={loginData.username}
        onChange={event =>
          setLoginData({ ...loginData, username: event.target.value })
        }
        required
      />
      {!isLogin && (
        <Input
          label={'Введите имя'}
          placeholder={'Ваше имя'}
          type={'text'}
          value={loginData.name}
          onChange={event =>
            setLoginData({ ...loginData, name: event.target.value })
          }
          required
        />
      )}
      <Input
        label={'Введите пароль'}
        placeholder={'********'}
        type={'password'}
        value={loginData.password}
        onChange={event =>
          setLoginData({ ...loginData, password: event.target.value })
        }
        required
      />
      {!isLogin && (
        <Input
          label={'Повторите пароль'}
          placeholder={'********'}
          type={'password'}
          value={loginData.repeatPassword}
          onChange={event =>
            setLoginData({ ...loginData, repeatPassword: event.target.value })
          }
          error={errorMessage}
          required
        />
      )}
      <button
        className={'button'}
        onClick={isLogin ? handleSignIn : handleRegister}
        type={'submit'}
        disabled={
          isLogin
            ? !loginData.username || !loginData.password
            : Object.values(loginData).filter(el => el).length !==
              Object.values(loginData).length
        }
      >
        Отправить
      </button>
      <button
        onClick={event => {
          event.preventDefault();
          setIsLogin(prevState => !prevState);
        }}
        style={{ fontSize: '14px', marginTop: '20px', color: 'white' }}
      >
        {isLogin
          ? 'Нет учётной записи? Регистрация'
          : 'Уже есть учётная запись? Логин'}
      </button>
    </form>
  );
};

export default Login;
