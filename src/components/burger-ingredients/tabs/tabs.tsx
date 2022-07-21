import React from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

type TTabs = {
  current: string,
  refs: Array<HTMLDivElement | null>,
  styles: string,
}

const Tabs: React.FC<TTabs> = React.memo((props) => {

  const scrollToCategory = (value: string): void => {
    if (value === "one") {
      if (props.refs[0] != null)  {
        props.refs[0].scrollIntoView({block: 'start', behavior: 'smooth'})
      }
    }
    else if (value === "two") {
      if (props.refs[1] != null)  {
        props.refs[1].scrollIntoView({block: 'start', behavior: 'smooth'})
      }
    }
    else {
      if (props.refs[2] != null)  {
        props.refs[2].scrollIntoView({block: 'start', behavior: 'smooth'})
      }
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

export default Tabs