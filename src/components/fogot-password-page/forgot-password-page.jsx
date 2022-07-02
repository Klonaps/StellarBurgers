import React, { useState } from 'react'
import styles from './forgot-password-page.module.css'
import { Link, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { recoveryEmailSend } from '../../services/actions/recovery-actions'

import InputLoader from '../input-loader/input-loader'
import Message from '../message/message'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [isEmailIncorrect, setIsEmailIncorrect] = useState(false)
  const { isRequest, isFailed, emailSended, errorMessage } = useSelector(store => store.recovery)
  const dispatch = useDispatch()

  
  const onChangeEmail = e => {
    setIsEmailIncorrect(false)
    setEmail(e.target.value)
  }

  const sendEmail = (e) => {
    e.preventDefault()
    if (email.length < 1) {
      setIsEmailIncorrect(true)
    } else {
      dispatch(recoveryEmailSend({
        email: email
      }))
    }
  }

  if (emailSended) {
    return <Redirect to='/reset-password' />
  }

  return (
    <div className={styles.box}>
      <p className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</p>
      <form className={styles.form} onSubmit={(e) => sendEmail(e)}>
        {isRequest && <InputLoader />}
        {isFailed && <div className={styles.message}><Message err>{errorMessage}</Message></div>}
        <div className={styles.input}>
          <Input
            type={'email'}
            placeholder={'Укажите e-mail'}
            value={email}
            onChange={onChangeEmail}
            name={'email'}
            error={isEmailIncorrect}
            errorText={'Ошибка'}
            size={'default'}
          />
          {}
        </div>
        <Button htmlType="submit" type="primary" size="medium" >Восстановить</Button>
      </form>
      <div className={styles.login}>
        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to={`/login`} className={styles.link}>Войти</Link></p>
      </div>
    </div>
  )
}

export default ForgotPasswordPage