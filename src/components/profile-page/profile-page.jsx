import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUserInfo, logout } from '../../services/actions/user-actions'
import { Redirect } from 'react-router-dom'

import { Input, PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import ProfileLink from '../profile-link/profile-link'
import Message from '../message/message'
import Loader from '../loader/loader'
import Error from '../error/error'
import InputLoader from '../input-loader/input-loader'

import styles from './profile-page.module.css'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const {
    user,
    message,
    updateInfoFailed,
    updateInfoRequest,
    updateInfoSuccess,
    isLogout,
    logoutRequest,
    logoutFailed
  } = useSelector(store => store.user)
  const [ dataChanged, setDataChanged ] = useState(false)
  const [ name, setName ] = useState(user.name)
  const [ isNameEdit, setIsNameEdit ] = useState(true)
  const [ email, setEmail ] = useState(user.email)
  const [ password, setPassword ] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    setName(user.name)
    setEmail(user.email)
    setPassword('')
    setDataChanged(false)
  }, [user])

  useEffect(()  => {
    if (name !== user.name || email !== user.email || password !== '') {
      setDataChanged(true)
    }
  }, [dataChanged, name, email, password, user.name, user.email])

  const editName = () => {
    setIsNameEdit(false)
    setTimeout(() => {
      inputRef.current.focus()
    }, 0)
  }

  const cancelEdit = (e) => {
    e.preventDefault()
    setName(user.name)
    setIsNameEdit(true)
    setEmail(user.email)
    setPassword('')
    setDataChanged(false)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    let body = {}
    if (password.length === 0) {
      body = {
        name: name,
        email: email,
      }
    } else {
      body = {
        name: name,
        email: email,
        password: password
      }
    }
    setIsNameEdit(true)
    dispatch(updateUserInfo(body))
  }

  const getLogout = () => {
    dispatch(logout())
  }

  if (logoutRequest) {
    return <Loader fullscreen/>
  }

  if (logoutFailed) {
    return <Error />
  }

  if (isLogout) {
    return <Redirect to={'/login'} />
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.menu}>
          <ProfileLink to='/profile' title="Профиль"/>
          <ProfileLink to='/profile/orders' title="История заказов"/>
          <div className={styles.link}>
            <p onClick={getLogout} className={`${styles.exit} text text_type_main-medium text_color_inactive`}>
              Выход
            </p>
          </div>
          <p className={`${styles.description} text text_type_main-default text_color_inactive`}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
          {updateInfoRequest && <InputLoader />}
          {updateInfoSuccess && <div className={styles.message}><Message>{message}</Message></div>}
          {updateInfoFailed && <div className={styles.message}><Message err>{message}</Message></div>}
          <div className={styles.input}>
            <Input
              ref={inputRef}
              type={'text'}
              value={name}
              placeholder={'Имя'}
              disabled={isNameEdit}
              name={'name'}
              icon={'EditIcon'}
              onIconClick={editName}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.input}>
            <EmailInput name={'email'} value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className={styles.input}>
            <PasswordInput name={'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {dataChanged &&
            <div>
              <Button type="secondary" size="medium" onClick={(e) => cancelEdit(e)}>Отменить</Button>
              <Button type="primary" size="medium" htmlType='submit'>Сохранить</Button>
            </div>
          }
        </form>
      </div>
    </div>
  )
}

export default ProfilePage