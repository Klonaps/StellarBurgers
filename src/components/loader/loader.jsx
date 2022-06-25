import React from 'react'
import styles from './loader.module.css'
import PropTypes from 'prop-types'

const Loader = ({ fullscreen }) => {
  const cn = fullscreen ? styles.fullscreen : ''
  return (
    <div className={cn}>
      <span className={styles.loader} />
    </div>
  )
}

Loader.propTypes = {
  fullscreen: PropTypes.bool
}

export default Loader