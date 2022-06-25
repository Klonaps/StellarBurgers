import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import styles from './app-header.module.css'

import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import MenuButton from '../menu-button/menu-button'

const AppHeader = React.memo(() => {
  const { user } = useSelector(store => store.user)
  const { pathname } = useLocation()
  const profile = user ? user.email : 'Личный кабинет'

  return (
    <header className={styles.header}>
      <nav className={styles.container}>
        <div className={styles.leftmenu}>
          <MenuButton title="Конструктор" path="/" inactive={pathname === '/' ? false : true}>
            <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'} />
          </MenuButton>
          <MenuButton title="Лента заказов" inactive={pathname === '/list' ? false : true}>
            <ListIcon type={pathname === '/list' ? 'primary' : 'secondary'} /> 
          </MenuButton>
        </div>
        <Logo />
        <div className={styles.rightmenu}>
          <MenuButton title={profile} path="/profile" inactive={pathname === '/profile' || pathname === '/profile/orders' ? false : true}>
            <ProfileIcon type={pathname === '/profile' || pathname === '/profile/orders' ? 'primary' : 'secondary'} />
          </MenuButton>
        </div>
      </nav>
    </header>
  )
})

export default AppHeader
