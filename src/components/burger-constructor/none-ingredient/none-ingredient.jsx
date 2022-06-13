import React from 'react'
import PropTypes from 'prop-types'
import styles from './none-ingredient.module.css'

const NoneIngredient = (props) => {
  const cn = (props.type ? props.type === 'up' ? styles.up : styles.bottom : styles.middle)

  return (
    <div className={cn}>
      <p className={`text text_type_main-default`}>{props.title}</p>
    </div>
  )
}

NoneIngredient.propTypes = {
  title: PropTypes.string.isRequired,
  type:PropTypes.string
}

export default NoneIngredient