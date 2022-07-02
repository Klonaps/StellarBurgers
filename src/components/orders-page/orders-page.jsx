import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../services/actions/user-actions'
import { Redirect } from 'react-router-dom'

import ProfileLink from '../profile-link/profile-link'
import Loader from '../loader/loader'
import Error from '../error/error'

import styles from './orders-page.module.css'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const {
    isLogout,
    logoutRequest,
    logoutFailed
  } = useSelector(store => store.user)

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
            В этом разделе вы можете посмотреть свою историю заказов
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage