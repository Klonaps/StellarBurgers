import React from 'react'
import PropTypes from "prop-types";

import styles from './subtitle.module.css'

const Subtitle = React.forwardRef((props, ref) => {
  return (
      <p ref={ref} className={`${styles.subtitle} text text_type_main-medium`}>
        {props.subtitle}
      </p>
  )
})

Subtitle.propTypes = {
  subtitle: PropTypes.string.isRequired
}

export default Subtitle