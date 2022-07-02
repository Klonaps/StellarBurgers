import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import styles from './profile-link.module.css'

const ProfileLink = (props) => {
  const location = useLocation()
  const cn = location.pathname === props.to ? 'text text_type_main-medium' : 'text text_type_main-medium text_color_inactive'

  return (
    <div className={styles.link}>
      <Link to={props.to} className={cn}>
        {props.title}
      </Link>
    </div>
  )
}

ProfileLink.propTypes = {
  to: PropTypes.string,
  title: PropTypes.string
}

export default ProfileLink