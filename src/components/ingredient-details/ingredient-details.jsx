import React from 'react'
import Modal from '../modal/modal'
import { useSelector } from 'react-redux'
import styles from './ingredient-details.module.css'

const IngredientDetails = () => {
  const { info } = useSelector(store => store.ingredientDetails)
  return (
    <Modal title="Детали ингредиента">
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
    </Modal>
  )
}

export default IngredientDetails