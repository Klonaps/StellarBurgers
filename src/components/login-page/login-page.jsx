import React from 'react'
import styles from './login-page.module.css'
import { Link } from 'react-router-dom'

import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'

const LoginPage = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  
  const onChangePassword = e => {
    setPassword(e.target.value)
  }
  const onChangeEmail = e => {
    setEmail(e.target.value)
  }

  return (
    <div className={styles.box}>
      <p className={`text text_type_main-medium ${styles.title}`}>Вход</p>
      <div className={styles.input}>
        <Input
          type={'email'}
          placeholder={'Email'}
          value={email}
          onChange={onChangeEmail}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
      </div>
      <div className={styles.input}>
        <PasswordInput onChange={onChangePassword} value={password} name={'password'} />
      </div>
      <Button type="primary" size="medium">
        Войти
      </Button>
      <div className={styles.registration}>
        <p className="text text_type_main-default text_color_inactive">Вы - новый пользователь? <Link to={`/register`} className={styles.link}>Зарегистрироваться</Link></p>
      </div>
      <p className="text text_type_main-default text_color_inactive">Забыли пароль? <Link to={`/forgot-password`} className={styles.link}>Восстановить пароль</Link></p>
    </div>
  )
}

export default LoginPage