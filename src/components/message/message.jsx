import React from 'react'
import { CheckMarkIcon, InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'

import styles from './message.module.css'

const Message = (props) => {
  return (
    <div className={styles.box}>
      {props.err ? 
        <>
          <InfoIcon type="error"/>
          <p className={`text text_type_main-default ${styles.error}`}>
            {props.children}
          </p>
        </>
      :
        <>
          <CheckMarkIcon type="success"/>
          <p className={`text text_type_main-default ${styles.success}`}>
            {props.children}
          </p>
        </>
      }
    </div>
  )
}

Message.propTypes = {
  err: PropTypes.bool,
  children: PropTypes.element.isRequired
}

export default Message