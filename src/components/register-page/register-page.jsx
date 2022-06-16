import React from 'react'
import styles from './register-page.module.css'
import { Link } from 'react-router-dom'

import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'

const RegisterPage = () => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  
  const onChangeName = e => {
    setName(e.target.value)
  }
  const onChangeEmail = e => {
    setEmail(e.target.value)
  }
  const onChangePassword = e => {
    setPassword(e.target.value)
  }

  return (
    <div className={styles.box}>
      <p className={`text text_type_main-medium ${styles.title}`}>Регистрация</p>
      <div className={styles.input}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          value={name}
          onChange={onChangeName}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
      </div>
      <div className={styles.input}>
        <Input
          type={'email'}
          placeholder={'Email'}
          value={email}
          onChange={onChangeEmail}
          name={'email'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
      </div>
      <div className={styles.input}>
        <PasswordInput onChange={onChangePassword} value={password} name={'password'} />
      </div>
      <Button type="primary" size="medium">Зарегистрироваться</Button>
      <div className={styles.login}>
        <p className="text text_type_main-default text_color_inactive">Уже зарегистрированны? <Link to={`/login`} className={styles.link}>Войти</Link></p>
      </div>
    </div>
  )
}

export default RegisterPage