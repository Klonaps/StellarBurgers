import React, { useState } from 'react'
import styles from './reset-password-page.module.css'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { recoveryPasswordSend } from '../../services/actions/recovery-actions'

import InputLoader from '../input-loader/input-loader'
import Message from '../message/message'
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'

const ResetPasswordPage = () => {
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const { emailSended, errorMessage, passwordRecovered, isRequest, isFailed } = useSelector(store => store.recovery)
  const dispatch = useDispatch()

  const sendRecoveryData = (e) => {
    e.preventDefault()
    if (password.length > 5) {
      dispatch(recoveryPasswordSend({
        password: password,
        token: token
      }))
    }
  }

  const onChangeToken = e => {
    setToken(e.target.value)
  }
  const onChangePassword = e => {
    setPassword(e.target.value)
  }

  if (passwordRecovered) {
    return <Redirect to='/login' />
  }

  if (!emailSended) {
    return <Redirect to='/forgot-password' />
  }

  return (
    <div className={styles.box}>
      <p className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</p>
      <form className={styles.form} onSubmit={(e) => sendRecoveryData(e)}>
        {isRequest && <InputLoader />}
        <div className={styles.input}>
          <PasswordInput onChange={onChangePassword} value={password} name={'password'} placeholder={'Введите новый пароль'}/>
        </div>
        <div className={styles.input}>
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            value={token}
            onChange={onChangeToken}
            name={'email'}
            error={isFailed}
            size={'default'}
          />
        </div>
        <Button htmlType='submit' type="primary" size="medium">Сохранить</Button>
        {isFailed && <div className={styles.message}><Message err>{errorMessage}</Message></div>}
      </form>
      <div className={styles.login}>
        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to={`/login`} className={styles.link}>Войти</Link></p>
      </div>
    </div>
  )
}

export default ResetPasswordPage