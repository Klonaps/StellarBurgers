import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styles from './menu-button.module.css'

const MenuButton = React.memo((props) => {
  return (
    <Link to={{ pathname: props.path }} className={`${styles.container} p-5`}>
    {props.children}
    <p className={props.inactive ? 'text text_type_main-default text_color_inactive' : `text text_type_main-default`}>
      {props.title}
    </p>
    </Link>
  )
})

MenuButton.propTypes = {
  title: PropTypes.string.isRequired,
  inactive: PropTypes.bool,
  children: PropTypes.element.isRequired
}

export default MenuButton