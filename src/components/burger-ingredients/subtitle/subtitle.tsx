import React from 'react'

import styles from './subtitle.module.css'

type TSubtitle = {
  subtitle: string
}

const Subtitle = React.forwardRef<HTMLParagraphElement, TSubtitle>((props, ref) => {
  return (
      <p ref={ref} className={`${styles.subtitle} text text_type_main-medium`}>
        {props.subtitle}
      </p>
  )
})

export default Subtitle