import React from 'react'
import ProfilePage from '../components/profile-page/profile-page'

const Profile: React.FC = () => {
  document.title = 'Stellar Burgers - Профиль'
  return (
    <ProfilePage />
  )
}

export default Profile