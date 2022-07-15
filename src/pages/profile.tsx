import React from 'react'
import ProfilePage from '../components/profile-page/profile-page'

const Profile: React.FC = () => {
  document.title = 'Stellar Burgers - профиль'
  return (
    <ProfilePage />
  )
}

export default Profile