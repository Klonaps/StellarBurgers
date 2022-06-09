import React from 'react'
import Modal from '../modal/modal'
import PropTypes from "prop-types";

import { ingredientType } from '../../utils/prop-types'
import styles from './ingredient-details.module.css'

const IngredientDetails = (props) => {
  return (
    <Modal title="Детали ингредиента" handlerCloseModal={props.handlerCloseModal}>
      {props.data && props.data.filter(
        ingredient => {
          return ingredient._id.includes(props.id)
        }).map(ingredient => 
          <div className={styles.container} key={ingredient._id}>
            <img className={styles.img} src={ingredient.image_large} alt={ingredient.name}/>
            <p className={`text text_type_main-medium ${styles.name}`}>
              {ingredient.name}
            </p>
            <div className={styles.description}>
              <div className={styles.box}>
                <div className={`text text_type_main-default text_color_inactive`}>
                  Калории, ккал
                </div>
                <div className={`text text_type_digits-default text_color_inactive`}>
                  {ingredient.calories}
                </div>
              </div>
              <div className={styles.box}>
                <p className={`text text_type_main-default text_color_inactive`}>
                  Белки, г
                </p>
                <p className={`text text_type_digits-default text_color_inactive`}>
                  {ingredient.proteins}
                </p>
              </div>
              <div className={styles.box}>
                <p className={`text text_type_main-default text_color_inactive`}>
                  Жиры, г
                </p>
                <p className={`text text_type_digits-default text_color_inactive`}>
                  {ingredient.fat}
                </p>
              </div>
              <div className={styles.box}>
                <p className={`text text_type_main-default text_color_inactive`}>
                  Углеводы, г
                </p>
                <p className={`text text_type_digits-default text_color_inactive`}>
                  {ingredient.carbohydrates}
                </p>
              </div>
            </div>
          </div>
        )
      }
    </Modal>
  )
}

IngredientDetails.propTypes = {
  data: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
  handlerCloseModal: PropTypes.func,
}

export default IngredientDetails