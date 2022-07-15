import React, { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './profile-link.module.css'

type TProfileLink = {
  to: string;
  title: string;
}

const ProfileLink: FC<TProfileLink> = (props) => {
  const location = useLocation()
  const cn: string = location.pathname === props.to ? 'text text_type_main-medium' : 'text text_type_main-medium text_color_inactive'

  return (
    <div className={styles.link}>
      <Link to={props.to} className={cn}>
        {props.title}
      </Link>
    </div>
  )
}

export default ProfileLink