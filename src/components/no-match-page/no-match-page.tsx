import React from 'react'
import Rocket from '../../images/rocket.png'
import { useHistory } from 'react-router-dom'

import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './no-match-page.module.css'

declare module 'react' {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

const NoMatchPage: React.FC = () => {
  const history = useHistory()

  const goHome = (): void => {
    history.push({
      pathname: '/'
    })
  }

  return (
    <div className={styles.box}>
      <img src={Rocket} alt="Rocket" width='360'/>
      <div className={styles.text}>
        <p className="text text_type_main-large">
          Упс! Такой страницы нет...
        </p>
        <p className="text text_type_main-medium">
          Не переживайте, все ошибаются, вы всегда
          можете вернуться на главную!
        </p>
        <Button type="primary" size="large" onClick={goHome}>
          На главную
        </Button>
      </div>
    </div>
  )
}

export default NoMatchPage