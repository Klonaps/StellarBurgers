import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styles from './ingredient-details.module.css'
import Loader from '../loader/loader'

const IngredientDetails = (props) => {
  const [info, setInfo] = useState(null)
  const { id } = useParams();
  const { ingredients } = useSelector(store => store.ingredients)
  const cn = props.inModal ? styles.loaderBox : ''

  useEffect(() => {
    if (ingredients) {
      setInfo(ingredients.filter((ing) => ing._id === id)[0])
    }
  }, [ingredients, id])


  if (!info) {
    return <div className={cn}><Loader fullscreen={props.fullscreen} /></div>
  }

  return (
    <div className={styles.container}>
      <img className={styles.img} src={info.image_large} alt={info.name}/>
      <p className={`text text_type_main-medium ${styles.name}`}>
        {info.name}
      </p>
      <div className={styles.description}>
        <div className={styles.box}>
          <div className={`text text_type_main-default text_color_inactive`}>
            Калории, ккал
          </div>
          <div className={`text text_type_digits-default text_color_inactive`}>
            {info.calories}
          </div>
        </div>
        <div className={styles.box}>
          <p className={`text text_type_main-default text_color_inactive`}>
            Белки, г
          </p>
          <p className={`text text_type_digits-default text_color_inactive`}>
            {info.proteins}
          </p>
        </div>
        <div className={styles.box}>
          <p className={`text text_type_main-default text_color_inactive`}>
            Жиры, г
          </p>
          <p className={`text text_type_digits-default text_color_inactive`}>
            {info.fat}
          </p>
        </div>
        <div className={styles.box}>
          <p className={`text text_type_main-default text_color_inactive`}>
            Углеводы, г
          </p>
          <p className={`text text_type_digits-default text_color_inactive`}>
            {info.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  )
}


IngredientDetails.propTypes = {
  fullscreen: PropTypes.bool,
  isModal: PropTypes.bool
}

export default IngredientDetails