import React from 'react'
import PropTypes from 'prop-types'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

const Tabs = React.memo((props) => {

  const scrollToCategory = (value) => {
    if (value === "one") {
      props.refs[0].scrollIntoView({block: 'start', behavior: 'smooth'})
    }
    else if (value === "two") {
      props.refs[1].scrollIntoView({block: 'start', behavior: 'smooth'})
    }
    else {
      props.refs[2].scrollIntoView({block: 'start', behavior: 'smooth'})
    }
  }

  return (
    <div className={props.styles}>
        <Tab value="one" active={props.current === 'one'} onClick={scrollToCategory}>
          Булки
        </Tab>
        <Tab value="two" active={props.current === 'two'} onClick={scrollToCategory}>
          Начинки
        </Tab>
        <Tab value="three" active={props.current === 'three'} onClick={scrollToCategory}>
          Соусы
        </Tab>
      </div>
  )
})

Tabs.propTypes = {
  styles: PropTypes.string,
  current: PropTypes.string,
  setCurrent: PropTypes.func,
  refs: PropTypes.arrayOf(PropTypes.shape({ current: PropTypes.any }))
}

export default Tabs