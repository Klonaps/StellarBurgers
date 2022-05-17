import React from 'react'
import PropTypes from 'prop-types'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

const Tabs = (props) => {
  return (
    <div className={props.styles}>
        <Tab value="one" active={props.current === 'one'} onClick={props.setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={props.current === 'two'} onClick={props.setCurrent}>
          Начинки
        </Tab>
        <Tab value="three" active={props.current === 'three'} onClick={props.setCurrent}>
          Соусы
        </Tab>
      </div>
  )
}

Tabs.propTypes = {
  styles: PropTypes.string,
  current: PropTypes.string,
  setCurrent: PropTypes.func
}

export default Tabs