import React from 'react'
import styles from './reset-password-page.module.css'
import { Link } from 'react-router-dom'

import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'

const ResetPasswordPage = () => {
  const [code, setCode] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onChangeCode = e => {
    setCode(e.target.value)
  }
  const onChangePassword = e => {
    setPassword(e.target.value)
  }

  return (
    <div className={styles.box}>
      <p className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</p>
      <div className={styles.input}>
        <PasswordInput onChange={onChangePassword} value={password} name={'password'} placeholder={'Введите новый пароль'} />
      </div>
      <div className={styles.input}>
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          value={code}
          onChange={onChangeCode}
          name={'email'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
      </div>
      <Button type="primary" size="medium">Сохранить</Button>
      <div className={styles.login}>
        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to={`/login`} className={styles.link}>Войти</Link></p>
      </div>
    </div>
  )
}

export default ResetPasswordPage