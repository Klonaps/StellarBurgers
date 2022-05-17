import React from 'react'

import styles from './app-header.module.css'

import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import MenuButton from '../menu-button/menu-button'

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.container}>
        <div className={styles.leftmenu}>
          <MenuButton title="Конструктор">
            <BurgerIcon type="primary" />
          </MenuButton>
          <MenuButton title="Лента заказов" inactive>
            <ListIcon type="secondary" />
          </MenuButton>
        </div>
        <Logo />
        <div className={styles.rightmenu}>
          <MenuButton title="Личный кабинет" inactive>
            <ProfileIcon type="secondary" />
          </MenuButton>
        </div>
      </nav>
    </header>
  )
}

export default AppHeader
