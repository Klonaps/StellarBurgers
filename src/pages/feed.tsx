import React, { useEffect } from 'react'
import FeedPage from '../components/feed-page/feed-page'
import Loader from '../components/loader/loader'
import { useDispatch, useSelector } from '../services/redux/hooks'
import { disconnect, connect } from '../services/redux/reducers/websocket/actions'
import { WS_URL } from '../utils/API'

const Feed: React.FC = () => {
  const dispatch = useDispatch()
  const { orders } = useSelector(store => store.websocet)

  useEffect(() => {
    dispatch(connect(WS_URL + '/all'))
    return () => {
      dispatch(disconnect())
    }
  }, [dispatch])
  document.title = 'Stellar Burgers - Лента заказов'

  if (orders.length === 0) return <Loader fullscreen />

  return (
    <FeedPage />
  )
}

export default Feed