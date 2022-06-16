import React from 'react'
import styles from './forgot-password-page.module.css'
import { Link } from 'react-router-dom'

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

const ForgotPasswordPage = () => {
  const [email, setEmail] = React.useState('')

  const onChangeEmail = e => {
    setEmail(e.target.value)
  }

  return (
    <div className={styles.box}>
      <p className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</p>
      <div className={styles.input}>
        <Input
          type={'email'}
          placeholder={'Укажите e-mail'}
          value={email}
          onChange={onChangeEmail}
          name={'email'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
      </div>
      <Button type="primary" size="medium">Восстановить</Button>
      <div className={styles.login}>
        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to={`/login`} className={styles.link}>Войти</Link></p>
      </div>
    </div>
  )
}

export default ForgotPasswordPage