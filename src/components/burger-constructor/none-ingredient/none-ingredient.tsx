import React from 'react'
import PropTypes from 'prop-types'
import styles from './none-ingredient.module.css'

type TNoneIngredient = {
  type?: string,
  title: string
}

const NoneIngredient: React.FC<TNoneIngredient> = (props) => {
  const cn: string = (props.type ? props.type === 'up' ? styles.up : styles.bottom : styles.middle)

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