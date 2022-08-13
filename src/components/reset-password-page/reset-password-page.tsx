import React, { useState, FC } from 'react'
import styles from './reset-password-page.module.css'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from '../../services/redux/hooks'
import { recoveryPasswordSend } from '../../services/redux/reducers/recovery/actions'

import InputLoader from '../input-loader/input-loader'
import Message from '../message/message'
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'

const ResetPasswordPage: FC = () => {
  const [token, setToken] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { emailSended, errorMessage, passwordRecovered, isRequest, isFailed } = useSelector(store => store.recovery)
  const dispatch = useDispatch()

  const sendRecoveryData = (e: React.SyntheticEvent): void => {
    e.preventDefault()
    if (password.length > 5) {
      dispatch(recoveryPasswordSend({
        password: password,
        token: token
      }))
    }
  }

  const onChangeToken = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setToken(e.target.value)
  }
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
      <form className={styles.form} onSubmit={sendRecoveryData}>
        {isRequest && <InputLoader />}
        <div className={styles.input}>
          <PasswordInput onChange={onChangePassword} value={password} name={'password'}/>
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
        <Button htmlType='submit' size='medium'>Сохранить</Button>
        {isFailed && <div className={styles.message}><Message err>{errorMessage}</Message></div>}
      </form>
      <div className={styles.login}>
        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to={`/login`} className={styles.link}>Войти</Link></p>
      </div>
    </div>
  )
}

export default ResetPasswordPage