import React from 'react'
import { Link } from 'react-router-dom'

import styles from './menu-button.module.css'

type TMenuButton = {
  children: React.ReactNode,
  title: string,
  inactive?: boolean,
  path?: string,
}

const MenuButton: React.FC<TMenuButton> = React.memo((props) => {
  return (
    <Link to={{ pathname: props.path }} className={`${styles.container} p-5`} tabIndex={0}>
    {props.children}
    <p className={props.inactive ? 'text text_type_main-default text_color_inactive' : `text text_type_main-default`}>
      {props.title}
    </p>
    </Link>
  )
})

export default MenuButton