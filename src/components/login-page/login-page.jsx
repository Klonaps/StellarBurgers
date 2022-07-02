import React, { useState, useEffect } from 'react'
import styles from './login-page.module.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../services/actions/user-actions'
import { CHANGE_RECOVERY_STATUS } from '../../services/actions/recovery-actions'

import Message from '../message/message'
import InputLoader from '../input-loader/input-loader'
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'

const LoginPage = () => {
  const { loginRequest, loginFailed, message } = useSelector(store => store.user)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({type: CHANGE_RECOVERY_STATUS})
  }, [dispatch])

  const auth = (e) => {
    e.preventDefault()
    if (email.length > 1 && password.length > 1) {
      dispatch(login({
        email: email,
        password: password
      }))
    }
  }

  return (
    <div className={styles.box}>
      <p className={`text text_type_main-medium ${styles.title}`}>Вход</p>
      <form className={styles.form} onSubmit={(e) => auth(e)}>
        {loginRequest && <InputLoader />}
        <div className={styles.input}>
          <Input
            type={'email'}
            placeholder={'Email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            />
        </div>
        <div className={styles.input}>
          <PasswordInput onChange={(e) => setPassword(e.target.value)} value={password} name={'password'} />
        </div>
        <Button type="primary" size="medium" htmlType='submit'>
          Войти
        </Button>
        {loginFailed && <div className={styles.message}><Message err>{message}</Message></div>}
      </form>
      <div className={styles.registration}>
        <p className="text text_type_main-default text_color_inactive">
          Вы - новый пользователь? <Link to={`/register`} className={styles.link}>Зарегистрироваться</Link>
        </p>
      </div>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль? <Link to={`/forgot-password`} className={styles.link}>Восстановить пароль</Link>
      </p>
    </div>
  )
}

export default LoginPage