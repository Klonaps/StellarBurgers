import React from 'react'
import { CheckMarkIcon, InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './message.module.css'

type TMessage = {
  err?: boolean,
  children: React.ReactNode
}

const Message: React.FC<TMessage> = (props) => {
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

export default Message