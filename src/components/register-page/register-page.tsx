import React, { useState, FC } from 'react'
import styles from './register-page.module.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from '../../services/redux/hooks'
import { register } from '../../services/redux/reducers/user/actions'
import { registerFailed } from '../../services/redux/reducers/user/actions'

import InputLoader from '../input-loader/input-loader'
import Message from '../message/message'

import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'

const RegisterPage: FC = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const dispatch = useDispatch()
  const { registerRequest, isRegisterFailed, registerMessage } = useSelector(store => store.user)
  
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value)
  }
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
  }
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value)
  }
  const onSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()
    if (password.length <= 3) {
      dispatch(registerFailed('Пароль должен быть больше 3-х символов'))
    } else {
      dispatch(register({
        email: email,
        password: password,
        name: name
      }))
    }
  }

  return (
    <div className={styles.box}>
      <p className={`text text_type_main-medium ${styles.title}`}>Регистрация</p>
      <form className={styles.form} onSubmit={e => onSubmit(e)}>
        {registerRequest && <InputLoader />}
        <div className={styles.input}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            value={name}
            onChange={onChangeName}
            name={'name'}
            error={isRegisterFailed}
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
            error={isRegisterFailed}
            size={'default'}
          />
        </div>
        <div className={styles.input}>
          <PasswordInput onChange={onChangePassword} value={password} name={'password'} />
        </div>
        <Button type="primary" size="medium">Зарегистрироваться</Button>
        {isRegisterFailed && <div className={styles.message}><Message err>{registerMessage}</Message></div>}
      </form>
      <div className={styles.login}>
        <p className="text text_type_main-default text_color_inactive">Уже зарегистрированны? <Link to={`/login`} className={styles.link}>Войти</Link></p>
      </div>
    </div>
  )
}

export default RegisterPage